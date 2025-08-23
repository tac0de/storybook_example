import React, { memo } from 'react';
import classNamesBind from 'classnames/bind';
import styles from './UtilityLinks.module.scss';
import TextLink from '../../Atoms/TextLink/TextLink';

const cx = classNamesBind.bind(styles);

export type UtilityLinkItem = {
  label: string;
  href: string;
  active?: boolean;
  muted?: boolean;
  external?: boolean; // target="_blank" rel="noreferrer"
};

export type SeparatorStyle = 'pipe' | 'dot' | 'none';

export interface UtilityLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  items: UtilityLinkItem[];
  separator?: SeparatorStyle; // default 'pipe'
  condensed?: boolean; // 간격 축약
  wrap?: boolean; // 줄바꿈 허용
  ariaLabel?: string; // nav aria-label
  onItemClick?: (item: UtilityLinkItem, index: number, e: React.MouseEvent) => void;
}

const UtilityLinks: React.FC<UtilityLinksProps> = memo(function UtilityLinks({
  items,
  separator = 'pipe',
  condensed = false,
  wrap = false,
  ariaLabel = 'Utility links',
  onItemClick,
  className,
  ...rest
}) {
  return (
    <nav {...rest} aria-label={ariaLabel} className={cx('root', { condensed, wrap }, className)}>
      <ul className={cx('list')} role="list">
        {items.map((it, idx) => {
          const isLast = idx === items.length - 1;
          const handleClick = (e: React.MouseEvent) => {
            if (onItemClick) {
              e.preventDefault();
              onItemClick(it, idx, e);
            }
          };
          return (
            <li key={it.href + idx} className={cx('item', `sep-${separator}`, { last: isLast })}>
              <TextLink
                href={it.href}
                className={cx('link')}
                active={it.active}
                muted={it.muted}
                onClick={onItemClick ? handleClick : undefined}
                target={it.external ? '_blank' : undefined}
                rel={it.external ? 'noreferrer' : undefined}
              >
                {it.label}
              </TextLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
});

export default UtilityLinks;
