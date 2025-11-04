import { useCallback, type RefObject } from 'react';

import { useEventListener } from './useEventListener';

type PointerEvent = MouseEvent | TouchEvent;

function getDocument(node: Element | null): Document | null {
  if (node?.ownerDocument) {
    return node.ownerDocument;
  }
  if (typeof document !== 'undefined') {
    return document;
  }
  return null;
}

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: PointerEvent) => void,
  enabled = true
) {
  const createListener = useCallback(
    (event: PointerEvent) => {
      const element = ref.current;
      if (!element || element.contains(event.target as Node)) {
        return;
      }
      const target = event.target as Element | null;
      if (target) {
        const controller = target.closest('[aria-controls]');
        if (controller) {
          const controlledId = controller.getAttribute('aria-controls');
          const elementId = element.id || element.parentElement?.id;
          if (controlledId && elementId && controlledId === elementId) {
            return;
          }
        }
        if ((target as Element).closest('[data-ignore-click-outside="true"]')) {
          return;
        }
      }
      handler(event);
    },
    [handler, ref]
  );

  const doc = getDocument(ref.current);

  useEventListener(doc, 'mousedown', createListener, undefined, enabled);
  useEventListener(doc, 'touchstart', createListener, undefined, enabled);
}

export default useClickOutside;
