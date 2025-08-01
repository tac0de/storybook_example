import React from 'react';
import classNames from 'classnames/bind';
import styles from './Container.module.scss';

const cx = classNames.bind(styles);

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  centered?: boolean;
  fluid?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  maxWidth = 'lg',
  padding = 'md',
  centered = true,
  fluid = false,
}) => {
  return (
    <div
      className={cx('container', className, {
        [`max-width-${maxWidth}`]: maxWidth !== 'full' && !fluid,
        [`padding-${padding}`]: padding !== 'none',
        centered: centered && !fluid,
        fluid: fluid,
      })}
    >
      {children}
    </div>
  );
};
