/**
 * Header 컴포넌트
 *
 * 웹사이트의 주요 헤더를 구성하는 유기체 컴포넌트입니다.
 * 브랜드, 네비게이션, 인증 메뉴, 액션 버튼들을 통합하여 제공합니다.
 *
 * 주요 기능:
 * - 브랜드 헤더 표시
 * - 네비게이션 메뉴
 * - 사용자 인증 상태 관리
 * - 액션 버튼 그룹
 * - 반응형 레이아웃
 * - 접근성 지원
 */

import React, { memo, useState } from 'react';
import classNames from 'classnames';
import BrandHeader from '../../Molecules/BrandHeader/BrandHeader';
import NavList, { type NavItem } from '../../Molecules/NavList/NavList';
import AuthenticationMenu from '../../Molecules/AuthenticationMenu/AuthenticationMenu';
import ActionGroup, { type ActionItem } from '../../Molecules/ActionGroup/ActionGroup';
import './Header.scss';

/**
 * 헤더 컴포넌트의 Props 인터페이스
 */
export interface HeaderProps {
  /** 브랜드 로고 이미지 URL */
  logoSrc?: string;
  /** 브랜드 엠블럼 이미지 URL */
  emblemSrc?: string;
  /** 브랜드 이름 */
  brandName?: string;
  /** 브랜드 클릭 시 이동할 URL */
  brandHref?: string;
  /** 브랜드 클릭 핸들러 */
  onBrandClick?: (e: React.MouseEvent) => void;
  /** 네비게이션 아이템 배열 */
  navItems?: NavItem[];
  /** 네비게이션 레이아웃 */
  navLayout?: 'horizontal' | 'vertical';
  /** 사용자 로그인 상태 */
  isLoggedIn?: boolean;
  /** 사용자 정보 */
  user?: {
    name: string;
    email?: string;
    avatar?: string;
  };
  /** 로그인 핸들러 */
  onLogin?: () => void;
  /** 로그아웃 핸들러 */
  onLogout?: () => void;
  /** 프로필 클릭 핸들러 */
  onProfileClick?: () => void;
  /** 액션 아이템 배열 */
  actionItems?: ActionItem[];
  /** 헤더 변형 */
  variant?: 'default' | 'compact' | 'minimal';
  /** 헤더 위치 */
  position?: 'static' | 'sticky' | 'fixed';
  /** 배경 투명도 */
  transparent?: boolean;
  /** 그림자 표시 */
  shadow?: boolean;
  /** 모바일 메뉴 표시 여부 */
  showMobileMenu?: boolean;
  /** 모바일 메뉴 토글 핸들러 */
  onMobileMenuToggle?: () => void;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * Header 컴포넌트
 */
const Header: React.FC<HeaderProps> = memo(function Header({
  logoSrc,
  emblemSrc,
  brandName = 'Brand',
  brandHref = '/',
  onBrandClick,
  navItems = [],
  navLayout = 'horizontal',
  isLoggedIn = false,
  user,
  onLogin,
  onLogout,
  onProfileClick,
  actionItems = [],
  variant = 'default',
  position = 'static',
  transparent = false,
  shadow = true,
  showMobileMenu = false,
  onMobileMenuToggle,
  className,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(showMobileMenu);

  const classes = classNames(
    'header',
    `header--${variant}`,
    `header--${position}`,
    {
      'header--transparent': transparent,
      'header--shadow': shadow,
      'header--mobile-menu-open': mobileMenuOpen,
    },
    className
  );

  const handleMobileMenuToggle = () => {
    const newState = !mobileMenuOpen;
    setMobileMenuOpen(newState);
    onMobileMenuToggle?.();
  };

  const mobileMenuButtonItem: ActionItem = {
    id: 'mobile-menu-toggle',
    type: 'button',
    content: (
      <>
        <span className="header__mobile-menu-icon">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <span className="sr-only">{mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}</span>
      </>
    ),
    onClick: handleMobileMenuToggle,
    ariaLabel: mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기',
    className: 'header__mobile-menu-button',
    responsiveHidden: 'hidden-md-up',
  };

  const allActionItems = [mobileMenuButtonItem, ...actionItems];

  return (
    <header className={classes} role="banner">
      <div className="header__container">
        {/* Brand Section */}
        <div className="header__brand">
          <BrandHeader
            logoUrl={logoSrc || ''}
            logoAlt={brandName || 'Logo'}
            emblemUrl={emblemSrc}
            emblemAlt="Emblem"
            brandName={brandName}
            href={brandHref}
            onClick={onBrandClick}
            size={variant === 'compact' ? 'sm' : 'md'}
            direction="horizontal"
          />
        </div>

        {/* Navigation Section */}
        {navItems.length > 0 && (
          <nav className="header__nav" aria-label="주요 네비게이션">
            <NavList
              items={navItems}
              direction={navLayout}
              size={variant === 'compact' ? 'sm' : 'md'}
              className="header__nav-list"
              responsiveHidden="sm_hidden"
            />
          </nav>
        )}

        {/* Actions Section */}
        <div className="header__actions">
          {/* Action Items */}
          {allActionItems.length > 0 && (
            <ActionGroup
              items={allActionItems}
              direction="horizontal"
              spacing="normal"
              align="center"
              className="header__action-group"
            />
          )}

          {/* Authentication Menu */}
          <AuthenticationMenu
            isLoggedIn={isLoggedIn}
            userInfo={
              user
                ? {
                    id: user.name || 'user',
                    name: user.name || '',
                    email: user.email,
                    avatar: user.avatar,
                  }
                : undefined
            }
            onLogin={onLogin}
            onLogout={onLogout}
            compact={variant === 'compact'}
            className="header__auth"
          />
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && navItems.length > 0 && (
        <div className="header__mobile-nav" aria-label="모바일 네비게이션">
          <NavList items={navItems} direction="vertical" size="md" className="header__mobile-nav-list" />
        </div>
      )}
    </header>
  );
});

export default Header;
