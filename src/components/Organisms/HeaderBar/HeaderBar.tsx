// src/components/Organisms/HeaderBar/HeaderBar.tsx
import classNames from 'classnames';
import './HeaderBar.scss';

// Molecules
import { LogoGroup, type LogoGroupProps } from '../../Molecules/LogoGroup/LogoGroup';
import { NavList, type NavItem } from '../../Molecules/NavList/NavList';
import { PlusShortcut, type PlusShortcutProps } from '../../Molecules/PlusShortcut/PlusShortcut';
import { HeaderActions, type HeaderActionsProps } from '../../Molecules/HeaderActions/HeaderActions';

export type HeaderBarUser = { loggedIn: boolean };

export type HeaderBarProps = {
  variant?: 'default' | 'plus' | 'sub' | 'plus-sub';
  className?: string;
  logo: Omit<LogoGroupProps, 'className'>;
  nav?: NavItem[];
  user: HeaderBarUser;
  // Actions
  onOpenMegaMenu: () => void;
  onOpenSearch: () => void;
  onClickJoin: () => void;
  onClickReplica: () => void;
  onLogout?: () => void; // onLogout 핸들러 추가
  // Optional Molecules
  shortcut?: Omit<PlusShortcutProps, 'className'>;
  actions?: Omit<HeaderActionsProps, 'onOpenMegaMenu' | 'onOpenSearch'>;
};

export function HeaderBar({
  variant = 'default',
  className,
  logo,
  nav,
  user,
  onOpenMegaMenu,
  onOpenSearch,
  onClickJoin,
  onLogout,
  shortcut,
  actions,
}: HeaderBarProps) {
  // --- Default (Home) & PlusHome Variants ---
  if (variant === 'default' || variant === 'plus') {
    return (
      <div className={classNames('header_wrap', className)}>
        <LogoGroup {...logo} />
        <div className="header_area flex_sm_column_reverse flex_md_column_reverse">
          <nav className="header_nav">
            {nav && <NavList items={nav} />}
            <PlusShortcut {...shortcut} />
            <HeaderActions onOpenMegaMenu={onOpenMegaMenu} onOpenSearch={onOpenSearch} {...actions} />
          </nav>
        </div>
      </div>
    );
  }

  // --- Sub & PlusSub Variants ---
  if (variant === 'sub' || variant === 'plus-sub') {
    return (
      <div className={classNames('uh', className)}>
        <LogoGroup {...logo} renderAsH1={variant !== 'sub'} />
        <div className="header_right_area">
          {!user.loggedIn ? (
            <>
              <ul className="logout sm_hidden">
                <li>
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      onClickJoin();
                    }}
                  >
                    로그인
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      onClickJoin();
                    }}
                  >
                    회원가입
                  </a>
                </li>
              </ul>
              {/* 로그인 유도 팝오버 (필요 시 상태 관리 추가) */}
              <div className="layer_popup layer_login_popup pop_over hide">{/* ... 팝오버 내부 구조 ... */}</div>
            </>
          ) : (
            <ul className="login user sm_hidden">
              <li className="link_logout">
                <a
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    onLogout?.();
                  }}
                >
                  로그아웃
                </a>
              </li>
              <li>
                <a href="https://www.joongang.co.kr/mynews">마이페이지</a>
              </li>
            </ul>
          )}

          <div className="header_option_area">
            <HeaderActions onOpenMegaMenu={onOpenMegaMenu} variant={variant} onOpenSearch={onOpenSearch} {...actions} />
            <PlusShortcut {...shortcut} />
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default HeaderBar;
