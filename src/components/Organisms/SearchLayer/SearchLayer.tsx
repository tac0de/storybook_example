// components/Organisms/SearchLayer/SearchLayer.tsx
import classNames from 'classnames';

export type SearchLayerProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (q: string) => void;
};

export function SearchLayer({ open, onClose, onSubmit }: SearchLayerProps) {
  return (
    <div
      id="layer_search"
      className={classNames('full_popup', 'bg_white', 'search_popup', open ? 'is-open' : 'is-closed')}
      role="dialog"
      aria-modal="true"
      aria-labelledby="searchTitle"
    >
      <div className="layer_popup layer_search layer_search_plus search_ai">
        <div className="layer_header">
          <button type="button" className="btn_close" title="Close" onClick={onClose}>
            <i className="ico_close" />
            <span className="visually_hidden">Close</span>
          </button>
        </div>

        <div className="layer_body" style={{ paddingBottom: 0 }}>
          <form
            className="search_form"
            onSubmit={e => {
              e.preventDefault();
              const node = e.currentTarget.querySelector('.form_control') as HTMLElement | null;
              const q = (node?.textContent || '').trim();
              onSubmit(q);
            }}
          >
            <div className="input_group">
              <div className="search_area">
                <p className="form_control" role="textbox" contentEditable aria-label="검색어 입력" />
                <span className="input_hint" aria-hidden>
                  찾고 싶은 뉴스를 검색해 보세요.
                </span>
                <button type="button" className="btn_delete hide">
                  <i className="ico_clear" style={{ marginLeft: 7 }} />
                  <span className="visually_hidden">삭제</span>
                </button>
              </div>
              <button type="submit" className="btn_search">
                <i className="ico_search" />
                <span className="visually_hidden">검색</span>
              </button>
              <button className="btn_option" aria-label="옵션" type="button">
                <i className="ico_option" />
              </button>
            </div>
          </form>

          {/* 아래 “가이드/인기 검색어/많이 본 기사” 구역은 HTML 그대로 옮기되,
              동적 데이터는 추후 props or fetch로 치환 */}
        </div>
      </div>
    </div>
  );
}

export default SearchLayer;
