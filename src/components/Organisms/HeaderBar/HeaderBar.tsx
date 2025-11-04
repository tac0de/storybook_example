import classNames from 'classnames';
import type { ReactNode } from 'react';
import { TextLink } from '../../Atoms/TextLink/TextLink';
import { LogoGroup, type LogoGroupProps } from '../../Molecules/LogoGroup/LogoGroup';
import { MastheadMenu, type MastheadMenuProps } from '../../Molecules/MastheadMenu/MastheadMenu';
import { NavList, type NavItem } from '../../Molecules/NavList/NavList';
import { HeaderActions, type HeaderActionsProps } from '../../Molecules/HeaderActions/HeaderActions';
import { PlusShortcut, type PlusShortcutProps } from '../../Molecules/PlusShortcut/PlusShortcut';
import { HEADER_BAR_VARIANT_CONFIG } from './headerBarConfig';
import { composeChildren, maybeWrap } from '../../../utils/reactNode';

export type HeaderBarVariant = 'default' | 'plus' | 'sub' | 'plus-sub';

export type HeaderBarUser = {
  loggedIn: boolean;
};

export type HeaderBarMastheadMenuProps = Omit<MastheadMenuProps, 'loggedIn'>;

export type HeaderBarProps = {
  variant?: HeaderBarVariant;
  className?: string;
  logo: Omit<LogoGroupProps, 'className' | 'renderAsH1'>;
  nav?: NavItem[];
  user: HeaderBarUser;
  onOpenMegaMenu: () => void;
  onOpenSearch: () => void;
  onClickJoin: () => void;
  onClickReplica: () => void;
  onLogout?: () => void;
  mastheadMenu?: HeaderBarMastheadMenuProps;
  shortcut?: Omit<PlusShortcutProps, 'className'>;
  actions?: Omit<HeaderActionsProps, 'onOpenMegaMenu' | 'onOpenSearch'>;
  rightAddons?: ReactNode;
};

export default function HeaderBar({
  variant = 'default',
  className,
  logo,
  nav,
  user,
  onOpenMegaMenu,
  onOpenSearch,
  onClickJoin,
  onClickReplica,
  onLogout,
  mastheadMenu,
  shortcut,
  actions,
  rightAddons,
}: HeaderBarProps) {
  const config = HEADER_BAR_VARIANT_CONFIG[variant];
  const rootClass = classNames(config.rootClass, className);

  const logoProps: LogoGroupProps = {
    ...logo,
    variant: logo.variant ?? variant,
    renderAsH1: variant !== 'sub',
  };
  const logoNode = <LogoGroup {...logoProps} />;

  const mastheadNode = mastheadMenu ? (
    <MastheadMenu
      loggedIn={user.loggedIn}
      onClickJoin={mastheadMenu.onClickJoin ?? onClickJoin}
      onClickReplica={mastheadMenu.onClickReplica ?? onClickReplica}
      onClickLogout={mastheadMenu.onClickLogout ?? onLogout}
      {...mastheadMenu}
    />
  ) : null;

  const actionsNode = (
    <HeaderActions variant={variant} onOpenMegaMenu={onOpenMegaMenu} onOpenSearch={onOpenSearch} {...(actions ?? {})} />
  );
  const shortcutNode = shortcut ? <PlusShortcut {...shortcut} /> : null;

  const navItemsNode = nav?.length ? <NavList items={nav} /> : null;
  const navContent = composeChildren(navItemsNode, shortcutNode, actionsNode);
  const navWrapped =
    config.navClass !== null
      ? maybeWrap(navContent, content => <nav className={config.navClass}>{content}</nav>)
      : null;
  const navSection = config.navClass !== null ? (navWrapped ?? <nav className={config.navClass} />) : navItemsNode;

  const optionContent = config.navClass === null ? composeChildren(actionsNode, shortcutNode) : null;
  const optionSection = maybeWrap(optionContent, content =>
    config.wrapOptionArea || config.optionClass ? (
      <div className={config.optionClass ?? undefined}>{content}</div>
    ) : (
      content
    )
  );

  return (
    <div className={rootClass}>
      {logoNode}
      <div className={config.rightClass}>
        {mastheadNode}
        {config.showAuth ? <AuthArea loggedIn={user.loggedIn} onClickJoin={onClickJoin} onLogout={onLogout} /> : null}
        {navSection}
        {optionSection}
        {rightAddons}
      </div>
    </div>
  );
}

type AuthAreaProps = {
  loggedIn: boolean;
  onClickJoin: () => void;
  onLogout?: () => void;
};

function AuthArea({ loggedIn, onClickJoin, onLogout }: AuthAreaProps) {
  if (!loggedIn) {
    return (
      <>
        <ul className="logout sm_hidden">
          <li>
            <TextLink preventDefault onClick={onClickJoin}>
              로그인
            </TextLink>
          </li>
          <li>
            <TextLink preventDefault onClick={onClickJoin}>
              회원가입
            </TextLink>
          </li>
        </ul>
        <div className="layer_popup layer_login_popup pop_over hide" />
      </>
    );
  }

  return (
    <ul className="login user sm_hidden">
      <li className="link_logout">
        <TextLink preventDefault onClick={() => onLogout?.()}>
          로그아웃
        </TextLink>
      </li>
      <li>
        <TextLink href="https://www.joongang.co.kr/mynews" preventDefault={false}>
          마이페이지
        </TextLink>
      </li>
    </ul>
  );
}
