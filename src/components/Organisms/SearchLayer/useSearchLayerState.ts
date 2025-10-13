import { useCallback, useRef, useState, type FormEvent, type RefObject } from 'react';

import { useBoolean } from '../../../hooks/useBoolean';
import { useClickOutside } from '../../../hooks/useClickOutside';

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
}

export function useSearchLayerState({ open, onClose, onSubmit }: SearchLayerStateOptions): SearchLayerState {
  const [searchQuery, setSearchQuery] = useState('');
  const placeholder = useBoolean(true);
  const layerRef = useRef<HTMLDivElement | null>(null);

  const close = useCallback(() => {
    onClose();
    setSearchQuery('');
    placeholder.setFalse();
  }, [onClose, placeholder]);

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
    [close, placeholder, submitQuery]
  );

  const reset = useCallback(() => {
    setSearchQuery('');
    placeholder.setFalse();
  }, [placeholder]);

  return {
    layerRef,
    searchQuery,
    placeholderHidden: placeholder.value,
    handleSubmit,
    handleSearchInput,
    applySuggestion,
    reset,
    close,
  };
}

export default useSearchLayerState;
