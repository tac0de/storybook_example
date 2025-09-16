// components/Organisms/HeaderBar/GnbNav.tsx
import * as React from 'react';
import classNames from 'classnames';
import type { NavItem } from './types';

type Props = { items: NavItem[] };

function GnbNav({ items }: Props) {
  return (
    <ul className="nav sm_hidden md_hidden">
      {items.map(item => (
        <li className={classNames('nav_item', item.active && 'is-active')} key={item.href}>
          <a href={item.href}>{item.label}</a>
        </li>
      ))}
    </ul>
  );
}

export default React.memo(GnbNav);
