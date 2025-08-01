import React from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

export interface FooterProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'minimal' | 'dark';
  fixed?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  children,
  className,
  variant = 'default',
  fixed = false,
}) => {
  return (
    <footer
      className={cx('footer', className, {
        [`variant-${variant}`]: variant,
        fixed: fixed,
      })}
    >
      {children}
    </footer>
  );
};
