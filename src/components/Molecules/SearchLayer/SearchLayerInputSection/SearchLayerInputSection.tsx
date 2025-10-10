export default function SearchLayerInputSection() {
  return (
    <div className="search_input_list">
      <div className="search_guide" id="ja-search-guide">
        <p className="font_aisearch">
          자동 검색 기능<span className="sm_hidden">이</span> 작동 중 <span className="sm_hidden">입니다.</span>
        </p>
        <button type="button" id="ja-open-search-guide" aria-label="정보">
          검색 가이드<i className="ico_info"></i>
        </button>

        <div className="layer_popup hide layer_search_guide" id="layer_search_guide">
          <div className="layer_body">
            <strong className="font_aisearch">'자동 검색' 이렇게 작동해요!</strong>
            <ul>
              <li>
                <strong>
                  <span>🔍</span>키워드 검색으로 연결
                </strong>
                <ul>
                  <li>단어가 2개 이하일 때 (예: 오늘 뉴스)</li>
                </ul>
              </li>
              <li>
                <strong>
                  <span>🔍</span>AI 검색으로 연결
                </strong>
                <ul>
                  <li>단어가 3개 이상일 때 (예: 오늘 뉴스 요약)</li>
                  <li>물음표(?)가 포함되어 있을 때 (예: 날씨?)</li>
                  <li>동사, 형용사, 조사 등 문장 구성 요소가 포함되어 있을 때 (예: 오늘의 운세 알려줘)</li>
                </ul>
              </li>
            </ul>
            <button type="button" className="ja-aisearch-opensetting">
              다른 검색 타입 설정하기
            </button>
          </div>
          <button type="button" className="btn_close ignore" title="Close" aria-label="닫기">
            <i className="ico_close"></i>
          </button>
        </div>
      </div>

      <p className="search_off">저장된 검색어가 없습니다.</p>

      <div className="scroll">
        <ul className="tag_nav hide" id="recommend_list"></ul>
        <ul className="list hide" id="autocomplete_list"></ul>
        <ul className="list hide" id="saved_list"></ul>
      </div>

      <div className="func">
        <button
          type="button"
          className="saving"
          data-evnt-ctg="area:중앙|홈"
          data-evnt-act="click:search_검색창"
          data-evnt-lbl="검색어 저장 끄기"
        >
          검색어 저장 끄기
        </button>
        <button
          type="button"
          className="removeHistory"
          data-evnt-ctg="area:중앙|홈"
          data-evnt-act="click:search_검색창"
          data-evnt-lbl="전체 검색 기록 삭제"
        >
          기록삭제
        </button>
      </div>
    </div>
  );
}
