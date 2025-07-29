import type React from 'react';

export interface TestLayoutProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

/**
 * TestLayout 템플릿 컴포넌트입니다.
 * 페이지의 레이아웃 구조를 정의합니다.
 */
export const TestLayout: React.FC<TestLayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-gray-50 rounded-xl shadow-sm p-6 max-w-4xl mx-auto min-h-96 ${className}`}>
      {children}
    </div>
  );
};