import React, { memo } from 'react';
import cxBind from 'classnames/bind';
import styles from './Header.module.scss';

import BrandBlock from '../../Molecules/BrandBlock/BrandBlock';
import CategoryNav, { type CategoryItem } from '../../Molecules/CategoryNav/CategoryNav';
import UtilityLinks, { type UtilityLinkItem } from '../../Molecules/UtilityLinks/UtilityLinks';
import Button from '../../Atoms/Buttton/Button';
import Icon from '../../Atoms/Icon/Icon';

const cx = cxBind.bind(styles);

export type HeaderProps = React.HTMLAttributes<HTMLElement> & {
  /** 메인 카테고리 */
  navItems: CategoryItem[];
  /** 유틸리티 링크(언어/로그인 등). 표시 여부는 showLanguage/showAuth로 제어 가능 */
  languageItems?: UtilityLinkItem[];
  authItems?: UtilityLinkItem[];

  /** 표시 토글 */
  showLanguage?: boolean;
  showAuth?: boolean;
  showPlus?: boolean; // The JoongAng Plus 버튼
  showSearch?: boolean;

  /** 시각 변형 */
  sticky?: boolean; // 상단 고정 + 그림자
  compact?: boolean; // 높이/간격 축약

  /** 상호작용 콜백 */
  onOpenMenu?: () => void;
  onOpenSearch?: () => void;

  /** 브랜드 클릭 링크 */
  homeHref?: string;
};

const Header: React.FC<HeaderProps> = memo(function Header({
  navItems,
  languageItems = [],
  authItems = [],
  showLanguage = true,
  showAuth = true,
  showPlus = true,
  showSearch = true,
  sticky = false,
  compact = false,
  onOpenMenu,
  onOpenSearch,
  homeHref = '/',
  className,
  ...rest
}) {
  return (
    <header {...rest} className={cx('root', { sticky, compact }, className)}>
      {/* Top Row (모바일/데스크탑 공통) */}
      <div className={cx('row', 'top')}>
        <div className={cx('left')}>
          <BrandBlock href={homeHref} compact={compact} />
        </div>

        {/* 데스크탑 우측 상단: 유틸리티 */}
        <div className={cx('right', 'rightTop')}>
          {showLanguage && languageItems.length > 0 && (
            <UtilityLinks items={languageItems} separator="pipe" condensed />
          )}
          {showAuth && authItems.length > 0 && <UtilityLinks items={authItems} separator="pipe" condensed />}

          {/* 아이콘-only 버튼 묶음 */}
          <div className={cx('iconGroup')}>
            {/* 메뉴(모바일 우선, 데스크탑에서도 필요하면 유지) */}
            <Button
              variant="ghost"
              iconOnly
              aria-label="Open menu"
              onClick={onOpenMenu}
              leadingIcon={<Icon name="navbar" ariaLabel="" />}
            />
            {/* 검색 */}
            {showSearch && (
              <Button
                variant="ghost"
                iconOnly
                aria-label="Open search"
                onClick={onOpenSearch}
                leadingIcon={<Icon name="search" ariaLabel="" />}
              />
            )}
            {/* 두 아이콘 버튼 예시(필요 시 주석 해제)
            <Button
              variant="ghost"
              iconOnly
              grouped
              aria-label="Prev & Next"
              iconsGap={4}
              icons={[
                <Icon key="l" name="chevron_right" ariaLabel="" />,
                <Icon key="r" name="chevron_right" ariaLabel="" />
              ]}
            />
            */}
          </div>

          {/* Plus 버튼 (캡슐) */}
          {showPlus && (
            <Button
              variant="outline"
              pill
              className={cx('plusBtn')}
              trailingIcon={<Icon name="chevron_right" ariaLabel="" />}
              href="#"
            >
              The JoongAng Plus
            </Button>
          )}
        </div>
      </div>

      {/* Bottom Row (데스크탑 네비) */}
      <div className={cx('row', 'bottom')}>
        <CategoryNav items={navItems} />
      </div>

      {/* 모바일 보조 바 (언어/유틸 간단 노출이 필요하면 여기 확장 가능) */}
    </header>
  );
});

export default Header;
