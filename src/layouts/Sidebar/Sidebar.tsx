import React from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

export interface SidebarProps {
  children: React.ReactNode;
  className?: string;
  position?: 'left' | 'right';
  width?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'minimal' | 'elevated';
  collapsible?: boolean;
  collapsed?: boolean;
  onToggle?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  children,
  className,
  position = 'left',
  width = 'md',
  variant = 'default',
  collapsible = false,
  collapsed = false,
  onToggle,
}) => {
  return (
    <aside
      className={cx('sidebar', className, {
        [`position-${position}`]: position,
        [`width-${width}`]: width,
        [`variant-${variant}`]: variant,
        collapsible: collapsible,
        collapsed: collapsed,
      })}
    >
      {collapsible && (
        <button
          className={cx('sidebar-toggle')}
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? '→' : '←'}
        </button>
      )}
      <div className={cx('sidebar-content')}>{children}</div>
    </aside>
  );
};
