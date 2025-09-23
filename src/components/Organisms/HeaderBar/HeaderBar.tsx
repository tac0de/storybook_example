import classNames from 'classnames';
import './HeaderBar.scss';

// Molecules
import { LogoGroup } from '../../Molecules/LogoGroup/LogoGroup';
import { NavList, type NavItem } from '../../Molecules/NavList/NavList';
import { MastheadMenu } from '../../Molecules/MastheadMenu/MastheadMenu';
import { type LanguageItem } from '../../Molecules/LanguageLinks/LanguageLinks';
import { PlusShortcut } from '../../Molecules/PlusShortcut/PlusShortcut';
import { HeaderActions } from '../../Molecules/HeaderActions/HeaderActions';

export type HeaderBarUser = { loggedIn: boolean };

export type HeaderBarProps = {
  emblem60Url?: string;
  logoUrl: string;
  homeHref: string;

  nav: NavItem[];
  user: HeaderBarUser;

  // actions
  onOpenMegaMenu: () => void;
  onOpenSearch: () => void;
  onClickJoin: () => void;
  onClickReplica: () => void;

  // optional
  languageItems?: LanguageItem[];
  languageResponsiveHelpers?: boolean;
  withStyle?: boolean;
  className?: string;
};

export function HeaderBar({
  emblem60Url,
  logoUrl,
  homeHref,
  nav,
  user,
  onOpenMegaMenu,
  onOpenSearch,
  onClickJoin,
  onClickReplica,
  languageItems,
  languageResponsiveHelpers,
  withStyle = true,
  className,
}: HeaderBarProps) {
  const cls = withStyle ? classNames('header_wrap', className) : className || undefined;

  return (
    <div className={cls}>
      <LogoGroup emblem60Url={emblem60Url} homeHref={homeHref} logoUrl={logoUrl} />

      <div className="header_area flex_sm_column_reverse flex_md_column_reverse">
        <nav className="header_nav" aria-label="주요 메뉴">
          {/* 데스크톱 GNB */}
          <NavList items={nav} />

          {/* masthead: 지면보기 / 로그인/회원 / (모바일)지면보기 */}
          <MastheadMenu
            loggedIn={user.loggedIn}
            onClickJoin={onClickJoin}
            onClickReplica={onClickReplica}
            languageItems={languageItems}
            languageResponsiveHelpers={languageResponsiveHelpers}
          />

          {/* 더중앙플러스 바로가기 */}
          <PlusShortcut />

          {/* 햄버거 + 검색 */}
          <HeaderActions onOpenMegaMenu={onOpenMegaMenu} onOpenSearch={onOpenSearch} />
        </nav>
      </div>
    </div>
  );
}

export default HeaderBar;
