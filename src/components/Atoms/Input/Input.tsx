import styles from './Input.module.scss';

import type React from 'react';

/**
 * Input 컴포넌트의 props를 정의합니다.
 */
export interface InputProps {
  /** 입력값 */
  readonly value: string;
  /** 값 변경 핸들러 */
  readonly onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** placeholder */
  readonly placeholder?: string;
  /** 비활성화 여부 */
  readonly disabled?: boolean;
  /** 크기 (small, medium, large) */
  readonly size?: 'small' | 'medium' | 'large';
  /** 추가 클래스 */
  readonly className?: string;
  /** input type */
  readonly type?: string;
  /** 키 입력 핸들러 */
  readonly onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

/**
 * 표준 HTML input 요소를 감싼 기본 입력 필드 컴포넌트입니다.
 * 다양한 크기와 상태(비활성화 등)를 지원합니다.
 * @param {InputProps} props - 입력 필드 컴포넌트의 props.
 * @returns {React.ReactElement} - 렌더링된 입력 필드 컴포넌트.
 */
export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = '',
  disabled = false,
  size = 'medium',
  className = '',
  type = 'text',
  onKeyDown = () => {},
}) => {
  const inputClass = [styles.input, styles[size], className]
    .filter(Boolean)
    .join(' ');

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      disabled={disabled}
      className={inputClass}
    />
  );
};
