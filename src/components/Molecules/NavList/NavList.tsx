import * as React from 'react';
import classNames from 'classnames';
import { NavLink } from '../../Atoms/NavLink/NavLink';

export type NavItem = { label: string; href: string; active?: boolean; ariaLabel?: string };

const LIST_CLASS = 'nav sm_hidden md_hidden';

export type NavListProps = {
  items: NavItem[];
  className?: string;
  listClassName?: string;
  itemClassName?: string;
  activeClassName?: string;
  linkClassName?: string;
  ariaLabel?: string;
  onItemClick?: (item: NavItem, index: number, e: React.MouseEvent<HTMLAnchorElement>) => void;
};

export function NavList({
  items,
  className,
  listClassName = LIST_CLASS,
  itemClassName = 'nav_item',
  activeClassName = 'is-active',
  linkClassName,
  ariaLabel = '주요 메뉴',
  onItemClick,
}: NavListProps) {
  const handleClick = React.useCallback(
    (item: NavItem, index: number) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (!onItemClick) return;
      event.preventDefault();
      onItemClick(item, index, event);
    },
    [onItemClick]
  );

  return (
    <ul className={classNames(listClassName, className)} aria-label={ariaLabel}>
      {items.map((item, idx) => (
        <NavLink
          key={item.href || `${item.label}-${idx}`}
          href={item.href}
          active={item.active}
          ariaLabel={item.ariaLabel}
          baseClassName={itemClassName}
          activeClassName={activeClassName}
          linkClassName={linkClassName}
          onClick={onItemClick ? handleClick(item, idx) : undefined}
        >
          {item.label}
        </NavLink>
      ))}
    </ul>
  );
}

export default NavList;
