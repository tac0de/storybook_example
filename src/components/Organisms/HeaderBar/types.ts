// components/Organisms/HeaderBar/types.ts
export type NavItem = { label: string; href: string; active?: boolean };
export type UserState = { loggedIn: boolean; name?: string; avatarUrl?: string };

export type HeaderBarProps = {
  emblem60Url?: string; // 60주년 로고 링크
  logoUrl: string; // 메인 로고 이미지 src
  homeHref: string; // 홈 링크
  nav: NavItem[]; // GNB
  user: UserState;
  onOpenMegaMenu: () => void;
  onOpenSearch: () => void;
  onClickLogin: () => void;
  onClickJoin: () => void;
  onClickReplica: () => void; // 지면보기
};
