import classNames from 'classnames';
import type { FormEvent } from 'react';

export type SearchLayerFormProps = {
  placeholderHidden: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onInput: (event: FormEvent<HTMLParagraphElement>) => void;
  onClear: () => void;
  showClearButton: boolean;
};

export default function SearchLayerForm({
  placeholderHidden,
  onSubmit,
  onInput,
  onClear,
  showClearButton,
}: SearchLayerFormProps) {
  const clearButtonClassName = classNames('btn_delete', showClearButton ? 'show' : 'hide');

  return (
    <form className="search_form" onSubmit={onSubmit}>
      <div className="input_group">
        <div className="search_area">
          <p
            className="form_control focused"
            role="textbox"
            contentEditable
            suppressContentEditableWarning
            onInput={onInput}
          ></p>
          <span className={classNames('input_hint', placeholderHidden ? 'hide' : 'show')} contentEditable={false}>
            찾고 싶은 뉴스를 검색해 보세요.
          </span>
          {/* prettier-ignore */}
          <button type="button" className={clearButtonClassName} data-evnt-ctg="area:중앙|홈" data-evnt-act="click:search_검색창" data-evnt-lbl="검색어 입력 삭제" onClick={onClear}><i className="ico_clear" style={{ marginLeft: 7 }} /><span className="visually_hidden">삭제</span></button>
        </div>

        <button type="submit" className="btn_search">
          <i className="ico_search"></i>
          <span className="visually_hidden">검색</span>
        </button>
        <button
          className="btn_option"
          aria-label="옵션"
          data-evnt-ctg="area:중앙|홈"
          data-evnt-act="click:search_검색창"
          data-evnt-lbl="검색 타입 설정"
          type="button"
        >
          <i className="ico_option"></i>
        </button>
      </div>
    </form>
  );
}
