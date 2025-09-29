import React, { useState } from 'react';

// NOTE: 편의를 위해 MenuPopupProps와 SearchPopupProps 인터페이스를 다시 정의합니다.
interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

// -----------------------------------------------------------
// 1. MenuPopup 컴포넌트
// -----------------------------------------------------------

const MenuPopup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  // NOTE: HTML에 있는 인라인 JS 함수 호출을 임시 로직으로 대체합니다.
  const jaLogin = () => console.log('메뉴 팝업: 로그인 함수 실행 (jaLogin)');

  // className에 'hide' 클래스는 조건부 렌더링으로 대체되므로 제외했습니다.
  return (
    <div id="menu_popup" className="full_popup menu_popup">
      <div className="layer_popup side_nav">
        {/* Layer Header */}
        <div className="layer_header lg_hidden">
          <strong className="logo">
            <a href="https://www.joongang.co.kr">
              <span className="visually_hidden">The JoongAng</span>
            </a>
          </strong>
        </div>
        {/* Scrollable Content */}
        <div className="scroll">
          <div className="my_wrap noline">
            {/* Logout Area */}
            <div className="logout lg_hidden sm_hidden md_hidden">
              <p className="logout_title">
                간편 로그인하고 한결 더 편리해진 <br />
                나만의 중앙일보를 경험해보세요.
              </p>
              <button
                type="button"
                className="btn_user"
                onClick={jaLogin}
                data-evnt-ctg="account"
                data-evnt-act="click: login"
                data-evnt-lbl="layer popup : 모바일-메가메뉴"
              >
                로그인
                <i className="ico_arrow_right">
                  <span className="visually_hidden">로그인</span>
                </i>
              </button>
            </div>
            {/* MyPage Area */}
            <ul className="mypage_wrap d_mypage_megamenu">
              <li>
                <a
                  href="https://www.joongang.co.kr/mynews"
                  className="user_wrap"
                  data-evnt-ctg="area:중앙플러스|전체 콘텐트"
                  data-evnt-act="move:A30 메가메뉴"
                  data-evnt-lbl="마이페이지"
                >
                  <strong>
                    <span className="user">wonyoungchoiseoul</span>님
                  </strong>
                  의 마이페이지
                  <i className="ico_arrow_right"></i>
                </a>
              </li>
              <li className="sm_hidden md_hidden">
                <a href="https://www.joongang.co.kr/customercenter">고객센터</a>
              </li>
              <li className="sm_hidden md_hidden">
                <a href="https://www.joongang.co.kr/guides">더중앙 이용안내</a>
              </li>
            </ul>
            {/* Banner Wrap */}
            <div className="banner_wrap lg_hidden">
              <a
                data-evnt-ctg="area:중앙플러스|전체 콘텐트"
                data-evnt-act="move:A30 메가메뉴_drawer"
                data-evnt-lbl="지면보기이용안내"
                href="https://www.joongang.co.kr/replica/guides"
              >
                {/* NOTE: img 태그에 self-closing slash를 추가했습니다. */}
                <img
                  width="320"
                  height="106"
                  loading="lazy"
                  src="https://img.joongang.co.kr/pubimg/banner/drawer/bn_newspaper_renewal@2x.min.png"
                  alt="중앙일보 지면 그대로, 뉴스의 큰 그림 그대로 지면보기 이용안내"
                />
              </a>
            </div>
          </div>

          {/* Navigation Section: HTML의 모든 dl/dt/dd 구조를 그대로 변환 */}
          <nav className="nav layer_body">
            <a href="https://www.joongang.co.kr" className="home lg_hidden">
              <strong className="logo">
                <span className="visually_hidden">The JoongAng</span>
              </strong>
              <i className="ico_fold"></i>
            </a>

            {/* Opinion Section */}
            <dl className="opinion">
              <dt>
                <strong>
                  <a
                    href="https://www.joongang.co.kr/opinion"
                    data-evnt-ctg="area:중앙플러스|전체 콘텐트"
                    data-evnt-act="move:A30 메가메뉴"
                    data-evnt-lbl="오피니언"
                  >
                    오피니언<i className="ico_fold"></i>
                  </a>
                </strong>
              </dt>
              <dd className="nav_item">
                <ul>
                  <li>
                    <a
                      href="https://www.joongang.co.kr/opinion/editorialcolumn"
                      data-evnt-ctg="area:중앙플러스|전체 콘텐트"
                      data-evnt-act="move:A30 메가메뉴"
                      data-evnt-lbl="오피니언_사설칼럼"
                    >
                      사설칼럼
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.joongang.co.kr/opinion/satiricalcartoon"
                      data-evnt-ctg="area:중앙플러스|전체 콘텐트"
                      data-evnt-act="move:A30 메가메뉴"
                      data-evnt-lbl="오피니언_만평"
                    >
                      만평
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.joongang.co.kr/opinion/debatepolllist"
                      data-evnt-ctg="area:중앙플러스|전체 콘텐트"
                      data-evnt-act="move:A30 메가메뉴"
                      data-evnt-lbl="오피니언_Hot Poll"
                    >
                      Hot Poll
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.joongang.co.kr/opinion/resetkorea"
                      data-evnt-ctg="area:중앙플러스|전체 콘텐트"
                      data-evnt-act="move:A30 메가메뉴"
                      data-evnt-lbl="오피니언_리셋 코리아"
                    >
                      리셋 코리아
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.joongang.co.kr/opinion/vod"
                      data-evnt-ctg="area:중앙플러스|전체 콘텐트"
                      data-evnt-act="move:A30 메가메뉴"
                      data-evnt-lbl="오피니언_영상"
                    >
                      영상
                    </a>
                  </li>
                </ul>
              </dd>
            </dl>

            {/* News Section (이하 생략 - 전체 HTML 구조를 그대로 className과 href를 유지하며 변환하면 됩니다.) */}
            <dl className="news">
              <dt>
                <strong>뉴스</strong>
              </dt>
              <dd className="nav_item">
                <ul>
                  <li>
                    <a
                      href="https://www.joongang.co.kr/politics"
                      data-evnt-ctg="area:중앙플러스|전체 콘텐트"
                      data-evnt-act="move:A30 메가메뉴"
                      data-evnt-lbl="뉴스_정치"
                    >
                      정치
                    </a>
                  </li>
                  {/* ... 나머지 뉴스 목록 ... */}
                  <li>
                    <a
                      href="https://www.joongang.co.kr/1min"
                      data-evnt-ctg="area:중앙플러스|전체 콘텐트"
                      data-evnt-act="move:A30 메가메뉴"
                      data-evnt-lbl="뉴스_1min"
                    >
                      1min<i className="ico_new"></i>
                    </a>
                  </li>
                </ul>
              </dd>
            </dl>

            {/* Special Section (생략) */}
            <dl className="special">{/* ... */}</dl>

            {/* Package & Multimedia & Newsletters (생략) */}
            <dl className="package">{/* ... */}</dl>
            <dt>
              <strong>
                <a
                  href="https://www.joongang.co.kr/newsletter"
                  data-evnt-ctg="area:중앙플러스|전체 콘텐트"
                  data-evnt-act="move:A30 메가메뉴"
                  data-evnt-lbl="뉴스레터"
                >
                  뉴스레터
                </a>
              </strong>
            </dt>
            {/* ... 나머지 dl, dt, ul, li 구조들은 원본 HTML을 참고하여 변환합니다. */}

            <div className="plus">
              <a
                href="https://www.joongang.co.kr/plus"
                className="home"
                data-evnt-ctg="area:중앙플러스|전체 콘텐트"
                data-evnt-act="move:A30 메가메뉴"
                data-evnt-lbl="중앙플러스"
              >
                <strong className="logo_plus_white">
                  <span className="visually_hidden">더 중앙 플러스</span>
                </strong>
              </a>
              {/* ... plus 섹션 하위 dl, dt, dd 구조 ... */}
              <dl>
                <dt>
                  <strong>
                    <a
                      href="https://www.joongang.co.kr/plus/contents"
                      data-evnt-ctg="area:중앙플러스|전체 콘텐트"
                      data-evnt-act="move:A30 메가메뉴"
                      data-evnt-lbl="중앙플러스_콘텐트 탐색"
                    >
                      콘텐트 탐색<i className="ico_fold"></i>
                    </a>
                  </strong>
                </dt>
                <dd className="nav_item">{/* ... 콘텐트 탐색 리스트 ... */}</dd>
                {/* ... 시리즈별 보기, 큐레이션 발견 등 ... */}
              </dl>
              {/* ... plus 섹션 하위 ul/li 구조 ... */}
            </div>

            {/* ... 기타 Banner Wraps 및 하단 링크들 ... */}
          </nav>

          {/* Layer Footer */}
          <div className="layer_footer lg_hidden">
            <div className="layer_footer_item">
              <p>중앙일보를 만나는 또다른 방법</p>
              <ul className="btn_group">{/* ... SNS 링크들 ... */}</ul>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button type="button" className="btn_close lg_hidden" title="Close" onClick={onClose}>
          <i className="ico_close"></i>
          <span className="visually_hidden">Close</span>
        </button>
      </div>
    </div>
  );
};

// -----------------------------------------------------------
// 2. SearchPopup 컴포넌트
// -----------------------------------------------------------

const SearchPopup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    // HTML의 'hide' 클래스 대신 조건부 렌더링 사용
    return null;
  }

  // NOTE: 인라인 JS 함수들을 임시로 React 이벤트 핸들러로 대체했습니다.
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('검색 제출');
  };
  const jaAISearchOpenSetting = () => console.log('AI 검색 타입 설정하기 실행');

  return (
    <div className="full_popup bg_white search_popup" id="layer_search">
      <div className="layer_popup layer_search layer_search_plus search_ai">
        {/* Layer Header (Close Button) */}
        <div className="layer_header">
          <button
            type="button"
            className="btn_close"
            title="Close"
            onClick={onClose}
            data-evnt-ctg="area:중앙플러스|전체 콘텐트"
            data-evnt-act="click:search_검색창"
            data-evnt-lbl="검색창 닫기"
          >
            <i className="ico_close"></i>
            <span className="visually_hidden">Close</span>
          </button>
        </div>
        {/* Layer Body (Search Form and Content) */}
        <div className="layer_body" style={{ paddingBottom: 0 }}>
          {/* Search Form */}
          <form className="search_form" onSubmit={handleSearchSubmit}>
            <div className="input_group">
              <div className="search_area">
                {/* contenteditable을 false로 설정하여 경고를 피했습니다. */}
                <p className="form_control" role="textbox" contentEditable={false}></p>
                <span className="input_hint" contentEditable={false}>
                  찾고 싶은 뉴스를 검색해 보세요.
                </span>
                <button
                  type="button"
                  className="btn_delete hide"
                  data-evnt-ctg="area:중앙플러스|전체 콘텐트"
                  data-evnt-act="click:search_검색창"
                  data-evnt-lbl="검색어 입력 삭제"
                >
                  <i className="ico_clear" style={{ marginLeft: '7px' }}></i>
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
                data-evnt-ctg="area:중앙플러스|전체 콘텐트"
                data-evnt-act="click:search_검색창"
                data-evnt-lbl="검색 타입 설정"
              >
                <i className="ico_option"></i>
              </button>
            </div>
          </form>

          {/* Search Input List / Guides / Popular Searches / Most Viewed Articles */}
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
                  <ul>{/* ... 검색 가이드 내용 ... */}</ul>
                  <button type="button" className="ja-aisearch-opensetting" onClick={jaAISearchOpenSetting}>
                    다른 검색 타입 설정하기
                  </button>
                </div>
                <button type="button" className="btn_close ignore" title="Close" aria-label="닫기">
                  <i className="ico_close"></i>
                </button>
              </div>
            </div>

            {/* 검색어 저장 기능 상태 표시 */}
            <p className="search_off">검색어 저장 기능이 꺼져있습니다.</p>

            <div className="scroll">
              <ul className="tag_nav hide" id="recommend_list"></ul>
              <ul className="list hide" id="autocomplete_list"></ul>
              <ul className="list" id="saved_list"></ul>
            </div>

            <div className="func">
              <button
                type="button"
                className="saving"
                data-evnt-ctg="area:중앙플러스|전체 콘텐트"
                data-evnt-act="click:search_검색창"
                data-evnt-lbl="검색어 저장 켜기"
              >
                검색어 저장 켜기
              </button>
              <button
                type="button"
                className="removeHistory"
                data-evnt-ctg="area:중앙플러스|전체 콘텐트"
                data-evnt-act="click:search_검색창"
                data-evnt-lbl="전체 검색 기록 삭제"
              >
                기록삭제
              </button>
            </div>
          </div>

          {/* 인기 검색어 섹션 */}
          <div className="search_tag_wrap ai_tag_list"></div>
          <section className="search_tag_wrap">
            <div className="title_wrap">
              <strong className="title">인기 검색어</strong>
            </div>
            <ul className="tag_nav">{/* ... 인기 검색어 리스트 ... */}</ul>
          </section>

          {/* 많이 본 기사 섹션 */}
          <div className="chain_wrap hide" id="mostViewedAll">
            <div className="title_wrap">
              <strong className="title">많이 본 기사</strong>
            </div>
            <div className="photo_list_area">
              <ul className="card_group photo_list1 row">
                {/* ... 기사 카드 리스트 (img 태그에 self-closing slash 추가) ... */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------
// 3. Header 컴포넌트
// -----------------------------------------------------------

/**
 * 메인 헤더 컴포넌트
 */
export default function PlusSubHeader() {
  // 상태: 메뉴 팝업과 검색 팝업의 열림/닫힘 상태를 관리합니다.
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 이벤트 핸들러
  const openMenuPopup = () => setIsMenuOpen(true);
  const closeMenuPopup = () => setIsMenuOpen(false);
  const openSearchPopup = () => setIsSearchOpen(true);
  const closeSearchPopup = () => setIsSearchOpen(false);

  // NOTE: 인라인 JS 함수들을 임시로 React 이벤트 핸들러로 대체했습니다.
  const jaLogin = () => console.log('헤더: 로그인 함수 실행 (jaLogin)');
  const jaJoin = () => console.log('헤더: 회원가입 함수 실행 (jaJoin)');
  const jaLogout = () => console.log('헤더: 로그아웃 함수 실행 (jaLogout)');
  const jaMyPage = () => console.log('헤더: 마이페이지 함수 실행 (jaMyPage)');

  return (
    <>
      <header id="header" className="header nav_re black_type emblem60">
        <div className="uh">
          <strong className="logo_plus">
            <a
              href="https://www.joongang.co.kr/plus"
              data-evnt-ctg="header navigation"
              data-evnt-act="click: logo"
              data-evnt-lbl="중앙플러스"
            >
              <span className="visually_hidden">더 중앙 플러스</span>
            </a>
          </strong>

          <div className="header_right_area">
            {/* 로그아웃 상태 */}
            <ul className="logout sm_hidden hide">
              <li>
                <a href="#" onClick={jaLogin} data-evnt-ctg="account" data-evnt-act="click: login">
                  로그인
                </a>
              </li>
              <li>
                <a href="#" onClick={jaJoin} data-evnt-ctg="header navigation" data-evnt-act="click: register">
                  회원가입
                </a>
              </li>
            </ul>

            {/* 로그인 상태 */}
            <ul className="login user sm_hidden">
              <li className="link_logout">
                <a href="#" onClick={jaLogout} data-evnt-ctg="account" data-evnt-act="click: logout">
                  로그아웃
                </a>
              </li>
              <li>
                <a href="#" onClick={jaMyPage} data-evnt-ctg="header navigation" data-evnt-act="move:마이페이지">
                  마이페이지
                </a>
              </li>
            </ul>

            <div className="header_option_area">
              {/* 검색 버튼: onclick="onClickSearchButton()" 대신 openSearchPopup 사용 */}
              <button
                type="button"
                className="btn_search"
                onClick={openSearchPopup}
                data-evnt-ctg="area:중앙플러스|전체 콘텐트"
                data-evnt-act="move:search_검색창"
                data-evnt-lbl="검색창 열기"
                aria-label="검색"
              >
                <i className="ico_search art_search"></i>
                <i className="ico_search_gra art_search_gra"></i>
                <i className="ico_search_ai art_ai"></i>
              </button>

              {/* 메뉴 버튼: onclick="openLayer(this, menu_popup);" 대신 openMenuPopup 사용 */}
              <button
                type="button"
                className="btn_navbar"
                data-evnt-ctg="header navigation"
                data-evnt-act="click: megamenu"
                data-evnt-lbl="메뉴"
                onClick={openMenuPopup}
                aria-label="메뉴"
              >
                <i className="ico_ham"></i>
              </button>

              {/* 바로가기 버튼 */}
              <a
                href="https://www.joongang.co.kr"
                className="btn_shortcut"
                aria-label="더중앙 바로가기"
                data-evnt-ctg="header navigation"
                data-evnt-act="click: logo shortcuts"
                data-evnt-lbl="중앙"
              >
                <i className="ico_shortcut"></i>
                <i className="ico_emblem60" role="img" aria-label="60주년"></i>
              </a>
            </div>
          </div>
        </div>

        {/* 스크롤 인디케이터 (React state로 width를 제어할 수 있습니다.) */}
        <div className="scroll_indicator">
          <span style={{ width: '0px' }}></span>
        </div>
      </header>

      {/* 팝업 컴포넌트들은 상태에 따라 렌더링됩니다. */}
      <MenuPopup isOpen={isMenuOpen} onClose={closeMenuPopup} />
      <SearchPopup isOpen={isSearchOpen} onClose={closeSearchPopup} />
    </>
  );
}
