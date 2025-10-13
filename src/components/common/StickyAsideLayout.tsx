import classNames from 'classnames';
import type { CSSProperties, ReactNode } from 'react';

export type StickyAsideLayoutProps = {
  main: ReactNode;
  aside: ReactNode;
  className?: string;
  mainClassName?: string;
  asideClassName?: string;
  gap?: string;
  columns?: [string, string];
  sticky?: boolean;
  stickyOffset?: number;
};

export default function StickyAsideLayout({
  main,
  aside,
  className,
  mainClassName,
  asideClassName,
  gap = '2rem',
  columns = ['minmax(0, 2fr)', 'minmax(0, 1fr)'],
  sticky = true,
  stickyOffset = 16,
}: StickyAsideLayoutProps) {
  const gridStyle: CSSProperties = {
    display: 'grid',
    gap,
    gridTemplateColumns: columns.join(' '),
    alignItems: 'start',
  };

  const asideStyle: CSSProperties | undefined = sticky
    ? {
        position: 'sticky',
        top: stickyOffset,
      }
    : undefined;

  return (
    <div className={classNames('sticky-aside-layout', className)} style={gridStyle}>
      <div className={classNames('sticky-aside-main', mainClassName)}>{main}</div>
      <aside className={classNames('sticky-aside-panel', asideClassName)} style={asideStyle}>
        {aside}
      </aside>
    </div>
  );
}
