import classNames from 'classnames';

type Props = {
  /** 60주년 엠블럼 로고 노출 여부 */
  show60thEmblem?: boolean;
  /** 로그인 여부: true면 "로그아웃/마이페이지" 노출, false면 "로그인/회원가입" 노출 */
  isLoggedIn?: boolean;
  /** 로그인 팝오버(설명 레이어) 열림 여부 */
  loginPopoverOpen?: boolean;

  /** 핸들러들 (필요한 것만 전달해도 됩니다) */
  onLogin?: () => void;
  onLogout?: () => void;
  onJoin?: () => void;
  onSearchClick?: () => void;
  onMenuClick?: () => void;
  onCloseLoginPopover?: () => void;
  sticky?: boolean;
};

export default function SubHeader({
  show60thEmblem = true,
  isLoggedIn = false,
  loginPopoverOpen = false,
  onLogin,
  onLogout,
  onJoin,
  onSearchClick,
  onMenuClick,
  onCloseLoginPopover,
  sticky = false,
}: Props) {
  return (
    <header
      id="header"
      className={classNames('header', 'nav_re', 'emblem60')}
      style={sticky ? { position: 'fixed' } : { position: 'relative' }}
    >
      <div className="uh">
        {/* 60주년 엠블럼 로고 */}
        {show60thEmblem && (
          <a
            href="https://www.joongang.co.kr/60th"
            className="logo"
            data-evnt-ctg="header navigation"
            data-evnt-act="click: 60th logo"
            data-evnt-lbl="중앙일보"
            aria-label="중앙일보 60주년 선포페이지"
          >
            <span className="emblem">
              <i className="ico_emblem60" role="img" aria-label="60주년" />
            </span>
          </a>
        )}

        {/* 메인 로고 */}
        <a
          href="https://www.joongang.co.kr"
          className="logo"
          data-evnt-ctg="header navigation"
          data-evnt-act="click: logo"
          data-evnt-lbl="중앙일보"
          aria-label="중앙일보"
        >
          <img
            width={178}
            height={26}
            src="https://img.joongang.co.kr/pubimg/logo/logo_thejoongang.png"
            alt="중앙일보"
          />
        </a>

        <div className="header_right_area">
          {/* 비로그인 상태 메뉴 */}
          {!isLoggedIn && (
            <ul className="logout sm_hidden hide">
              <li>
                <button
                  type="button"
                  className="link_like"
                  onClick={onLogin}
                  data-evnt-ctg="account"
                  data-evnt-act="click: login"
                >
                  로그인
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="link_like"
                  onClick={onJoin}
                  data-evnt-ctg="header navigation"
                  data-evnt-act="click: register"
                >
                  회원가입
                </button>
              </li>
            </ul>
          )}

          {/* 로그인 안내 팝오버 */}
          <div
            className={`layer_popup layer_login_popup pop_over${loginPopoverOpen ? '' : ' hide'}`}
            id="layer_login_popup"
          >
            <div className="layer_item">
              <div className="layer_header">
                <strong className="login_popup_title">회원에게만 제공되는 편의 기능</strong>
              </div>
              <div className="layer_body">
                <ul className="login_popup_list">
                  <li>취향저격한 구독 상품을 한눈에 모아보고 알림받는 내구독</li>
                  <li>북마크한 콘텐트와 내활동을 아카이빙하는 보관함</li>
                  <li>기억하고 싶은 문구를 스크랩하고 기록하는 하이라이트/메모</li>
                  <li>중앙일보 회원에게만 제공되는 스페셜 콘텐트</li>
                </ul>
              </div>
              <div className="layer_footer">
                <div className="btn_group">
                  <button type="button" className="btn btn_s btn btn_outline_orange" onClick={onJoin}>
                    간편가입
                  </button>
                  <button
                    type="button"
                    className="btn btn_s btn_outline_black"
                    onClick={onLogin}
                    data-evnt-ctg="account"
                    data-evnt-act="click: login"
                    data-evnt-lbl="layer popup : 팝오버"
                  >
                    로그인
                  </button>
                </div>
              </div>
              <button type="button" className="btn_close" title="Close" onClick={onCloseLoginPopover}>
                <i className="ico_close" />
                <span className="visually_hidden">닫기</span>
              </button>
            </div>
          </div>

          {/* 로그인 상태 메뉴 */}
          {isLoggedIn && (
            <ul className="login user sm_hidden">
              <li className="link_logout">
                <button
                  type="button"
                  className="link_like"
                  onClick={onLogout}
                  data-evnt-ctg="account"
                  data-evnt-act="click: logout"
                >
                  로그아웃
                </button>
              </li>
              <li>
                <a
                  href="https://www.joongang.co.kr/mynews"
                  data-evnt-ctg="header navigation"
                  data-evnt-act="move:마이페이지"
                >
                  마이페이지
                </a>
              </li>
            </ul>
          )}

          {/* 우측 옵션 버튼들 */}
          <div className="header_option_area">
            <button
              type="button"
              className="btn_search"
              onClick={onSearchClick}
              data-evnt-ctg="area:중앙|라이프"
              data-evnt-act="click:search_검색창"
              data-evnt-lbl="검색창 열기"
              aria-label="검색"
            >
              <i className="ico_search art_search" />
              <i className="ico_search_gra art_search_gra" />
              <i className="ico_search_ai art_ai" />
            </button>

            <button
              type="button"
              className="btn_navbar"
              onClick={onMenuClick}
              data-evnt-ctg="header navigation"
              data-evnt-act="click: megamenu"
              data-evnt-lbl="메뉴"
              aria-label="메뉴"
            >
              <i className="ico_ham" />
            </button>

            <a
              href="https://www.joongang.co.kr/plus"
              className="btn_shortcut"
              data-evnt-ctg="header navigation"
              data-evnt-act="move:logo shortcuts"
              data-evnt-lbl="중앙플러스"
              aria-label="더중앙플러스 바로가기"
            >
              <i className="ico_shortcut_plus" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
