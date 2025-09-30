import React, { useState } from 'react';
import cx from 'classnames';

export type SearchLayerProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (q: string) => void;
};
export default function SearchLayer({ open, onClose, onSubmit }: SearchLayerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [placeholderVisible, setPlaceholderVisible] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(searchQuery);
  };

  const handleSearchInput = (event: React.FormEvent<HTMLParagraphElement>) => {
    setSearchQuery(event.currentTarget.textContent || '');
    if (event.currentTarget.textContent !== '') {
      setPlaceholderVisible(true);
    } else {
      setPlaceholderVisible(false);
    }
  };

  return (
    <div
      style={{ zIndex: 1000 }}
      className={cx('full_popup', 'bg_white', 'search_popup', open ? 'show' : 'hide')}
      id="layer_search"
      tabIndex={0}
    >
      <div className="layer_popup layer_search layer_search_plus search_ai">
        <div className="layer_header">
          <button
            type="button"
            onClick={onClose}
            className="btn_close"
            title="Close"
            data-evnt-ctg="area:중앙|홈"
            data-evnt-act="click:search_검색창"
            data-evnt-lbl="검색창 닫기"
          >
            <i className="ico_close"></i>
            <span className="visually_hidden">Close</span>
          </button>
        </div>

        <div className="layer_body" style={{ paddingBottom: 0 }}>
          <form className="search_form" onSubmit={handleSubmit}>
            <div className="input_group">
              <div className="search_area">
                <p
                  className="form_control focused"
                  role="textbox"
                  contentEditable
                  suppressContentEditableWarning
                  onInput={handleSearchInput}
                ></p>
                <span className={cx('input_hint', placeholderVisible ? 'hide' : 'show')} contentEditable={false}>
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

          <div className="search_tag_wrap ai_tag_list">
            <strong className="title">새로운 AI 검색을 경험해보세요!</strong>

            <ul className="tag_nav sm_hidden">
              <li className="nav_item">
                <a
                  href="https://www.joongang.co.kr/aisearch?keyword=1992%EB%85%84%20LA%20%ED%9D%91%EC%9D%B8%ED%8F%AD%EB%8F%99%20%EC%82%AC%ED%83%9C%20%EB%8B%B9%EC%8B%9C%20%EC%83%81%ED%99%A9%EC%97%90%20%EB%8C%80%ED%95%B4%20%EC%95%8C%EB%A0%A4%EC%A3%BC%EC%84%B8%EC%9A%94"
                  className="nav_link"
                >
                  <span>1992년 LA 흑인폭동 사태 당시 상황에 대해 알려주세요</span>
                </a>
              </li>
              <li className="nav_item">
                <a
                  href="https://www.joongang.co.kr/aisearch?keyword=1980%EB%85%84%205%EC%9B%94%20%EB%B9%84%EC%83%81%EA%B3%84%EC%97%84%20%EA%B4%80%EB%A0%A8%20%EB%8B%B9%EC%8B%9C%20%EA%B8%B0%EC%82%AC%EB%A5%BC%20%EC%B0%BE%EC%95%84%EC%A3%BC%EC%84%B8%EC%9A%94"
                  className="nav_link"
                >
                  <span>1980년 5월 비상계엄 관련 당시 기사를 찾아주세요</span>
                </a>
              </li>
              <li className="nav_item">
                <a
                  href="https://www.joongang.co.kr/aisearch?keyword=%EC%82%AC%EC%A7%84%EA%B3%BC%20%ED%95%A8%EA%BB%98%ED%95%98%EB%8A%94%20%EA%B9%80%EB%AA%85%ED%98%B8%EC%9D%98%20%EC%A4%91%EA%B5%AD%20%EA%B7%BC%ED%98%84%EB%8C%80"
                  className="nav_link"
                >
                  <span>사진과 함께하는 김명호의 중국 근현대</span>
                </a>
              </li>
              <li className="nav_item">
                <a
                  href="https://www.joongang.co.kr/aisearch?keyword=%EC%9D%B4%EC%9E%AC%EB%AA%85%20%EC%A0%95%EB%B6%80%EA%B0%80%20AI%20%EA%B0%95%EA%B5%AD%20%EC%8B%A4%ED%98%84%EC%9D%84%20%EC%9C%84%ED%95%B4%20%EC%B6%94%EC%A7%84%ED%95%98%EA%B3%A0%EC%9E%90%20%ED%95%98%EB%8A%94%20%EC%A3%BC%EC%9A%94%20%EC%A0%95%EC%B1%85%EC%9D%80%20%EC%96%B4%EB%96%A4%20%EA%B2%83%EC%9D%B4%20%EC%9E%88%EB%82%98%EC%9A%94%3F"
                  className="nav_link"
                >
                  <span>이재명 정부가 AI 강국 실현을 위해 추진하고자 하는 주요 정책은 어떤 것이 있나요?</span>
                </a>
              </li>
              <li className="nav_item">
                <a
                  href="https://www.joongang.co.kr/aisearch?keyword=%EA%B9%8A%EC%9D%80%20%EB%B0%94%EB%8B%A4%EB%8A%94%20%EC%96%B4%EB%91%A0%20%EB%BF%90%EC%9D%BC%EA%B9%8C%3F"
                  className="nav_link"
                >
                  <span>깊은 바다는 어둠 뿐일까?</span>
                </a>
              </li>
              <li className="nav_item">
                <a
                  href="https://www.joongang.co.kr/aisearch?keyword=%ED%8F%89%ED%99%94%20%EC%98%A4%EB%94%94%EC%84%B8%EC%9D%B4%2C%20%EC%A4%91%EA%B5%AD%20AI%20%ED%98%81%EB%AA%85%20%ED%98%84%EC%9E%A5%EC%9D%84%20%EA%B0%80%EB%8B%A4"
                  className="nav_link"
                >
                  <span>평화 오디세이, 중국 AI 혁명 현장을 가다</span>
                </a>
              </li>
              <li className="nav_item">
                <a
                  href="https://www.joongang.co.kr/aisearch?keyword=%EC%98%A4%EB%8A%98%EC%9D%98%20%EA%B5%AD%EB%82%B4%20%EC%A3%BC%EC%9A%94%20%EB%89%B4%EC%8A%A4%20%EC%82%AC%EC%A7%84%EC%9D%84%20%ED%95%9C%EB%88%88%EC%97%90%20%EB%B3%BC%20%EC%88%98%20%EC%9E%88%EB%82%98%EC%9A%94%3F"
                  className="nav_link"
                >
                  <span>오늘의 국내 주요 뉴스 사진을 한눈에 볼 수 있나요?</span>
                </a>
              </li>
              <li className="nav_item">
                <a
                  href="https://www.joongang.co.kr/aisearch?keyword=%EB%B0%B1%EC%84%B1%ED%98%B8%20%EC%A2%85%EA%B5%90%EC%9D%98%20%EC%82%B6%EC%9D%84%20%EB%AC%BB%EB%8B%A4%20%EC%97%B0%EC%9E%AC"
                  className="nav_link"
                >
                  <span>백성호 종교의 삶을 묻다 연재</span>
                </a>
              </li>
              <li className="nav_item">
                <a
                  href="https://www.joongang.co.kr/aisearch?keyword=%EC%97%AC%EC%95%BC%EA%B0%80%20%ED%95%A9%EC%9D%98%ED%95%9C%20%EC%83%81%EB%B2%95%20%EA%B0%9C%EC%A0%95%EC%95%88%EC%9D%98%20%ED%95%B5%EC%8B%AC%20%EB%82%B4%EC%9A%A9%EA%B3%BC%20%EC%9F%81%EC%A0%90%EC%9D%80%3F"
                  className="nav_link"
                >
                  <span>여야가 합의한 상법 개정안의 핵심 내용과 쟁점은?</span>
                </a>
              </li>
              <li className="nav_item">
                <a
                  href="https://www.joongang.co.kr/aisearch?keyword=2025%EB%85%84%20%EC%98%AC%ED%95%B4%20%ED%95%9C%EA%B5%AD%EC%9D%98%20%EC%84%B1%EC%9E%A5%EB%A5%A0%20%EC%A0%84%EB%A7%9D%EC%9D%80%3F"
                  className="nav_link"
                >
                  <span>2025년 올해 한국의 성장률 전망은?</span>
                </a>
              </li>
              <li className="nav_item">
                <a
                  href="https://www.joongang.co.kr/aisearch?keyword=%EA%B9%80%ED%98%B8%EC%A0%95%EC%9D%98%20%EB%8D%94%ED%81%B4%EB%9E%98%EC%8B%9D%20in%20%EC%9C%A0%EB%9F%BD%20%EC%97%B0%EC%9E%AC"
                  className="nav_link"
                >
                  <span>김호정의 더클래식 in 유럽 연재</span>
                </a>
              </li>
            </ul>

            <div className="jswiper jaswiper_controller lg_hidden" style={{ overflow: 'hidden' }}>
              <div
                className="jaswiper_wrap"
                style={{
                  animationTimingFunction: 'ease-out',
                  overflow: 'visible',
                  transitionDuration: '0ms',
                  transform: 'translate3d(0px, 0px, 0px)',
                }}
              >
                <ul className="tag_nav">
                  <li className="nav_item">
                    <a
                      href="https://www.joongang.co.kr/aisearch?keyword=1992%EB%85%84%20LA%20%ED%9D%91%EC%9D%B8%ED%8F%AD%EB%8F%99%20%EC%82%AC%ED%83%9C%20%EB%8B%B9%EC%8B%9C%20%EC%83%81%ED%99%A9%EC%97%90%20%EB%8C%80%ED%95%B4%20%EC%95%8C%EB%A0%A4%EC%A3%BC%EC%84%B8%EC%9A%94"
                      className="nav_link"
                    >
                      <span>1992년 LA 흑인폭동 사태 당시 상황에 대해 알려주세요</span>
                    </a>
                  </li>
                  <li className="nav_item">
                    <a
                      href="https://www.joongang.co.kr/aisearch?keyword=1980%EB%85%84%205%EC%9B%94%20%EB%B9%84%EC%83%81%EA%B3%84%EC%97%84%20%EA%B4%80%EB%A0%A8%20%EB%8B%B9%EC%8B%9C%20%EA%B8%B0%EC%82%AC%EB%A5%BC%20%EC%B0%BE%EC%95%84%EC%A3%BC%EC%84%B8%EC%9A%94"
                      className="nav_link"
                    >
                      <span>1980년 5월 비상계엄 관련 당시 기사를 찾아주세요</span>
                    </a>
                  </li>
                  <li className="nav_item">
                    <a
                      href="https://www.joongang.co.kr/aisearch?keyword=%EC%82%AC%EC%A7%84%EA%B3%BC%20%ED%95%A8%EA%BB%98%ED%95%98%EB%8A%94%20%EA%B9%80%EB%AA%85%ED%98%B8%EC%9D%98%20%EC%A4%91%EA%B5%AD%20%EA%B7%BC%ED%98%84%EB%8C%80"
                      className="nav_link"
                    >
                      <span>사진과 함께하는 김명호의 중국 근현대</span>
                    </a>
                  </li>
                  <li className="nav_item">
                    <a
                      href="https://www.joongang.co.kr/aisearch?keyword=%EC%9D%B4%EC%9E%AC%EB%AA%85%20%EC%A0%95%EB%B6%80%EA%B0%80%20AI%20%EA%B0%95%EA%B5%AD%20%EC%8B%A4%ED%98%84%EC%9D%84%20%EC%9C%84%ED%95%B4%20%EC%B6%94%EC%A7%84%ED%95%98%EA%B3%A0%EC%9E%90%20%ED%95%98%EB%8A%94%20%EC%A3%BC%EC%9A%94%20%EC%A0%95%EC%B1%85%EC%9D%80%20%EC%96%B4%EB%96%A4%20%EA%B2%83%EC%9D%B4%20%EC%9E%88%EB%82%98%EC%9A%94%3F"
                      className="nav_link"
                    >
                      <span>이재명 정부가 AI 강국 실현을 위해 추진하고자 하는 주요 정책은 어떤 것이 있나요?</span>
                    </a>
                  </li>
                </ul>

                <ul className="tag_nav">
                  <li className="nav_item">
                    <a
                      href="https://www.joongang.co.kr/aisearch?keyword=%EA%B9%8A%EC%9D%80%20%EB%B0%94%EB%8B%A4%EB%8A%94%20%EC%96%B4%EB%91%A0%20%EB%BF%90%EC%9D%BC%EA%B9%8C%3F"
                      className="nav_link"
                    >
                      <span>깊은 바다는 어둠 뿐일까?</span>
                    </a>
                  </li>
                  <li className="nav_item">
                    <a
                      href="https://www.joongang.co.kr/aisearch?keyword=%ED%8F%89%ED%99%94%20%EC%98%A4%EB%94%94%EC%84%B8%EC%9D%B4%2C%20%EC%A4%91%EA%B5%AD%20AI%20%ED%98%81%EB%AA%85%20%ED%98%84%EC%9E%91%EC%9D%84%20%EA%B0%80%EB%8B%A4"
                      className="nav_link"
                    >
                      <span>평화 오디세이, 중국 AI 혁명 현장을 가다</span>
                    </a>
                  </li>
                  <li className="nav_item">
                    <a
                      href="https://www.joongang.co.kr/aisearch?keyword=%EC%98%A4%EB%8A%98%EC%9D%98%20%EA%B5%AD%EB%82%B4%20%EC%A3%BC%EC%9A%94%20%EB%89%B4%EC%8A%A4%20%EC%82%AC%EC%A7%84%EC%9D%84%20%ED%95%9C%EB%88%88%EC%97%90%20%EB%B3%BC%20%EC%88%98%20%EC%9E%88%EB%82%98%EC%9A%94%3F"
                      className="nav_link"
                    >
                      <span>오늘의 국내 주요 뉴스 사진을 한눈에 볼 수 있나요?</span>
                    </a>
                  </li>
                  <li className="nav_item">
                    <a
                      href="https://www.joongang.co.kr/aisearch?keyword=%EB%B0%B1%EC%84%B1%ED%98%B8%20%EC%A2%85%EA%B5%90%EC%9D%98%20%EC%82%B6%EC%9D%84%20%EB%AC%BB%EB%8B%A4%20%EC%97%B0%EC%9E%AC"
                      className="nav_link"
                    >
                      <span>백성호 종교의 삶을 묻다 연재</span>
                    </a>
                  </li>
                </ul>

                <ul className="tag_nav">
                  <li className="nav_item">
                    <a
                      href="https://www.joongang.co.kr/aisearch?keyword=%EC%97%AC%EC%95%BC%EA%B0%80%20%ED%95%A9%EC%9D%98%ED%95%9C%20%EC%83%81%EB%B2%95%20%EA%B0%9C%EC%A0%95%EC%95%88%EC%9D%98%20%ED%95%B5%EC%8B%AC%20%EB%82%B4%EC%9A%A9%EA%B3%BC%20%EC%9F%81%EC%A0%90%EC%9D%80%3F"
                      className="nav_link"
                    >
                      <span>여야가 합의한 상법 개정안의 핵심 내용과 쟁점은?</span>
                    </a>
                  </li>
                  <li className="nav_item">
                    <a
                      href="https://www.joongang.co.kr/aisearch?keyword=2025%EB%85%84%20%EC%98%AC%ED%95%B4%20%ED%95%9C%EA%B5%AD%EC%9D%98%20%EC%84%B1%EC%9E%A5%EB%A5%A0%20%EC%A0%84%EB%A7%9D%EC%9D%80%3F"
                      className="nav_link"
                    >
                      <span>2025년 올해 한국의 성장률 전망은?</span>
                    </a>
                  </li>
                  <li className="nav_item">
                    <a
                      href="https://www.joongang.co.kr/aisearch?keyword=%EA%B9%80%ED%98%B8%EC%A0%95%EC%9D%98%20%EB%8D%94%ED%81%B4%EB%9E%98%EC%8B%9D%20in%20%EC%9C%A0%EB%9F%BD%20%EC%97%B0%EC%9E%AC"
                      className="nav_link"
                    >
                      <span>김호정의 더클래식 in 유럽 연재</span>
                    </a>
                  </li>
                  <li className="nav_item">
                    <a
                      href="https://www.joongang.co.kr/aisearch?keyword=%EB%82%A8%EA%B8%B0%EA%B3%A0%20%EC%8B%B6%EC%9D%80%20%EC%9D%B4%EC%95%BC%EA%B8%B0%EB%93%A4%20-%20%EC%82%B0%EC%9D%80%20%EC%82%B0%20%EB%AC%BC%EC%9D%80%20%EB%AC%BC"
                      className="nav_link"
                    >
                      <span>남기고 싶은 이야기들 - 산은 산 물은 물</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="jswiper_pagination bullet_indicator lg_hidden">
                <span className="bullet active"></span>
                <span className="bullet"></span>
                <span className="bullet"></span>
              </div>
            </div>
          </div>

          <section className="search_tag_wrap">
            <div className="title_wrap">
              <strong className="title">트렌드 키워드</strong>
              <span>09.04 07:00 기준</span>
            </div>
            <ul className="tag_nav">
              <li className="nav_item">
                <a
                  className="nav_link"
                  href="https://www.joongang.co.kr/search?keyword=운세"
                  data-evnt-ctg="area:중앙|홈"
                  data-evnt-act="move:search_검색창"
                  data-evnt-lbl="트렌드 키워드_운세"
                >
                  🍀 운세
                </a>
              </li>
              <li className="nav_item">
                <a
                  href="https://www.joongang.co.kr/search?keyword=%EA%B5%AD%EB%AF%BC%EB%B0%B0%EC%9A%B0%20%EC%84%B1%ED%8F%AD%ED%96%89"
                  className="nav_link"
                  data-evnt-ctg="area:중앙|홈"
                  data-evnt-act="move:search_검색창"
                  data-evnt-lbl="트렌드 키워드_국민배우 성폭행"
                >
                  국민배우 성폭행
                </a>
              </li>
              <li className="nav_item">
                <a
                  href="https://www.joongang.co.kr/search?keyword=%EC%8B%A0%EB%A6%BC%EB%8F%99%20%EC%B9%BC%EB%B6%80%EB%A6%BC"
                  className="nav_link"
                  data-evnt-ctg="area:중앙|홈"
                  data-evnt-act="move:search_검색창"
                  data-evnt-lbl="트렌드 키워드_신림동 칼부림"
                >
                  신림동 칼부림
                </a>
              </li>
              <li className="nav_item">
                <a
                  href="https://www.joongang.co.kr/search?keyword=%EC%88%A0%EC%A7%91%EC%82%AC%EC%9E%A5%20%EA%B7%B8%EB%86%88"
                  className="nav_link"
                  data-evnt-ctg="area:중앙|홈"
                  data-evnt-act="move:search_검색창"
                  data-evnt-lbl="트렌드 키워드_술집사장 그놈"
                >
                  술집사장 그놈
                </a>
              </li>
              <li className="nav_item">
                <a
                  href="https://www.joongang.co.kr/search?keyword=%EC%97%84%EB%A7%88%20%EC%9E%90%EC%82%B4"
                  className="nav_link"
                  data-evnt-ctg="area:중앙|홈"
                  data-evnt-act="move:search_검색창"
                  data-evnt-lbl="트렌드 키워드_엄마 자살"
                >
                  엄마 자살
                </a>
              </li>
              <li className="nav_item">
                <a
                  href="https://www.joongang.co.kr/search?keyword=%EC%8B%A0%EB%A6%BC%EB%8F%99%20%ED%9D%89%EA%B8%B0%EB%82%9C%EB%8F%99"
                  className="nav_link"
                  data-evnt-ctg="area:중앙|홈"
                  data-evnt-act="move:search_검색창"
                  data-evnt-lbl="트렌드 키워드_신림동 흉기난동"
                >
                  신림동 흉기난동
                </a>
              </li>
              <li className="nav_item">
                <a
                  href="https://www.joongang.co.kr/search?keyword=%ED%94%BC%EC%9E%90%EC%A7%91%20%EC%B9%BC%EB%B6%80%EB%A6%BC"
                  className="nav_link"
                  data-evnt-ctg="area:중앙|홈"
                  data-evnt-act="move:search_검색창"
                  data-evnt-lbl="트렌드 키워드_피자집 칼부림"
                >
                  피자집 칼부림
                </a>
              </li>
              <li className="nav_item">
                <a
                  href="https://www.joongang.co.kr/search?keyword=%EA%B9%80%EA%B1%B4%ED%9D%AC%20%EC%98%81%EB%B6%80%EC%9D%B8"
                  className="nav_link"
                  data-evnt-ctg="area:중앙|홈"
                  data-evnt-act="move:search_검색창"
                  data-evnt-lbl="트렌드 키워드_김건희 영부인"
                >
                  김건희 영부인
                </a>
              </li>
              <li className="nav_item">
                <a
                  href="https://www.joongang.co.kr/search?keyword=AI%20%ED%95%98%EB%9D%BC%EB%A6%AC"
                  className="nav_link"
                  data-evnt-ctg="area:중앙|홈"
                  data-evnt-act="move:search_검색창"
                  data-evnt-lbl="트렌드 키워드_AI 하라리"
                >
                  AI 하라리
                </a>
              </li>
              <li className="nav_item">
                <a
                  href="https://www.joongang.co.kr/search?keyword=%EA%B9%80%EC%A0%95%EC%9D%80%20%EC%B0%A8%EB%B2%88%ED%98%B8"
                  className="nav_link"
                  data-evnt-ctg="area:중앙|홈"
                  data-evnt-act="move:search_검색창"
                  data-evnt-lbl="트렌드 키워드_김정은 차번호"
                >
                  김정은 차번호
                </a>
              </li>
            </ul>
          </section>

          <div className="box hide">
            <img src="https://img.joongang.co.kr/pubimg/visual/ai/img_joongangai_info.png" alt="" />
            <strong>Smart한 더중앙 검색 활용!!</strong>
            <p>
              AI 검색은 일반 키워드 검색과는 다르게 문장으로
              <br className="sm_hidden" />
              질문해주세요. AI가 질문의 의도를 파악해서 참고기사와 함께
              <br className="sm_hidden" />
              원하는 답변을 해드려요.
            </p>
          </div>

          <div className="chain_wrap hide" id="mostViewedAll">
            <div className="title_wrap">
              <strong className="title">많이 본 기사</strong>
            </div>

            <div className="photo_list_area">
              <ul className="card_group photo_list1 row">
                <li className="card col_lg20">
                  <figure className="card_image">
                    <a
                      href="https://www.joongang.co.kr/article/25364091"
                      data-evnt-ctg="area:중앙|홈"
                      data-evnt-act="move:A30 전체 검색 팝업"
                      data-evnt-lbl="많이 본 기사_1"
                    >
                      <img
                        width="216"
                        height="122"
                        loading="lazy"
                        src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202509/03/213d4cee-45b9-4314-b539-f47a4c35fe17.jpg.thumb.jpg/_ir_432x244_/aa.jpg"
                        alt="여자들 몸까지 닦고 튀었다…술집사장 136명 울린 그놈"
                      />
                    </a>
                  </figure>
                  <div className="card_body">
                    <strong className="headline">
                      <a
                        href="https://www.joongang.co.kr/article/25364091"
                        data-evnt-ctg="area:중앙|홈"
                        data-evnt-act="move:A30 전체 검색 팝업"
                        data-evnt-lbl="많이 본 기사_1"
                      >
                        여자들 몸까지 닦고 튀었다…술집사장 136명 울린 그놈
                      </a>
                    </strong>
                  </div>
                </li>

                <li className="card col_lg20">
                  <figure className="card_image">
                    <a
                      href="https://www.joongang.co.kr/article/25364199"
                      data-evnt-ctg="area:중앙|홈"
                      data-evnt-act="move:A30 전체 검색 팝업"
                      data-evnt-lbl="많이 본 기사_2"
                    >
                      <img
                        width="216"
                        height="122"
                        loading="lazy"
                        src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202509/04/1e14766b-7486-4ad0-9db6-c37ddc0b869b.jpg.thumb.jpg/_ir_432x244_/aa.jpg"
                        alt="“이 과일 냄새 못맡으면 위험” 초기 치매 뜻밖의 진단법"
                      />
                    </a>
                  </figure>
                  <div className="card_body">
                    <strong className="headline">
                      <a
                        href="https://www.joongang.co.kr/article/25364199"
                        data-evnt-ctg="area:중앙|홈"
                        data-evnt-act="move:A30 전체 검색 팝업"
                        data-evnt-lbl="많이 본 기사_2"
                      >
                        “이 과일 냄새 못맡으면 위험” 초기 치매 뜻밖의 진단법
                      </a>
                    </strong>
                  </div>
                </li>

                <li className="card col_lg20">
                  <figure className="card_image">
                    <a
                      href="https://www.joongang.co.kr/article/25363853"
                      data-evnt-ctg="area:중앙|홈"
                      data-evnt-act="move:A30 전체 검색 팝업"
                      data-evnt-lbl="많이 본 기사_3"
                    >
                      <img
                        width="216"
                        height="122"
                        loading="lazy"
                        src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202509/03/dd68cf6c-5553-4f62-bd84-802420639313.jpg.thumb.jpg/_ir_432x244_/aa.jpg"
                        alt='"국민배우 집에서 두 차례 성폭행 당했다"…여배우 폭로에 佛발칵'
                      />
                    </a>
                  </figure>
                  <div className="card_body">
                    <strong className="headline">
                      <a
                        href="https://www.joongang.co.kr/article/25363853"
                        data-evnt-ctg="area:중앙|홈"
                        data-evnt-act="move:A30 전체 검색 팝업"
                        data-evnt-lbl="많이 본 기사_3"
                      >
                        "국민배우 집에서 두 차례 성폭행 당했다"…여배우 폭로에 佛발칵
                      </a>
                    </strong>
                  </div>
                </li>

                <li className="card col_lg20">
                  <figure className="card_image">
                    <a
                      href="https://www.joongang.co.kr/article/25364149"
                      data-evnt-ctg="area:중앙|홈"
                      data-evnt-act="move:A30 전체 검색 팝업"
                      data-evnt-lbl="많이 본 기사_4"
                    >
                      <img
                        width="216"
                        height="122"
                        loading="lazy"
                        src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202509/04/c39cc386-1df9-422b-94f4-40d2a4e5005c.jpg.thumb.jpg/_ir_432x244_/aa.jpg"
                        alt="[오늘의 운세] 9월 4일"
                      />
                    </a>
                  </figure>
                  <div className="card_body">
                    <strong className="headline">
                      <a
                        href="https://www.joongang.co.kr/article/25364149"
                        data-evnt-ctg="area:중앙|홈"
                        data-evnt-act="move:A30 전체 검색 팝업"
                        data-evnt-lbl="많이 본 기사_4"
                      >
                        [오늘의 운세] 9월 4일
                      </a>
                    </strong>
                  </div>
                </li>

                <li className="card col_lg20">
                  <figure className="card_image">
                    <a
                      href="https://www.joongang.co.kr/article/25364206"
                      data-evnt-ctg="area:중앙|홈"
                      data-evnt-act="move:A30 전체 검색 팝업"
                      data-evnt-lbl="많이 본 기사_5"
                    >
                      <img
                        width="216"
                        height="122"
                        loading="lazy"
                        src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202509/04/3e937fb9-13b8-4103-bdd6-56445b0b7d81.jpg.thumb.jpg/_ir_432x244_/aa.jpg"
                        alt="美오대호 '천식벨트' 됐다…들끓는 수온에 3조원 재앙 [기후위기, 녹조 습격]"
                      />
                    </a>
                  </figure>
                  <div className="card_body">
                    <strong className="headline">
                      <a
                        href="https://www.joongang.co.kr/article/25364206"
                        data-evnt-ctg="area:중앙|홈"
                        data-evnt-act="move:A30 전체 검색 팝업"
                        data-evnt-lbl="많이 본 기사_5"
                      >
                        美오대호 '천식벨트' 됐다…들끓는 수온에 3조원 재앙 [기후위기, 녹조 습격]
                      </a>
                    </strong>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="chain_wrap hide" id="searchPaidArea" style={{ overflow: 'visible' }}>
            <div className="title_wrap">
              <div className="title_area">
                <strong className="title">The JoongAng Plus</strong>
              </div>
            </div>

            <div
              id="search_pcard_list"
              className="pcard_list scroll_wrap"
              style={{
                animationTimingFunction: 'ease-out',
                overflow: 'visible',
                transitionDuration: '0ms',
                transform: 'translate3d(0px, 0px, 0px)',
              }}
            >
              <article className="pcard card_cover">
                <figure className="card_image">
                  <a
                    href="https://www.joongang.co.kr/article/25249719"
                    target="_self"
                    data-evnt-ctg="area:중앙|홈"
                    data-evnt-act="move:A30 전체 검색 팝업"
                    data-evnt-lbl="중앙플러스_아티클_1"
                  >
                    <img
                      width="278"
                      height="360"
                      loading="lazy"
                      src="https://pds.joongang.co.kr/joongangplus/card/202405/3f38fce6-25a6-420f-b965-b43a8ef5de25.jpg/_ir_card_556_/"
                      alt="9살에 6개 국어 썼던 천재
비결은 ‘모국어’ 조기교육"
                    />
                  </a>
                </figure>
                <div className="card_body">
                  <strong className="title">
                    <a
                      href="https://www.joongang.co.kr/plus/series/106"
                      data-evnt-ctg="area:중앙|홈"
                      data-evnt-act="move:중앙플러스_시리즈"
                      data-evnt-lbl="유료전용_아티클_1"
                    >
                      hello! Parents
                    </a>
                  </strong>
                  <strong className="headline">
                    <a
                      href="https://www.joongang.co.kr/article/25249719"
                      target="_self"
                      data-evnt-ctg="area:중앙|홈"
                      data-evnt-act="move:A30 전체 검색 팝업"
                      data-evnt-lbl="중앙플러스_아티클_1"
                      className="lg_hidden el_sm2"
                    >
                      9살에 6개 국어 썼던 천재
                      <br />
                      비결은 ‘모국어’ 조기교육
                    </a>
                    <a
                      href="https://www.joongang.co.kr/article/25249719"
                      target="_self"
                      data-evnt-ctg="area:중앙|홈"
                      data-evnt-act="move:A30 전체 검색 팝업"
                      data-evnt-lbl="중앙플러스_아티클_1"
                      className="sm_hidden"
                    >
                      9살에 6개 국어 썼던 천재
                      <br />
                      비결은 ‘모국어’ 조기교육
                    </a>
                    &nbsp;
                  </strong>
                  <div className="meta">
                    <span>2024.05.17</span>
                    <span>가족과 함께</span>
                    <button
                      type="button"
                      data-cid="25249719"
                      data-ctype="A"
                      data-evnt-ctg="area:중앙|홈"
                      data-evnt-act="click: bookmark active"
                      data-evnt-lbl="activate"
                      aria-label="북마크 해제됨"
                      aria-pressed="true"
                      className="btn_bookmark ignore"
                    >
                      <i className="ico_bookmark"></i>
                    </button>
                  </div>
                </div>
              </article>

              <article className="pcard card_cover overflow_visible">
                <figure className="card_image">
                  <a
                    href="https://www.joongang.co.kr/newsletter/plusletter/13803"
                    target="_self"
                    data-evnt-ctg="area:중앙|홈"
                    data-evnt-act="move:A30 전체 검색 팝업"
                    data-evnt-lbl="중앙플러스_뉴스레터_2"
                  >
                    <img
                      width="278"
                      height="360"
                      loading="lazy"
                      src="https://pds.joongang.co.kr/joongangplus/card/202405/e1e3699e-602a-4a30-9535-d1023ad6c249.jpg/_ir_card_556_/"
                      alt="앞당겨진 美 대선 TV토론
‘황야의 결투’ 펼쳐집니다"
                    />
                  </a>
                </figure>
                <div className="card_body">
                  <strong className="title">
                    <a
                      href="https://www.joongang.co.kr/plus/series/132"
                      data-evnt-ctg="area:중앙|홈"
                      data-evnt-act="move:중앙플러스_시리즈"
                      data-evnt-lbl="유료전용_뉴스레터_2"
                    >
                      이상언의 오늘+
                    </a>
                  </strong>
                  <strong className="headline">
                    <a
                      href="https://www.joongang.co.kr/newsletter/plusletter/13803"
                      target="_self"
                      data-evnt-ctg="area:중앙|홈"
                      data-evnt-act="move:A30 전체 검색 팝업"
                      data-evnt-lbl="중앙플러스_뉴스레터_2"
                      className="lg_hidden el_sm2"
                    >
                      내달 美대선 TV토론
                      <br />
                      ‘황야의 결투’ 펼친다
                    </a>
                    <a
                      href="https://www.joongang.co.kr/newsletter/plusletter/13803"
                      target="_self"
                      data-evnt-ctg="area:중앙|홈"
                      data-evnt-act="move:A30 전체 검색 팝업"
                      data-evnt-lbl="중앙플러스_뉴스레터_2"
                      className="sm_hidden"
                    >
                      앞당겨진 美 대선 TV토론
                      <br />
                      ‘황야의 결투’ 펼쳐집니다
                    </a>
                    &nbsp;
                  </strong>
                  <div className="meta">
                    <span>2024.05.17</span>
                    <span>세상과 함께</span>
                  </div>
                </div>
              </article>

              <article className="pcard card_cover">
                <figure className="card_image">
                  <a
                    href="https://www.joongang.co.kr/article/25249723"
                    target="_self"
                    data-evnt-ctg="area:중앙|홈"
                    data-evnt-act="move:A30 전체 검색 팝업"
                    data-evnt-lbl="중앙플러스_아티클_3"
                  >
                    <img
                      width="278"
                      height="360"
                      loading="lazy"
                      src="https://pds.joongang.co.kr/joongangplus/card/202405/984360e6-51eb-4112-8d6b-99e601aec020.jpg/_ir_card_556_/"
                      alt="스무살 살다간 몰티즈 짱아
‘짱바타’가 펫로스 달래줘요"
                    />
                    <i className="ico_play"></i>
                  </a>
                </figure>
                <div className="card_body">
                  <strong className="title">
                    <a
                      href="https://www.joongang.co.kr/plus/series/221"
                      data-evnt-ctg="area:중앙|홈"
                      data-evnt-act="move:중앙플러스_시리즈"
                      data-evnt-lbl="유료전용_아티클_3"
                    >
                      나의 반려일지
                    </a>
                  </strong>
                  <strong className="headline">
                    <a
                      href="https://www.joongang.co.kr/article/25249723"
                      target="_self"
                      data-evnt-ctg="area:중앙|홈"
                      data-evnt-act="move:A30 전체 검색 팝업"
                      data-evnt-lbl="중앙플러스_아티클_3"
                      className="lg_hidden el_sm2"
                    >
                      20년 살다간 몰티즈 짱아
                      <br />
                      펫로스 달랜 ‘짱바타’ 정체
                    </a>
                    <a
                      href="https://www.joongang.co.kr/article/25249723"
                      target="_self"
                      data-evnt-ctg="area:중앙|홈"
                      data-evnt-act="move:A30 전체 검색 팝업"
                      data-evnt-lbl="중앙플러스_아티클_3"
                      className="sm_hidden"
                    >
                      스무살 살다간 몰티즈 짱아
                      <br />
                      ‘짱바타’가 펫로스 달래줘요
                    </a>
                    &nbsp;
                  </strong>
                  <div className="meta">
                    <span>2024.05.17</span>
                    <span>가족과 함께</span>
                    <button
                      type="button"
                      data-cid="25249723"
                      data-ctype="A"
                      data-evnt-ctg="area:중앙|홈"
                      data-evnt-act="click: bookmark active"
                      data-evnt-lbl="activate"
                      aria-label="북마크 해제됨"
                      aria-pressed="true"
                      className="btn_bookmark ignore"
                    >
                      <i className="ico_bookmark"></i>
                    </button>
                  </div>
                </div>
              </article>

              <article className="pcard card_cover">
                <figure className="card_image">
                  <a
                    href="https://www.joongang.co.kr/article/25249725"
                    target="_self"
                    data-evnt-ctg="area:중앙|홈"
                    data-evnt-act="move:A30 전체 검색 팝업"
                    data-evnt-lbl="중앙플러스_아티클_4"
                  >
                    <img
                      width="278"
                      height="360"
                      loading="lazy"
                      src="https://pds.joongang.co.kr/joongangplus/card/202405/be2e410d-324d-4205-975b-8f6024450f6f.jpg/_ir_card_556_/"
                      alt="K리그 직관하는 오너 있나?
‘데드풀’ 그 배우에 배울 것"
                    />
                  </a>
                </figure>
                <div className="card_body">
                  <strong className="title">
                    <a
                      href="https://www.joongang.co.kr/plus/series/212"
                      data-evnt-ctg="area:중앙|홈"
                      data-evnt-act="move:중앙플러스_시리즈"
                      data-evnt-lbl="유료전용_아티클_4"
                    >
                      레드재민의 ‘빨간맛 축구’
                    </a>
                  </strong>
                  <strong className="headline">
                    <a
                      href="https://www.joongang.co.kr/article/25249725"
                      target="_self"
                      data-evnt-ctg="area:중앙|홈"
                      data-evnt-act="move:A30 전체 검색 팝업"
                      data-evnt-lbl="중앙플러스_아티클_4"
                      className="lg_hidden el_sm2"
                    >
                      K리그 보는 오너 있나?
                      <br />
                      ‘데드풀’ 배우에 배울 것
                    </a>
                    <a
                      href="https://www.joongang.co.kr/article/25249725"
                      target="_self"
                      data-evnt-ctg="area:중앙|홈"
                      data-evnt-act="move:A30 전체 검색 팝업"
                      data-evnt-lbl="중앙플러스_아티클_4"
                      className="sm_hidden"
                    >
                      K리그 직관하는 오너 있나?
                      <br />
                      ‘데드풀’ 그 배우에 배울 것
                    </a>
                    &nbsp;
                  </strong>
                  <div className="meta">
                    <span>2024.05.17</span>
                    <span>쉴 땐 뭐하지</span>
                    <button
                      type="button"
                      data-cid="25249725"
                      data-ctype="A"
                      data-evnt-ctg="area:중앙|홈"
                      data-evnt-act="click: bookmark active"
                      data-evnt-lbl="activate"
                      aria-label="북마크 해제됨"
                      aria-pressed="true"
                      className="btn_bookmark ignore"
                    >
                      <i className="ico_bookmark"></i>
                    </button>
                  </div>
                </div>
              </article>
            </div>

            <a
              href="https://www.joongang.co.kr/purchase/main"
              data-evnt-ctg="area:중앙|홈"
              data-evnt-act="move:이용권 안내 페이지"
              data-evnt-lbl="이용권 자세히 보기"
              className="btn btn_outline_orange"
            >
              이용권 자세히 보기<i className="ico_arrow"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
