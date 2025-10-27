import { useMemo } from 'react';

import { useEventListener } from './useEventListener';

export interface UseEscapeKeyOptions {
  document?: Document | null;
}

export function useEscapeKey(handler: (event: KeyboardEvent) => void, active = true, options?: UseEscapeKeyOptions) {
  const doc = useMemo(
    () => options?.document ?? (typeof document !== 'undefined' ? document : null),
    [options?.document]
  );

  useEventListener<Document, KeyboardEvent>(
    doc,
    'keydown',
    event => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        handler(event);
      }
    },
    undefined,
    active
  );
}

export default useEscapeKey;
