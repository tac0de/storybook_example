import React, { memo } from 'react';
import classNames from 'classnames';
import './Header.scss';

import BrandBlock from '../../Molecules/BrandBlock/BrandBlock';
import CategoryNav, { type CategoryItem } from '../../Molecules/CategoryNav/CategoryNav';
import UtilityLinks, { type UtilityLinkItem } from '../../Molecules/UtilityLinks/UtilityLinks';
import Icon from '../../Atoms/Icon/Icon';

type Variant = 'mobile' | 'tablet' | 'desktop';
/**
 * Header 컴포넌트의 Props 인터페이스
 * @description 웹사이트 상단 헤더를 구성하는 컴포넌트의 속성들
 */
export type HeaderProps = React.HTMLAttributes<HTMLElement> & {
  /** 메인 네비게이션 카테고리 아이템 배열 */
  navItems: CategoryItem[];

  /** 언어 선택 링크 배열 (다국어 지원) */
  languageItems?: UtilityLinkItem[];

  /** 인증 관련 링크 배열 (로그인/회원가입 등) */
  authItems?: UtilityLinkItem[];

  /** 언어 선택 영역 표시 여부 */
  showLanguage?: boolean;

  /** 인증 영역 표시 여부 */
  showAuth?: boolean;

  /** JoongAng Plus 버튼 표시 여부 */
  showPlus?: boolean;

  /** 검색 기능 표시 여부 */
  showSearch?: boolean;

  /** 스크롤 시 상단에 고정할지 여부 */
  sticky?: boolean;

  /** 압축된 레이아웃 사용 여부 (높이/간격 축소) */
  compact?: boolean;

  /** 모바일 메뉴 열기 콜백 함수 */
  onOpenMenu?: () => void;

  /** 검색 모달 열기 콜백 함수 */
  onOpenSearch?: () => void;

  /** 브랜드 로고 클릭 시 이동할 홈 URL */
  homeHref?: string;

  variants?: Variant;
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
  variants = 'mobile',
  ...rest
}) {
  return (
    <header
      {...rest}
      className={classNames(
        'header',
        variants ?? `header--${variants}`,
        {
          'header--sticky': sticky,
          'header--compact': compact,
        },
        className
      )}
    >
      <div className="header__row">
        <div className="header__left">
          <BrandBlock wordWidth={127} markWidth={56} href={homeHref} compact={compact} />
        </div>
        <div className="header__right">
          <CategoryNav items={navItems} />
          <div className="header__right-top">
            <div className="header__search-button">
              <Icon className="header__search-icon" name="search-ai" size="md" />
            </div>
            <Icon name="navbar" size="md" />
            <div className="header__shortcut-plus">
              <Icon name="shortcut-plus" size="xl" />
            </div>
          </div>
          <UtilityLinks items={authItems} condensed={compact} />
        </div>
      </div>
    </header>
  );
});

export default Header;
