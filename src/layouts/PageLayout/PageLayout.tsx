import React from 'react';
import classNames from 'classnames/bind';
import styles from './PageLayout.module.scss';

const cx = classNames.bind(styles);

export interface PageLayoutProps {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hasSidebar?: boolean;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  header,
  sidebar,
  children,
  footer,
  className,
  maxWidth = 'lg',
  padding = 'md',
  hasSidebar = false,
}) => {
  return (
    <div className={cx('page-layout', className)}>
      {header && <header className={cx('page-header')}>{header}</header>}

      <main
        className={cx('page-main', {
          'has-sidebar': hasSidebar,
        })}
      >
        {hasSidebar && sidebar && (
          <aside className={cx('page-sidebar')}>{sidebar}</aside>
        )}

        <div
          className={cx('page-content', {
            [`max-width-${maxWidth}`]: maxWidth !== 'full',
            [`padding-${padding}`]: padding !== 'none',
          })}
        >
          {children}
        </div>
      </main>

      {footer && <footer className={cx('page-footer')}>{footer}</footer>}
    </div>
  );
};
