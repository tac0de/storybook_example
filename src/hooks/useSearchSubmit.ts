// src/hooks/useSearchSubmit.ts
import { useCallback } from 'react';

export function useSearchSubmit() {
  const handleSubmit = useCallback((query: string) => {
    // 검색어가 비어있으면 아무 작업도 하지 않음
    if (!query) {
      return;
    }
    // URL에 검색어를 포함하여 검색 결과 페이지로 이동
    window.location.href = `/search?keyword=${encodeURIComponent(query)}`;
  }, []);

  return { handleSubmit };
}
