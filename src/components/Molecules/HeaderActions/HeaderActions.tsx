export type HeaderActionsProps = {
  /** 햄버거(메가메뉴) 열기 */
  onOpenMegaMenu: () => void;
  /** 검색 열기 */
  onOpenSearch: () => void;
  /** 접근성 라벨 */
  menuAriaLabel?: string;
  searchAriaLabel?: string;
  /** aria-expanded 제어 (필요 시 외부 상태로 관리) */
  menuExpanded?: boolean;
  searchExpanded?: boolean;
  variant?: 'default' | 'plus' | 'sub' | 'plus-sub';
};

/**
 * HeaderActions
 * - 전역 CSS: `.btn_navbar`, `.ico_navbar`, `.btn_search`,
 *            `.ico_search.art_search`, `.ico_search_gra.art_search_gra`, `.ico_search_ai.art_ai`
 * - 레이아웃을 해치지 않도록 래퍼 없이 Fragment로 버튼 2개만 렌더링
 */
export function HeaderActions({
  onOpenMegaMenu,
  onOpenSearch,
  menuAriaLabel = '메뉴',
  searchAriaLabel = '검색',
  menuExpanded = false,
  searchExpanded = false,
  variant = 'default',
}: HeaderActionsProps) {
  return (
    <>
      <button
        type="button"
        className="btn_navbar"
        onClick={onOpenMegaMenu}
        aria-label={menuAriaLabel}
        aria-haspopup="dialog"
        aria-expanded={menuExpanded}
      >
        <i className={variant === 'default' ? 'ico_navbar' : 'ico_ham'} aria-hidden="true" />
      </button>

      <button
        type="button"
        className="btn_search"
        onClick={onOpenSearch}
        aria-label={searchAriaLabel}
        aria-haspopup="dialog"
        aria-expanded={searchExpanded}
      >
        <i className="ico_search art_search" aria-hidden="true" />
        <i className="ico_search_gra art_search_gra" aria-hidden="true" />
        <i className="ico_search_ai art_ai" aria-hidden="true" />
      </button>
    </>
  );
}

export default HeaderActions;
