import styles from './Button.module.scss';

import type React from 'react';

/**
 * Button 컴포넌트의 props를 정의합니다.
 */
export interface ButtonProps {
  /** 버튼 텍스트 */
  readonly children: React.ReactNode;
  /** 버튼 타입 */
  readonly type?: 'button' | 'submit' | 'reset';
  /** 비활성화 여부 */
  readonly disabled?: boolean;
  /** variant 스타일 */
  readonly variant?: 'primary' | 'secondary' | 'danger';
  /** 크기 */
  readonly size?: 'small' | 'medium' | 'large';
  /** 추가 클래스 */
  readonly className?: string;
  /** 클릭 핸들러 */
  readonly onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * 다양한 스타일과 크기를 지원하는 기본 버튼 컴포넌트입니다.
 * @param {ButtonProps} props - 버튼 컴포넌트의 props.
 * @returns {React.ReactElement} - 렌더링된 버튼 컴포넌트.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  disabled = false,
  variant = 'primary',
  size = 'medium',
  className = '',
  onClick = () => {},
}) => {
  const btnClass = [
    styles.button,
    styles[variant],
    size !== 'medium' ? styles[size] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      disabled={disabled}
      className={btnClass}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
