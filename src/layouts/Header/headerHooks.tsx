import { useCallback } from 'react';

export const onSubmitSearch = useCallback((q: string) => {
  if (!q) return;
  window.location.href = `/search?keyword=${encodeURIComponent(q)}`;
}, []);
