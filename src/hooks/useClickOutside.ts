import { RefObject, useEffect } from 'react';

type PointerEvent = MouseEvent | TouchEvent;

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: PointerEvent) => void,
  enabled = true
) {
  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const listener = (event: PointerEvent) => {
      const element = ref.current;
      if (!element || element.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [enabled, handler, ref]);
}

export default useClickOutside;
