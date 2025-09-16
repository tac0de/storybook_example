// components/Organisms/HeaderBar/HeaderActions.tsx
import * as React from 'react';

type Props = {
  onOpenMegaMenu: () => void;
  onOpenSearch: () => void;
};

function HeaderActions({ onOpenMegaMenu, onOpenSearch }: Props) {
  return (
    <>
      <a href="https://www.joongang.co.kr/plus" className="btn_shortcut" aria-label="더중앙플러스 바로가기">
        <i className="ico_shortcut_plus" />
        <i className="logo_plus" />
      </a>

      <button
        type="button"
        className="btn_navbar"
        onClick={onOpenMegaMenu}
        aria-label="메뉴"
        aria-haspopup="dialog"
        aria-expanded={false}
      >
        <i className="ico_navbar" />
      </button>

      <button
        type="button"
        className="btn_search"
        onClick={onOpenSearch}
        aria-label="검색"
        aria-haspopup="dialog"
        aria-expanded={false}
      >
        <i className="ico_search art_search" />
        <i className="ico_search_gra art_search_gra" />
        <i className="ico_search_ai art_ai" />
      </button>
    </>
  );
}

export default React.memo(HeaderActions);
