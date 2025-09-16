/**
 * NavList 컴포넌트
 *
 * 네비게이션 링크들을 리스트 형태로 표시하는 재사용 가능한 분자 컴포넌트입니다.
 * 다양한 네비게이션 패턴을 지원합니다.
 *
 * 주요 기능:
 * - 수평/수직 레이아웃 지원
 * - 활성 상태 표시
 * - 반응형 숨김 클래스 지원
 * - 접근성 지원
 * - 다양한 스타일 변형
 */

import React, { memo } from 'react';
import classNames from 'classnames';
import './NavList.scss';

/**
 * 네비게이션 아이템 타입
 */
export interface NavItem {
  /** 링크 텍스트 */
  label: string;
  /** 링크 URL */
  href: string;
  /** 활성 상태 */
  active?: boolean;
  /** 외부 링크 여부 */
  external?: boolean;
  /** 접근성 라벨 */
  ariaLabel?: string;
}

/**
 * NavList 컴포넌트의 Props 인터페이스
 */
export interface NavListProps {
  /** 네비게이션 아이템 배열 */
  items: NavItem[];
  /** 레이아웃 방향 */
  direction?: 'horizontal' | 'vertical';
  /** 스타일 변형 */
  variant?: 'default' | 'pills' | 'tabs' | 'breadcrumb';
  /** 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 반응형 숨김 클래스 */
  responsiveHidden?: 'sm_hidden' | 'md_hidden' | 'lg_hidden' | 'sm_hidden md_hidden';
  /** 접근성 라벨 */
  ariaLabel?: string;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 아이템 클릭 핸들러 */
  onItemClick?: (item: NavItem, index: number, e: React.MouseEvent) => void;
}

/**
 * NavList 컴포넌트
 */
const NavList: React.FC<NavListProps> = memo(function NavList({
  items,
  direction = 'horizontal',
  variant = 'default',
  size = 'md',
  responsiveHidden,
  ariaLabel,
  className,
  onItemClick,
}) {
  const classes = classNames(
    'nav-list',
    `nav-list--${direction}`,
    `nav-list--${variant}`,
    `nav-list--${size}`,
    responsiveHidden,
    className
  );

  const handleItemClick = (item: NavItem, index: number) => (e: React.MouseEvent) => {
    if (onItemClick) {
      onItemClick(item, index, e);
    }
  };

  return (
    <nav className={classes} aria-label={ariaLabel}>
      <ul className="nav-list__list" role="list">
        {items.map((item, index) => {
          const itemClasses = classNames('nav-list__item', {
            'nav-list__item--active': item.active,
          });

          return (
            <li key={`${item.href}-${index}`} className={itemClasses}>
              <a
                href={item.href}
                className="nav-list__link"
                aria-label={item.ariaLabel}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                onClick={handleItemClick(item, index)}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
});

export default NavList;
