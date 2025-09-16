// components/Organisms/HeaderBar/HeaderBar.tsx
import classNames from 'classnames';
import type { HeaderBarProps } from './types';
import BrandLogo from './BrandLogo';
import GnbNav from './GnbNav';
import MastheadMenu from './MastheadMenu';
import HeaderActions from './HeaderActions';

import './HeaderBar.scss';

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
  withStyle = true,
  className,
}: HeaderBarProps) {
  const cls = withStyle ? classNames('header_wrap', className) : className || undefined;

  return (
    <div className={cls}>
      <BrandLogo emblem60Url={emblem60Url} logoUrl={logoUrl} homeHref={homeHref} />

      <div className="header_area flex_sm_column_reverse flex_md_column_reverse">
        <nav className="header_nav" aria-label="주요 메뉴">
          <GnbNav items={nav} />
          <MastheadMenu user={user} onClickReplica={onClickReplica} onClickJoin={onClickJoin} />
          <HeaderActions onOpenMegaMenu={onOpenMegaMenu} onOpenSearch={onOpenSearch} />
        </nav>
      </div>
    </div>
  );
}

export default HeaderBar;
