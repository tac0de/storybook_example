import React, { memo, useState, useEffect } from 'react';
import cxBind from 'classnames/bind';
import styles from './Header.module.scss';

import BrandBlock from '../../Molecules/BrandBlock/BrandBlock';
import { type CategoryItem } from '../../Molecules/CategoryNav/CategoryNav';
import UtilityLinks, { type UtilityLinkItem } from '../../Molecules/UtilityLinks/UtilityLinks';
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
  // Animated search icon state
  const [currentSearchIcon, setCurrentSearchIcon] = useState<'search_gra' | 'search_ai'>('search_gra');
  // const [iconOpacity, setIconOpacity] = useState(1);

  // Cycle through search icons every 0.5 seconds with fade effect
  useEffect(() => {
    const searchIcons: ('search_gra' | 'search_ai')[] = ['search_gra', 'search_ai'];
    let currentIndex = 0;

    const changeIcon = () => {
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % searchIcons.length;
        setCurrentSearchIcon(searchIcons[currentIndex]);
      }, 1000);
    };

    const interval = setInterval(changeIcon, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header {...rest} className={cx('root', { sticky, compact }, className)}>
      <div className={cx('row')}>
        <div className={cx('left')}>
          <BrandBlock wordWidth={127} markWidth={56} href={homeHref} compact={compact} />
        </div>
        <div className={cx('right')}>
          <div className={cx('rightTop')}>
            <Icon className={cx('searchIcon')} name={currentSearchIcon} size="md" />
            <Icon name="navbar" size="md" />
            <div className={cx('shortcutPlus')}>
              <Icon name="shortcut_plus" size="xl" />
            </div>
          </div>
          <UtilityLinks items={authItems} condensed={compact} />
        </div>
      </div>
    </header>
  );
});

export default Header;
