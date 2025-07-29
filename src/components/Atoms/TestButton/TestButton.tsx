import type React from 'react';

export interface TestButtonProps {
  readonly className?: string;
}

/**
 * TestButton 원자(Atom) 컴포넌트입니다.
 * 가장 기본적인 UI 요소로, 다른 컴포넌트의 구성 요소로 사용됩니다.
 */
export const TestButton: React.FC<TestButtonProps> = ({ className = '' }) => {
  return (
    <div className={`p-4 bg-white rounded-lg shadow-sm ${className}`}>
      TestButton
    </div>
  );
};