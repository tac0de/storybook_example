import { useCallback, useRef, useState, type FormEvent, type RefObject } from 'react';

import { useBoolean } from '../../../hooks/useBoolean';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useDebouncedValue } from '../../../hooks/useDebouncedValue';

type OutsidePointerEvent = MouseEvent | TouchEvent;

export interface SearchLayerStateOptions {
  open: boolean;
  onClose: () => void;
  onSubmit: (query: string) => void;
}

export interface SearchLayerState {
  layerRef: RefObject<HTMLDivElement | null>;
  searchQuery: string;
  placeholderHidden: boolean;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleSearchInput: (event: FormEvent<HTMLParagraphElement>) => void;
  applySuggestion: (value: string, options?: { submit?: boolean; close?: boolean }) => void;
  reset: () => void;
  close: () => void;
  clearButtonVisible: boolean;
}

export function useSearchLayerState({ open, onClose, onSubmit }: SearchLayerStateOptions): SearchLayerState {
  const [searchQuery, setSearchQuery] = useState('');
  const placeholder = useBoolean(true);
  const layerRef = useRef<HTMLDivElement | null>(null);
  const debouncedQuery = useDebouncedValue(searchQuery, 3000);

  const setInputContent = useCallback((value: string, options?: { moveCaret?: boolean }) => {
    const editable = layerRef.current?.querySelector<HTMLParagraphElement>('.search_area .form_control');
    if (!editable) return;

    editable.textContent = value;

    const shouldMoveCaret = options?.moveCaret ?? true;
    if (!shouldMoveCaret) {
      return;
    }

    const doc = editable.ownerDocument;
    if (!doc) return;

    const selection = doc.getSelection();
    if (!selection) return;

    const range = doc.createRange();
    range.selectNodeContents(editable);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }, []);

  const close = useCallback(() => {
    onClose();
    setSearchQuery('');
    placeholder.setFalse();
    setInputContent('', { moveCaret: false });
  }, [onClose, placeholder, setInputContent]);

  const handleOutsideClick = useCallback(
    (_event: OutsidePointerEvent) => {
      close();
    },
    [close]
  );

  useClickOutside(layerRef, handleOutsideClick, open);

  const submitQuery = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      if (!trimmed) {
        return;
      }
      onSubmit(trimmed);
    },
    [onSubmit]
  );

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      submitQuery(searchQuery);
    },
    [searchQuery, submitQuery]
  );

  const handleSearchInput = useCallback(
    (event: FormEvent<HTMLParagraphElement>) => {
      const value = event.currentTarget.textContent ?? '';
      setSearchQuery(value);
      if (value) {
        placeholder.setTrue();
      } else {
        placeholder.setFalse();
      }
    },
    [placeholder]
  );

  const applySuggestion = useCallback(
    (value: string, options?: { submit?: boolean; close?: boolean }) => {
      setSearchQuery(value);
      setInputContent(value);
      if (value) {
        placeholder.setTrue();
      } else {
        placeholder.setFalse();
      }
      if (options?.submit) {
        submitQuery(value);
      }
      if (options?.close) {
        close();
      }
    },
    [close, placeholder, setInputContent, submitQuery]
  );

  const reset = useCallback(() => {
    setSearchQuery('');
    placeholder.setFalse();
    setInputContent('', { moveCaret: false });
  }, [placeholder, setInputContent]);

  return {
    layerRef,
    searchQuery,
    placeholderHidden: placeholder.value,
    handleSubmit,
    handleSearchInput,
    applySuggestion,
    reset,
    close,
    clearButtonVisible: debouncedQuery.trim().length > 0,
  };
}

export default useSearchLayerState;
