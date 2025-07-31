import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

export interface HeaderProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'minimal' | 'elevated';
  sticky?: boolean;
  transparent?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  children,
  className,
  variant = 'default',
  sticky = false,
  transparent = false,
}) => {
  return (
    <header
      className={cx('header', className, {
        [`variant-${variant}`]: variant,
        sticky: sticky,
        transparent: transparent,
      })}
    >
      {children}
    </header>
  );
};
