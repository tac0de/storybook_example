import React, { useState } from 'react';

// NOTE: TSX 파일이지만, 스타일링을 위해 className을 사용하며
// 실제 프로젝트에서는 이 컴포넌트에 대한 스타일(CSS/SCSS 등) 정의가 필요합니다.

/**
 * MenuPopup 컴포넌트의 상태를 관리하기 위한 인터페이스
 * isMenuOpen, isSearchOpen 등은 실제 상태 관리 로직에 따라 확장될 수 있습니다.
 */
interface MenuPopupProps {
  isMenuOpen: boolean;
  onClose: () => void;
}

/**
 * 전체 화면 메뉴 팝업을 렌더링하는 컴포넌트입니다.
 * 실제 프로젝트에서는 메뉴 항목의 동적 데이터와 상태 관리 로직이 추가될 것입니다.
 */
const MenuPopup: React.FC<MenuPopupProps> = ({ isMenuOpen, onClose }) => {
  if (!isMenuOpen) {
    return null;
  }

  // NOTE: HTML에 있는 인라인 JS 함수 호출을 임시로 React의 onClick과 `#` 링크로 대체했습니다.
  const jaLogin = () => console.log('로그인 함수 실행 (jaLogin)');
  const jaMyPage = () => console.log('마이페이지 함수 실행 (jaMyPage)');
  const jaLogout = () => console.log('로그아웃 함수 실행 (jaLogout)');
  const jaSearchSetting = () => console.log('다른 검색 타입 설정하기 함수 실행');

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
            {/* Logout Area (Hidden for LG, SM, MD as per HTML) */}
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
                  data-evnt-ctg="area:중앙플러스|홈"
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
                data-evnt-ctg="area:중앙플러스|홈"
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

          {/* Navigation Section (Opinion, News, Special, etc.) */}
          <nav className="nav layer_body">
            {/* ... 나머지 메뉴 구조 (Opinion, News, Special, Package, Multimedia 등)는 너무 길어 축약합니다.
                 HTML 내용을 그대로 className과 href를 유지하며 DL/DT/DD/UL/LI/A 구조로 변환하세요.
                 예시로 'Opinion' 부분만 남기고 나머지는 주석 처리합니다. */}

            <a href="https://www.joongang.co.kr" className="home lg_hidden">
              <strong className="logo">
                <span className="visually_hidden">The JoongAng</span>
              </strong>
              <i className="ico_fold"></i>
            </a>

            <dl className="opinion">
              <dt>
                <strong>
                  <a
                    href="https://www.joongang.co.kr/opinion"
                    data-evnt-ctg="area:중앙플러스|홈"
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
                      data-evnt-ctg="area:중앙플러스|홈"
                      data-evnt-act="move:A30 메가메뉴"
                      data-evnt-lbl="오피니언_사설칼럼"
                    >
                      사설칼럼
                    </a>
                  </li>
                  {/* ... 나머지 오피니언 리스트 */}
                </ul>
              </dd>
            </dl>

            {/* ... 나머지 dl, dt, dd, ul, li 구조들은 원본 HTML을 참고하여 그대로 변환하면 됩니다. ... */}

            <dl className="plus">
              <a
                href="https://www.joongang.co.kr/plus"
                className="home"
                data-evnt-ctg="area:중앙플러스|홈"
                data-evnt-act="move:A30 메가메뉴"
                data-evnt-lbl="중앙플러스"
              >
                <strong className="logo_plus_white">
                  <span className="visually_hidden">더 중앙 플러스</span>
                </strong>
              </a>
              {/* ... plus 섹션 하위 dl, dt, dd 구조 ... */}
            </dl>

            {/* ... 기타 링크들 ... */}
          </nav>
          {/* Layer Footer */}
          <div className="layer_footer lg_hidden">
            <div className="layer_footer_item">
              <p>중앙일보를 만나는 또다른 방법</p>
              <ul className="btn_group">
                <li>
                  <a
                    target="_blank"
                    href="https://twitter.com/joongangilbo?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
                  >
                    <i className="ico_sns_twt"></i>
                    <span className="visually_hidden">트위터</span>
                  </a>
                </li>
                {/* ... 나머지 SNS 링크들 ... */}
              </ul>
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

/**
 * SearchPopup 컴포넌트의 상태를 관리하기 위한 인터페이스
 */
interface SearchPopupProps {
  isSearchOpen: boolean;
  onClose: () => void;
}

/**
 * 전체 화면 검색 팝업을 렌더링하는 컴포넌트입니다.
 */
const SearchPopup: React.FC<SearchPopupProps> = ({ isSearchOpen, onClose }) => {
  if (!isSearchOpen) {
    // NOTE: HTML 원본에는 'hide' 클래스로 제어되지만, React에서는 조건부 렌더링으로 처리합니다.
    return null;
  }

  // NOTE: 인라인 JS 함수들을 임시로 React 이벤트 핸들러로 대체했습니다.
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

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
            data-evnt-ctg="area:중앙플러스|홈"
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
                {/* contenteditable을 false로 설정하고, 실제 input은 숨겨진 상태로 가정 */}
                <p className="form_control" role="textbox" contentEditable={false}></p>
                <span className="input_hint" contentEditable={false}>
                  찾고 싶은 뉴스를 검색해 보세요.
                </span>
                <button
                  type="button"
                  className="btn_delete hide"
                  data-evnt-ctg="area:중앙플러스|홈"
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
                type="button"
                className="btn_option"
                aria-label="옵션"
                data-evnt-ctg="area:중앙플러스|홈"
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
              {/* NOTE: 레이어 팝업의 상태 관리는 생략하고 HTML 구조만 유지합니다. */}
              <div className="layer_popup hide layer_search_guide" id="layer_search_guide">
                <div className="layer_body">
                  <strong className="font_aisearch">'자동 검색' 이렇게 작동해요!</strong>
                  {/* ... 가이드 내용 ... */}
                  <button type="button" className="ja-aisearch-opensetting">
                    다른 검색 타입 설정하기
                  </button>
                </div>
                <button type="button" className="btn_close ignore" title="Close" aria-label="닫기">
                  <i className="ico_close"></i>
                </button>
              </div>
            </div>

            {/* ... 나머지 검색 관련 리스트, 기능, 인기 검색어, 많이 본 기사 섹션도 HTML 구조를 따라 변환됩니다. ... */}
          </div>
        </div>
        {/* ... SearchPopup 나머지 구조 ... */}
      </div>
    </div>
  );
};

/**
 * 메인 헤더 컴포넌트
 */
export default function PlusHomeHeader() {
  // 상태: 메뉴 팝업과 검색 팝업의 열림/닫힘 상태를 관리합니다.
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 이벤트 핸들러
  const openMenuPopup = () => setIsMenuOpen(true);
  const closeMenuPopup = () => setIsMenuOpen(false);
  const openSearchPopup = () => setIsSearchOpen(true);
  const closeSearchPopup = () => setIsSearchOpen(false);

  // NOTE: HTML에 있는 인라인 JS 함수들을 임시로 React 이벤트 핸들러로 대체했습니다.
  const loginChk = () => console.log('지면보기 로그인 체크 함수 실행 (loginChk)');
  const jaLogin = () => console.log('로그인 함수 실행 (jaLogin)');
  const jaJoin = () => console.log('회원가입 함수 실행 (jaJoin)');
  const jaLogout = () => console.log('로그아웃 함수 실행 (jaLogout)');
  const jaMyPage = () => console.log('마이페이지 함수 실행 (jaMyPage)');

  return (
    <>
      <header id="header" className="header black_type nav_re emblem60">
        <div className="header_wrap">
          <h1 className="logo_plus">
            <a
              href="https://www.joongang.co.kr/plus"
              data-evnt-ctg="header navigation"
              data-evnt-act="click: logo"
              data-evnt-lbl="중앙플러스"
            >
              <span className="visually_hidden">더 중앙 플러스</span>
            </a>
          </h1>
          <div className="header_area flex_sm_column_reverse flex_md_column_reverse">
            <nav className="header_nav">
              <ul className="nav sm_hidden md_hidden">
                <li className="nav_item">
                  <strong>
                    <a
                      href="https://www.joongang.co.kr/plus/contents"
                      data-evnt-ctg="header navigation"
                      data-evnt-act="move:B10 중앙플러스홈-gnb nav"
                      data-evnt-lbl="콘텐트 탐색"
                    >
                      콘텐트 탐색
                    </a>
                  </strong>
                </li>
                <li className="nav_item">
                  <strong>
                    <a
                      href="https://www.joongang.co.kr/plus/series"
                      data-evnt-ctg="header navigation"
                      data-evnt-act="move:B10 중앙플러스홈-gnb nav"
                      data-evnt-lbl="시리즈별 보기"
                    >
                      시리즈별 보기
                    </a>
                  </strong>
                </li>
                <li className="nav_item">
                  <strong>
                    <a
                      href="https://www.joongang.co.kr/plus/curation"
                      data-evnt-ctg="header navigation"
                      data-evnt-act="move:B10 중앙플러스홈-gnb nav"
                      data-evnt-lbl="큐레이션 발견"
                    >
                      큐레이션 발견
                    </a>
                  </strong>
                </li>
                {/* ... 주석 처리된 li는 제외했습니다. */}
              </ul>

              <div className="masthead_menu">
                {/* 지면보기 링크 */}
                <a
                  className="newspaper font_lightgray sm_hidden md_hidden"
                  href="#"
                  onClick={loginChk}
                  data-evnt-ctg="area:중앙플러스|홈"
                  data-evnt-act="move: replica"
                  data-evnt-lbl="지면보기"
                >
                  <i className="ico_newspaper white"></i>지면보기
                </a>

                {/* 로그아웃 상태 (sm_hidden hide 클래스는 조건부 렌더링으로 대체할 수 있으나, 여기서는 구조만 유지) */}
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
              </div>

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
                <i className="logo"></i>
              </a>

              {/* 메뉴 버튼 */}
              <button
                type="button"
                className="btn_navbar"
                data-evnt-ctg="header navigation"
                data-evnt-act="click: megamenu"
                data-evnt-lbl="메뉴"
                onClick={openMenuPopup}
              >
                <i className="ico_navbar"></i>
                <span className="visually_hidden">메뉴</span>
              </button>

              {/* 검색 버튼 */}
              <button
                type="button"
                className="btn_search"
                onClick={openSearchPopup}
                data-evnt-ctg="area:중앙플러스|홈"
                data-evnt-act="click:search_검색창"
                data-evnt-lbl="검색창 열기"
                aria-label="검색"
              >
                <i className="ico_search art_search"></i>
                <i className="ico_search_gra art_search_gra"></i>
                <i className="ico_search_ai art_ai"></i>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* 메뉴 팝업 컴포넌트 */}
      <MenuPopup isMenuOpen={isMenuOpen} onClose={closeMenuPopup} />

      {/* 검색 팝업 컴포넌트 */}
      <SearchPopup isSearchOpen={isSearchOpen} onClose={closeSearchPopup} />
    </>
  );
}
