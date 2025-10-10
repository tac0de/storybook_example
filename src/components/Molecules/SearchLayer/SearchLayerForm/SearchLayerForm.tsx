import classNames from 'classnames';
import type { FormEvent } from 'react';

export type SearchLayerFormProps = {
  placeholderHidden: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onInput: (event: FormEvent<HTMLParagraphElement>) => void;
};

export default function SearchLayerForm({ placeholderHidden, onSubmit, onInput }: SearchLayerFormProps) {
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
          <button
            type="button"
            className="btn_delete hide"
            data-evnt-ctg="area:중앙|홈"
            data-evnt-act="click:search_검색창"
            data-evnt-lbl="검색어 입력 삭제"
          >
            <i className="ico_clear" style={{ marginLeft: 7 }}></i>
            <span className="visually_hidden">삭제</span>
          </button>
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
