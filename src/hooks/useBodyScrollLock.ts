import { useEffect } from 'react';

import { lockBodyScroll } from '../utils/scrollLock';

export interface UseBodyScrollLockOptions {
  document?: Document | null;
}

export function useBodyScrollLock(active: boolean, options?: UseBodyScrollLockOptions) {
  const targetDocument = options?.document;

  useEffect(() => {
    if (!active) {
      return undefined;
    }

    const doc = targetDocument ?? (typeof document !== 'undefined' ? document : null);
    if (!doc?.body) {
      return undefined;
    }

    const release = lockBodyScroll(doc);
    return () => {
      release();
    };
  }, [active, targetDocument]);
}

export default useBodyScrollLock;
