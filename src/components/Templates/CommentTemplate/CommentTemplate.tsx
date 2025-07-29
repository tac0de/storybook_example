import type React from 'react';

export interface CommentTemplateProps {
  /** 헤더 영역 */
  readonly header?: React.ReactNode;
  /** 상단 영역 (구독 프롬프트, 알림 등) */
  readonly topSection?: React.ReactNode;
  /** 네비게이션/정렬 영역 */
  readonly navigation?: React.ReactNode;
  /** 메인 콘텐츠 영역 */
  readonly children: React.ReactNode;
  /** 하단 영역 (페이지네이션, 로드 더보기 등) */
  readonly bottomSection?: React.ReactNode;
  /** 전체 너비 사용 여부 */
  readonly fullWidth?: boolean;
  /** 최소 높이 */
  readonly minHeight?: string;
  /** 배경 스타일 */
  readonly variant?: 'default' | 'minimal' | 'elevated';
  /** 추가 클래스 */
  readonly className?: string;
}

export const CommentTemplate: React.FC<CommentTemplateProps> = ({
  header,
  topSection,
  navigation,
  children,
  bottomSection,
  fullWidth = false,
  minHeight = 'min-h-96',
  variant = 'default',
  className = '',
}) => {
  const variantClasses = {
    default: 'bg-gray-50 rounded-xl shadow-sm',
    minimal: 'bg-white border border-gray-200 rounded-lg',
    elevated: 'bg-white rounded-xl shadow-lg',
  };

  const widthClasses = fullWidth ? 'w-full' : 'max-w-4xl mx-auto';
  const variantClass = variantClasses[variant];

  return (
    <div
      className={`${variantClass} ${widthClasses} ${minHeight} flex flex-col ${className}`}
    >
      {/* 헤더 섹션 */}
      {header && (
        <div className='p-6 pb-4 border-b border-gray-200'>{header}</div>
      )}

      {/* 상단 섹션 */}
      {topSection && (
        <div className='px-6 py-4 border-b border-gray-100'>{topSection}</div>
      )}

      {/* 네비게이션 섹션 */}
      {navigation && (
        <div className='px-6 py-3 border-b border-gray-100 bg-gray-50/50'>
          {navigation}
        </div>
      )}

      {/* 메인 콘텐츠 */}
      <div className='flex-1 p-6 pt-4'>{children}</div>

      {/* 하단 섹션 */}
      {bottomSection && (
        <div className='px-6 py-4 border-t border-gray-100 bg-gray-50/50'>
          {bottomSection}
        </div>
      )}
    </div>
  );
};
