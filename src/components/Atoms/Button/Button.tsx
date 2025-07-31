import React from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

export interface ButtonProps {
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'text';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  borderRadius = 'md',
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  icon,
  onClick,
  className,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.();
  };

  // icon prop이 있으면 icon-only 버튼
  const isIconOnly = !!icon && !children;

  return (
    <button
      type={type}
      className={cx(
        'button',
        `variant-${variant}`,
        `size-${size}`,
        `border-radius-${borderRadius}`,
        {
          'full-width': fullWidth,
          disabled: disabled,
          'icon-only': isIconOnly,
        },
        className
      )}
      disabled={disabled}
      onClick={handleClick}
    >
      {icon && <span className={cx('icon', 'icon-only')}>{icon}</span>}
      {!icon && leftIcon && (
        <span className={cx('icon', 'left-icon')}>{leftIcon}</span>
      )}
      {children && <span className={cx('content')}>{children}</span>}
      {!icon && rightIcon && (
        <span className={cx('icon', 'right-icon')}>{rightIcon}</span>
      )}
    </button>
  );
};
