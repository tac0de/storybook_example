export type MegaMenuAccountSectionProps = {
  loggedIn: boolean;
  userName?: string;
  onLogin?: () => void;
};

export default function MegaMenuAccountSection({ loggedIn, userName, onLogin }: MegaMenuAccountSectionProps) {
  return (
    <div className="my_wrap noline">
      {!loggedIn && <MegaMenuLoginPrompt onLogin={onLogin} />}
      <MegaMenuMyLinks loggedIn={loggedIn} userName={userName} />
      <MegaMenuPrimaryBanner />
    </div>
  );
}

function MegaMenuLoginPrompt({ onLogin }: { onLogin?: () => void }) {
  return (
    <div className="logout lg_hidden sm_hidden md_hidden">
      <p className="logout_title">
        간편 로그인하고 한결 더 편리해진 <br />
        나만의 중앙일보를 경험해보세요.
      </p>
      <button
        type="button"
        className="btn_user"
        onClick={onLogin}
        aria-label="로그인"
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
  );
}

function MegaMenuMyLinks({ loggedIn, userName }: { loggedIn: boolean; userName?: string }) {
  return (
    <ul className="mypage_wrap d_mypage_megamenu">
      {loggedIn && (
        <li>
          <a
            href="https://www.joongang.co.kr/mynews"
            className="user_wrap"
            data-evnt-ctg="area:중앙|홈"
            data-evnt-act="move:A30 메가메뉴"
            data-evnt-lbl="마이페이지"
          >
            <strong>
              <span className="user">{userName || '회원'}</span>님
            </strong>
            의 마이페이지
            <i className="ico_arrow_right" />
          </a>
        </li>
      )}
      <li className="sm_hidden md_hidden">
        <a href="https://www.joongang.co.kr/customercenter">고객센터</a>
      </li>
      <li className="sm_hidden md_hidden">
        <a href="https://www.joongang.co.kr/guides">더중앙 이용안내</a>
      </li>
    </ul>
  );
}

function MegaMenuPrimaryBanner() {
  return (
    <div className="banner_wrap lg_hidden">
      <a
        href="https://www.joongang.co.kr/replica/guides"
        data-evnt-ctg="area:중앙|홈"
        data-evnt-act="move:A30 메가메뉴_drawer"
        data-evnt-lbl="지면보기이용안내"
      >
        <img
          width={320}
          height={106}
          loading="lazy"
          src="https://img.joongang.co.kr/pubimg/banner/drawer/bn_newspaper_renewal@2x.min.png"
          alt="중앙일보 지면 그대로, 뉴스의 큰 그림 그대로 지면보기 이용안내"
        />
      </a>
    </div>
  );
}
