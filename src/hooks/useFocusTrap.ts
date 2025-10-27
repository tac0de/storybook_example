import { useEffect, type RefObject } from 'react';

import { focusElement, getFocusableElements } from '../utils/focus';
import { useEventListener } from './useEventListener';
import { useLatest } from './useLatest';

export interface UseFocusTrapOptions {
  initialFocus?: HTMLElement | null | (() => HTMLElement | null);
  restoreFocus?: boolean;
}

const fallbackDocument = typeof document !== 'undefined' ? document : null;

function resolveFocusTarget(target?: HTMLElement | null | (() => HTMLElement | null)) {
  if (typeof target === 'function') {
    return target();
  }
  return target ?? null;
}

export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
  options: UseFocusTrapOptions = {}
) {
  const optionsRef = useLatest(options);

  useEffect(() => {
    if (!active) {
      return undefined;
    }

    const node = containerRef.current;
    if (!node) {
      return undefined;
    }

    const doc = node.ownerDocument || fallbackDocument;
    const previouslyFocused = doc?.activeElement as HTMLElement | null;
    const restoreFocus = optionsRef.current.restoreFocus ?? true;
    const initialFocus = resolveFocusTarget(optionsRef.current.initialFocus) ?? node;

    const shouldAddTabIndex = !node.hasAttribute('tabindex');
    if (shouldAddTabIndex) {
      node.setAttribute('tabindex', '-1');
    }

    focusElement(initialFocus, { preventScroll: true });

    return () => {
      if (shouldAddTabIndex) {
        node.removeAttribute('tabindex');
      }
      if (
        restoreFocus &&
        previouslyFocused &&
        previouslyFocused !== doc?.activeElement &&
        typeof previouslyFocused.focus === 'function'
      ) {
        focusElement(previouslyFocused, { preventScroll: true });
      }
    };
  }, [active, containerRef, optionsRef]);

  useEventListener<Document, KeyboardEvent>(
    () => containerRef.current?.ownerDocument ?? fallbackDocument,
    'keydown',
    event => {
      if (!active || event.key !== 'Tab') {
        return;
      }
      const node = containerRef.current;
      if (!node) {
        return;
      }
      const focusable = getFocusableElements(node, { includeRoot: true });
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const doc = node.ownerDocument || fallbackDocument;
      if (!doc) {
        return;
      }
      const current = doc.activeElement as HTMLElement | null;
      const [first, ...rest] = focusable;
      const last = rest.length > 0 ? rest[rest.length - 1] : first;

      const isOutside = !current || !node.contains(current);
      if (event.shiftKey) {
        if (isOutside || current === first) {
          event.preventDefault();
          focusElement(last);
        }
      } else if (isOutside || current === last) {
        event.preventDefault();
        focusElement(first);
      }
    },
    undefined,
    active
  );
}

export default useFocusTrap;
