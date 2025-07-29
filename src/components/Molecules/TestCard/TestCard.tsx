import type React from 'react';

export interface TestCardProps {
  readonly className?: string;
}

/**
 * TestCard 분자(Molecule) 컴포넌트입니다.
 * 여러 원자 컴포넌트를 조합하여 특정 기능을 제공합니다.
 */
export const TestCard: React.FC<TestCardProps> = ({ className = '' }) => {
  return (
    <div className={`p-4 bg-white rounded-lg shadow-sm ${className}`}>
      TestCard
    </div>
  );
};