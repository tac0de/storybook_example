// src/hooks/useDynamicStyle.ts
import * as React from 'react';

export function useDynamicStyle(loader: () => Promise<unknown>, enabled = true) {
  const [ready, setReady] = React.useState(!enabled);
  React.useEffect(() => {
    if (!enabled) return;
    let mounted = true;
    loader().then(() => mounted && setReady(true));
    // eslint-disable-next-line consistent-return
    return () => {
      mounted = false;
    };
  }, [enabled, loader]);
  return ready;
}
