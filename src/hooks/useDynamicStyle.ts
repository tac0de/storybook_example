import { useEffect, useState } from 'react';

type Loader = () => Promise<unknown>;

/** 동적으로 CSS/SCSS를 import — Vite 정적 분석이 가능한 방식 */
export function useDynamicStyle(load?: Loader, enabled: boolean = true): boolean {
  const [ready, setReady] = useState(!enabled);

  useEffect(() => {
    if (!enabled || !load) return undefined;

    let mounted = true;
    load().then(() => {
      if (mounted) setReady(true);
    });

    return () => {
      mounted = false;
    };
  }, [enabled, load]);

  return ready;
}
