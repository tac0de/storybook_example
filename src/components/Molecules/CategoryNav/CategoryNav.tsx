import React, { memo } from 'react';
import classNamesBind from 'classnames/bind';
import styles from './CategoryNav.module.scss';
import TextLink from '../../Atoms/TextLink/TextLink';

const cx = classNamesBind.bind(styles);

export type CategoryItem = {
  label: string;
  href: string;
  active?: boolean;
  emphasized?: boolean; // 굵게/강조 (예: '스포츠')
  // children?: CategoryItem[]; // 하위 메뉴 필요 시 확장
};

export interface CategoryNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: CategoryItem[];
  /** 모바일에서 가로 스크롤 허용 */
  scrollableOnMobile?: boolean;
  /** 좌우 페이드 섀도(스크롤 힌트) 표시 */
  withEdgeFade?: boolean;
  /** 클릭 콜백(라우터 없이 제어하려면 사용) */
  onItemClick?: (item: CategoryItem, index: number, event: React.MouseEvent) => void;
  /** aria-label 커스터마이즈 */
  ariaLabel?: string;
}

const CategoryNav: React.FC<CategoryNavProps> = memo(function CategoryNav({
  items,
  scrollableOnMobile = true,
  withEdgeFade = true,
  onItemClick,
  ariaLabel = 'Main categories',
  className,
  ...rest
}) {
  return (
    <nav {...rest} aria-label={ariaLabel} className={cx('root', { scrollableOnMobile, withEdgeFade }, className)}>
      <ul className={cx('list')} role="list">
        {items.map((it, idx) => {
          const handleClick = (e: React.MouseEvent) => {
            if (onItemClick) {
              e.preventDefault(); // 라우팅을 외부에서 제어할 때
              onItemClick(it, idx, e);
            }
          };

          return (
            <li key={it.href + idx} className={cx('item', { active: it.active, emphasized: it.emphasized })}>
              <TextLink
                href={it.href}
                className={cx('link')}
                active={it.active}
                onClick={onItemClick ? handleClick : undefined}
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

export default CategoryNav;
