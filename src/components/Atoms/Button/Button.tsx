import type React from 'react';

export interface ButtonProps {
  /** 버튼 텍스트 */
  readonly children: React.ReactNode;
  /** 버튼 타입 */
  readonly type?: 'button' | 'submit' | 'reset';
  /** 버튼 변형 */
  readonly variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /** 버튼 크기 */
  readonly size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** 비활성화 여부 */
  readonly disabled?: boolean;
  /** 로딩 상태 */
  readonly loading?: boolean;
  /** 전체 너비 */
  readonly fullWidth?: boolean;
  /** 아이콘 (왼쪽) */
  readonly leftIcon?: React.ReactNode;
  /** 아이콘 (오른쪽) */
  readonly rightIcon?: React.ReactNode;
  /** 테두리 반경 */
  readonly borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** 텍스트 색상 */
  readonly color?: string;
  /** 배경 색상 */
  readonly backgroundColor?: string;
  /** 클릭 핸들러 */
  readonly onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** 추가 클래스 */
  readonly className?: string;
}

// 기본 아이콘들
const LoadingSpinner: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <svg
    className={`animate-spin ${className}`}
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
  >
    <circle
      className='opacity-25'
      cx='12'
      cy='12'
      r='10'
      stroke='currentColor'
      strokeWidth='4'
    />
    <path
      className='opacity-75'
      fill='currentColor'
      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
    />
  </svg>
);

export const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  borderRadius,
  color,
  backgroundColor,
  onClick,
  className = '',
}) => {
  // 변형별 클래스
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline:
      'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  // 크기별 클래스
  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };

  // 아이콘 크기 클래스
  const iconSizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6',
  };

  // 테두리 반경 클래스
  const borderRadiusClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };

  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const widthClasses = fullWidth ? 'w-full' : '';

  // 기본 테두리 반경 (borderRadius prop이 없을 때)
  const defaultBorderRadius = 'rounded-md';
  const borderRadiusClass = borderRadius
    ? borderRadiusClasses[borderRadius]
    : defaultBorderRadius;

  const combinedClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    borderRadiusClass,
    widthClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const iconClass = iconSizeClasses[size];

  // 인라인 스타일 (color와 backgroundColor가 제공된 경우)
  const inlineStyles: React.CSSProperties = {};
  if (color) {
    inlineStyles.color = color;
  }
  if (backgroundColor) {
    inlineStyles.backgroundColor = backgroundColor;
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={combinedClasses}
      style={inlineStyles}
      onClick={onClick}
    >
      {loading && <LoadingSpinner className={`${iconClass} mr-2`} />}

      {!loading && leftIcon && (
        <span className={`${iconClass} mr-2`}>{leftIcon}</span>
      )}

      <span>{children}</span>

      {!loading && rightIcon && (
        <span className={`${iconClass} ml-2`}>{rightIcon}</span>
      )}
    </button>
  );
};
