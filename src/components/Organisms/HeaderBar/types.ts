export type NavItem = { label: string; href: string; active?: boolean };

export type HeaderBarUser = {
  loggedIn: boolean;
};

export type HeaderBarProps = {
  emblem60Url?: string;
  logoUrl: string;
  homeHref: string;
  nav: NavItem[];
  user: HeaderBarUser;
  onOpenMegaMenu: () => void;
  onOpenSearch: () => void;
  onClickJoin: () => void;
  onClickReplica: () => void;
  withStyle?: boolean;
  className?: string;
};
