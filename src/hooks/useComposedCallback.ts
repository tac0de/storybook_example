import { useCallback } from 'react';

import { useLatest } from './useLatest';

type Callback<Args extends unknown[]> = ((...args: Args) => void) | undefined;

export function useComposedCallback<Args extends unknown[]>(...callbacks: Array<Callback<Args>>) {
  const callbacksRef = useLatest(callbacks);

  return useCallback(
    (...args: Args) => {
      callbacksRef.current.forEach(callback => {
        callback?.(...args);
      });
    },
    [callbacksRef]
  );
}

export default useComposedCallback;
