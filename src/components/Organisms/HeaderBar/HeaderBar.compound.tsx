import * as React from 'react';
import classNames from 'classnames';
import { LogoGroup, type LogoGroupProps } from '../../Molecules/LogoGroup/LogoGroup';
import { NavList, type NavItem } from '../../Molecules/NavList/NavList';
import { PlusShortcut, type PlusShortcutProps } from '../../Molecules/PlusShortcut/PlusShortcut';
import { MastheadMenu, type MastheadMenuProps } from '../../Molecules/MastheadMenu/MastheadMenu';
import { TextLink } from '../../Atoms/TextLink/TextLink';
import {
  HeaderActions as HeaderActionsMol,
  type HeaderActionsProps,
} from '../../Molecules/HeaderActions/HeaderActions';

export type HeaderBarVariant = 'default' | 'plus' | 'sub' | 'plus-sub';

export type HeaderBarUser = { loggedIn: boolean };

export type HeaderBarHandlers = {
  onOpenMegaMenu: () => void;
  onOpenSearch: () => void;
  onClickJoin: () => void;
  onClickReplica?: () => void;
  onLogout?: () => void;
};

type HeaderBarContextValue = {
  variant: HeaderBarVariant;
  user: HeaderBarUser;
} & HeaderBarHandlers;

const HeaderBarContext = React.createContext<HeaderBarContextValue | null>(null);

function useHeaderBarContext(): HeaderBarContextValue {
  const ctx = React.useContext(HeaderBarContext);
  if (!ctx) throw new Error('HeaderBar.*는 Root 내부에서만 사용하세요.');
  return ctx;
}

const ROOT_CLASS: Record<HeaderBarVariant, string> = {
  default: 'header_wrap',
  plus: 'header_wrap',
  sub: 'uh',
  'plus-sub': 'uh',
};

const RIGHT_CLASS: Record<HeaderBarVariant, string> = {
  default: 'header_area flex_sm_column_reverse flex_md_column_reverse',
  plus: 'header_area flex_sm_column_reverse flex_md_column_reverse',
  sub: 'header_right_area',
  'plus-sub': 'header_right_area',
};

const NAV_CLASS: Record<HeaderBarVariant, string | null> = {
  default: 'header_nav',
  plus: 'header_nav',
  sub: null,
  'plus-sub': null,
};

const OPTION_CLASS: Record<HeaderBarVariant, string | null> = {
  default: null,
  plus: null,
  sub: 'header_option_area',
  'plus-sub': 'header_option_area',
};

type RootProps = React.PropsWithChildren<{
  variant?: HeaderBarVariant;
  user: HeaderBarUser;
  className?: string;
}> &
  HeaderBarHandlers;

function Root({
  variant = 'default',
  user,
  className,
  onOpenMegaMenu,
  onOpenSearch,
  onClickJoin,
  onClickReplica = () => undefined,
  onLogout,
  children,
}: RootProps) {
  const value = React.useMemo<HeaderBarContextValue>(
    () => ({
      variant,
      user,
      onOpenMegaMenu,
      onOpenSearch,
      onClickJoin,
      onClickReplica,
      onLogout,
    }),
    [variant, user, onOpenMegaMenu, onOpenSearch, onClickJoin, onClickReplica, onLogout]
  );

  return (
    <div className={classNames(ROOT_CLASS[variant], className)}>
      <HeaderBarContext.Provider value={value}>{children}</HeaderBarContext.Provider>
    </div>
  );
}

type LogoProps = Omit<LogoGroupProps, 'renderAsH1'>;

function Logo(props: LogoProps) {
  const { variant } = useHeaderBarContext();
  return <LogoGroup {...props} renderAsH1={variant !== 'sub'} />;
}

type RightProps = React.PropsWithChildren<{ className?: string }>;

function Right({ className, children }: RightProps) {
  const { variant } = useHeaderBarContext();
  return <div className={classNames(RIGHT_CLASS[variant], className)}>{children}</div>;
}

type NavProps = {
  items?: NavItem[];
  className?: string;
  asFragmentOnMissingClass?: boolean;
} & React.PropsWithChildren &
  Omit<React.ComponentProps<'nav'>, 'children'>;

function Nav({ items, className, asFragmentOnMissingClass = true, children, ...rest }: NavProps) {
  const { variant } = useHeaderBarContext();
  const navClass = NAV_CLASS[variant];
  const hasContent = Boolean(items?.length) || Boolean(children);

  if (!navClass && asFragmentOnMissingClass) {
    if (!hasContent) return null;
    return (
      <>
        {items ? <NavList items={items} /> : null}
        {children}
      </>
    );
  }

  if (!navClass && !className) {
    if (!hasContent) return null;
    return (
      <nav {...rest}>
        {items ? <NavList items={items} /> : null}
        {children}
      </nav>
    );
  }

  return (
    <nav className={classNames(navClass, className)} {...rest}>
      {items ? <NavList items={items} /> : null}
      {children}
    </nav>
  );
}

type ActionsProps = Omit<HeaderActionsProps, 'onOpenMegaMenu' | 'onOpenSearch' | 'variant'>;

function Actions(props: ActionsProps) {
  const { variant, onOpenMegaMenu, onOpenSearch } = useHeaderBarContext();
  return <HeaderActionsMol variant={variant} onOpenMegaMenu={onOpenMegaMenu} onOpenSearch={onOpenSearch} {...props} />;
}

type ShortcutProps = Omit<PlusShortcutProps, 'className'> & {
  className?: string;
};

function Shortcut(props: ShortcutProps) {
  return <PlusShortcut {...props} />;
}

type OptionAreaProps = React.PropsWithChildren<{
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}>;

function OptionArea({ className, as = 'div', children }: OptionAreaProps) {
  const { variant } = useHeaderBarContext();
  const optionClass = OPTION_CLASS[variant];

  if (!optionClass && !className) {
    return <>{children}</>;
  }

  const Tag = as;
  return <Tag className={classNames(optionClass, className)}>{children}</Tag>;
}

type AuthProps = {
  renderGuest?: (args: { join: () => void }) => React.ReactNode;
  renderUser?: (args: { logout?: () => void }) => React.ReactNode;
};

function Auth({ renderGuest, renderUser }: AuthProps) {
  const { user, onClickJoin, onLogout } = useHeaderBarContext();

  if (!user.loggedIn) {
    return (
      <>
        {renderGuest ? (
          renderGuest({ join: onClickJoin })
        ) : (
          <>
            <ul className="logout sm_hidden">
              <li>
                <TextLink preventDefault onClick={() => onClickJoin()}>
                  로그인
                </TextLink>
              </li>
              <li>
                <TextLink preventDefault onClick={() => onClickJoin()}>
                  회원가입
                </TextLink>
              </li>
            </ul>
            <div className="layer_popup layer_login_popup pop_over hide" />
          </>
        )}
      </>
    );
  }

  return (
    <>
      {renderUser ? (
        renderUser({ logout: onLogout })
      ) : (
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
      )}
    </>
  );
}

export type HeaderBarMastheadMenuProps = Omit<MastheadMenuProps, 'loggedIn'>;

function MastheadMenuSlot({ onClickJoin, onClickReplica, onClickLogout, ...rest }: HeaderBarMastheadMenuProps) {
  const { user, onClickJoin: joinCtx, onClickReplica: replicaCtx, onLogout } = useHeaderBarContext();

  return (
    <MastheadMenu
      loggedIn={user.loggedIn}
      onClickJoin={onClickJoin ?? joinCtx}
      onClickReplica={onClickReplica ?? replicaCtx}
      onClickLogout={onClickLogout ?? onLogout}
      {...rest}
    />
  );
}

export const HeaderBar = {
  Root,
  Logo,
  Right,
  Nav,
  Actions,
  Shortcut,
  OptionArea,
  Auth,
  MastheadMenu: MastheadMenuSlot,
};
