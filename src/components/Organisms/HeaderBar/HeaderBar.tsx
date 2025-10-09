import {
  HeaderBar as HeaderBarCompound,
  type HeaderBarMastheadMenuProps,
  type HeaderBarVariant,
  type HeaderBarUser as CompoundHeaderBarUser,
} from './HeaderBar.compound';
import type { LogoGroupProps } from '../../Molecules/LogoGroup/LogoGroup';
import type { NavItem } from '../../Molecules/NavList/NavList';
import type { PlusShortcutProps } from '../../Molecules/PlusShortcut/PlusShortcut';
import type { HeaderActionsProps } from '../../Molecules/HeaderActions/HeaderActions';

export type HeaderBarUser = CompoundHeaderBarUser;

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
  onClickReplica,
  onLogout,
  mastheadMenu,
  shortcut,
  actions,
}: HeaderBarProps) {
  const commonRootProps = {
    variant,
    user,
    className,
    onOpenMegaMenu,
    onOpenSearch,
    onClickJoin,
    onClickReplica,
    onLogout,
  };

  if (variant === 'sub' || variant === 'plus-sub') {
    return (
      <HeaderBarCompound.Root {...commonRootProps}>
        <HeaderBarCompound.Logo {...logo} />
        <HeaderBarCompound.Right>
          {mastheadMenu ? <HeaderBarCompound.MastheadMenu {...mastheadMenu} /> : null}
          <HeaderBarCompound.Auth />
          <HeaderBarCompound.OptionArea>
            <HeaderBarCompound.Actions {...(actions ?? {})} />
            {shortcut ? <HeaderBarCompound.Shortcut {...shortcut} /> : null}
          </HeaderBarCompound.OptionArea>
        </HeaderBarCompound.Right>
      </HeaderBarCompound.Root>
    );
  }

  return (
    <HeaderBarCompound.Root {...commonRootProps}>
      <HeaderBarCompound.Logo {...logo} />
      <HeaderBarCompound.Right>
        {mastheadMenu ? <HeaderBarCompound.MastheadMenu {...mastheadMenu} /> : null}
        <HeaderBarCompound.Nav items={nav}>
          {shortcut ? <HeaderBarCompound.Shortcut {...shortcut} /> : null}
          <HeaderBarCompound.Actions {...(actions ?? {})} />
        </HeaderBarCompound.Nav>
      </HeaderBarCompound.Right>
    </HeaderBarCompound.Root>
  );
}

export default HeaderBar;
