import type React from 'react';

export interface InputProps {
  /** 입력값 */
  readonly value: string;
  /** 값 변경 핸들러 */
  readonly onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** placeholder */
  readonly placeholder?: string;
  /** 라벨 */
  readonly label?: string;
  /** 도움말 텍스트 */
  readonly helperText?: string;
  /** 에러 메시지 */
  readonly error?: string;
  /** 비활성화 여부 */
  readonly disabled?: boolean;
  /** 읽기 전용 */
  readonly readOnly?: boolean;
  /** 필수 입력 */
  readonly required?: boolean;
  /** 크기 */
  readonly size?: 'sm' | 'md' | 'lg';
  /** 변형 */
  readonly variant?: 'outline' | 'filled' | 'flushed';
  /** 왼쪽 아이콘 */
  readonly leftIcon?: React.ReactNode;
  /** 오른쪽 아이콘 */
  readonly rightIcon?: React.ReactNode;
  /** input type */
  readonly type?:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'
    | 'url'
    | 'search';
  /** 최대 길이 */
  readonly maxLength?: number;
  /** 최소 길이 */
  readonly minLength?: number;
  /** 키 입력 핸들러 */
  readonly onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  /** 포커스 핸들러 */
  readonly onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** 블러 핸들러 */
  readonly onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** 추가 클래스 */
  readonly className?: string;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  label,
  helperText,
  error,
  disabled = false,
  readOnly = false,
  required = false,
  size = 'md',
  variant = 'outline',
  leftIcon,
  rightIcon,
  type = 'text',
  maxLength,
  minLength,
  onKeyDown,
  onFocus,
  onBlur,
  className = '',
}) => {
  // 크기별 클래스
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-4 py-3 text-base',
  };

  // 변형별 클래스
  const variantClasses = {
    outline:
      'border border-gray-300 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
    filled:
      'border border-transparent bg-gray-100 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
    flushed:
      'border-b border-gray-300 bg-transparent focus:border-blue-500 focus:ring-0',
  };

  // 상태별 클래스
  const stateClasses = {
    error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
    disabled: 'bg-gray-100 text-gray-400 cursor-not-allowed',
    readOnly: 'bg-gray-50 text-gray-600',
  };

  const baseClasses = 'w-full rounded-md transition-colors outline-none';
  const iconClasses =
    'absolute inset-y-0 flex items-center pointer-events-none';

  const combinedClasses = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    error ? stateClasses.error : '',
    disabled ? stateClasses.disabled : '',
    readOnly ? stateClasses.readOnly : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const hasLeftIcon = !!leftIcon;
  const hasRightIcon = !!rightIcon;

  return (
    <div className='w-full'>
      {label && (
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </label>
      )}

      <div className='relative'>
        {leftIcon && (
          <div className={`${iconClasses} left-0 pl-3 text-gray-400`}>
            {leftIcon}
          </div>
        )}

        <input
          type={type}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          maxLength={maxLength}
          minLength={minLength}
          className={`${combinedClasses} ${hasLeftIcon ? 'pl-10' : ''} ${
            hasRightIcon ? 'pr-10' : ''
          }`}
        />

        {rightIcon && (
          <div className={`${iconClasses} right-0 pr-3 text-gray-400`}>
            {rightIcon}
          </div>
        )}
      </div>

      {(helperText || error) && (
        <p
          className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};
