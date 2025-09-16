/**
 * AuthenticationMenu 컴포넌트
 *
 * 사용자 인증 상태에 따라 다른 메뉴를 표시하는 분자 컴포넌트입니다.
 * 로그인/로그아웃 상태를 관리하고 적절한 UI를 제공합니다.
 *
 * 주요 기능:
 * - 로그인/로그아웃 상태 관리
 * - 사용자 정보 표시
 * - 드롭다운 메뉴 지원
 * - 접근성 지원
 * - 커스터마이징 가능한 액션
 */

import React, { memo, useState } from 'react';
import classNames from 'classnames';
import './AuthenticationMenu.scss';

/**
 * 사용자 정보 타입
 */
export interface UserInfo {
  /** 사용자 ID */
  id: string;
  /** 사용자 이름 */
  name: string;
  /** 사용자 이메일 */
  email?: string;
  /** 프로필 이미지 URL */
  avatar?: string;
}

/**
 * 메뉴 아이템 타입
 */
export interface MenuItem {
  /** 메뉴 라벨 */
  label: string;
  /** 클릭 핸들러 */
  onClick: () => void;
  /** 아이콘 */
  icon?: React.ReactNode;
  /** 구분선 표시 */
  divider?: boolean;
}

/**
 * AuthenticationMenu 컴포넌트의 Props 인터페이스
 */
export interface AuthenticationMenuProps {
  /** 로그인 상태 */
  isLoggedIn: boolean;
  /** 사용자 정보 (로그인 시) */
  userInfo?: UserInfo;
  /** 로그인 버튼 텍스트 */
  loginText?: string;
  /** 로그아웃 버튼 텍스트 */
  logoutText?: string;
  /** 로그인 핸들러 */
  onLogin?: () => void;
  /** 로그아웃 핸들러 */
  onLogout?: () => void;
  /** 추가 메뉴 아이템들 */
  menuItems?: MenuItem[];
  /** 드롭다운 표시 여부 */
  showDropdown?: boolean;
  /** 컴팩트 모드 (아바타만 표시) */
  compact?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * AuthenticationMenu 컴포넌트
 */
const AuthenticationMenu: React.FC<AuthenticationMenuProps> = memo(function AuthenticationMenu({
  isLoggedIn,
  userInfo,
  loginText = '로그인',
  logoutText = '로그아웃',
  onLogin,
  onLogout,
  menuItems = [],
  showDropdown = true,
  compact = false,
  className,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const classes = classNames(
    'auth-menu',
    {
      'auth-menu--logged-in': isLoggedIn,
      'auth-menu--compact': compact,
      'auth-menu--dropdown-open': isDropdownOpen,
    },
    className
  );

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenuItemClick = (item: MenuItem) => {
    item.onClick();
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setIsDropdownOpen(false);
  };

  // 로그아웃 상태
  if (!isLoggedIn) {
    return (
      <div className={classes}>
        <button type="button" className="auth-menu__login-btn" onClick={onLogin}>
          {loginText}
        </button>
      </div>
    );
  }

  // 로그인 상태
  const hasMenuItems = menuItems.length > 0;
  const shouldShowDropdown = showDropdown && (hasMenuItems || onLogout);

  return (
    <div className={classes}>
      {shouldShowDropdown ? (
        <div className="auth-menu__dropdown">
          <button
            type="button"
            className="auth-menu__trigger"
            onClick={toggleDropdown}
            aria-expanded={isDropdownOpen}
            aria-haspopup="menu"
          >
            {userInfo?.avatar && (
              <img src={userInfo.avatar} alt={`${userInfo.name} 프로필`} className="auth-menu__avatar" />
            )}
            {!compact && <span className="auth-menu__user-name">{userInfo?.name}</span>}
            <i className="auth-menu__dropdown-icon" aria-hidden="true">
              ▼
            </i>
          </button>

          {isDropdownOpen && (
            <div className="auth-menu__dropdown-menu" role="menu">
              {!compact && userInfo && (
                <div className="auth-menu__user-info">
                  <div className="auth-menu__user-name">{userInfo.name}</div>
                  {userInfo.email && <div className="auth-menu__user-email">{userInfo.email}</div>}
                </div>
              )}

              {menuItems.map((item, index) => (
                <React.Fragment key={index}>
                  {item.divider && <div className="auth-menu__divider" />}
                  <button
                    type="button"
                    className="auth-menu__menu-item"
                    onClick={() => handleMenuItemClick(item)}
                    role="menuitem"
                  >
                    {item.icon && (
                      <span className="auth-menu__menu-icon" aria-hidden="true">
                        {item.icon}
                      </span>
                    )}
                    {item.label}
                  </button>
                </React.Fragment>
              ))}
              {onLogout && (
                <>
                  {menuItems.length > 0 && <div className="auth-menu__divider" />}
                  <button
                    type="button"
                    className="auth-menu__menu-item auth-menu__logout"
                    onClick={handleLogout}
                    role="menuitem"
                  >
                    {logoutText}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="auth-menu__simple">
          {userInfo?.avatar && (
            <img src={userInfo.avatar} alt={`${userInfo.name} 프로필`} className="auth-menu__avatar" />
          )}
          {!compact && <span className="auth-menu__user-name">{userInfo?.name}</span>}
        </div>
      )}
    </div>
  );
});

export default AuthenticationMenu;
