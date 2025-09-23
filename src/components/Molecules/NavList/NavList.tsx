import * as React from 'react';
import classNames from 'classnames';

export type NavItem = { label: string; href: string; active?: boolean };

export type NavListProps = {
  /** GNB 항목들 */
  items: NavItem[];
  /** ul에 추가 클래스 */
  className?: string;
  /** 내비 레이블(접근성) */
  ariaLabel?: string;
  /**
   * 링크 클릭 핸들러 (Storybook에서 이동 방지하려면 e.preventDefault() 권장)
   * 기본: 전달 안함(그대로 이동)
   */
  onItemClick?: (item: NavItem, index: number, e: React.MouseEvent<HTMLAnchorElement>) => void;
};

/**
 * 데스크톱 GNB 리스트
 * - 전역 CSS(.nav, .nav_item, .is-active)를 사용합니다.
 * - 반응형 전역 헬퍼(sm_hidden, md_hidden)도 유지합니다.
 */
export function NavList({ items, className, ariaLabel = '주요 메뉴', onItemClick }: NavListProps) {
  return (
    <ul className={classNames('nav sm_hidden md_hidden', className)} aria-label={ariaLabel}>
      {items.map((item, idx) => (
        <li key={item.href || `${item.label}-${idx}`} className={classNames('nav_item', item.active && 'is-active')}>
          <a
            href={item.href}
            onClick={e => {
              if (onItemClick) {
                e.preventDefault();
                onItemClick(item, idx, e);
              }
            }}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default NavList;
