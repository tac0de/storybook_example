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
  onClickJoin: () => void;
  onClickReplica: () => void; // 지면보기
  withStyle?: boolean; // 스타일시트 적용 여부 (기본값: true)
  className?: string; // 추가 CSS 클래스
};
