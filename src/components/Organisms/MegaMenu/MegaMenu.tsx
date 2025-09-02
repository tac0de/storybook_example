import classNames from 'classnames';

export type MegaMenuProps = {
  open: boolean;
  onClose: () => void;
  loggedIn?: boolean;
  userName?: string; // 로그인 상태일 때 상단 "OOO님" 표시
  onLogin?: () => void; // 모바일 메가메뉴의 "로그인" 버튼
};

const opinionLinks = [
  { href: 'https://www.joongang.co.kr/opinion/editorialcolumn', label: '사설칼럼' },
  { href: 'https://www.joongang.co.kr/opinion/satiricalcartoon', label: '만평' },
  { href: 'https://www.joongang.co.kr/opinion/debatepolllist', label: 'Hot Poll' },
  { href: 'https://www.joongang.co.kr/opinion/resetkorea', label: '리셋 코리아' },
  { href: 'https://www.joongang.co.kr/opinion/vod', label: '영상' },
];

const newsLinks = [
  { href: 'https://www.joongang.co.kr/politics', label: '정치' },
  { href: 'https://www.joongang.co.kr/money', label: '경제' },
  { href: 'https://www.joongang.co.kr/society', label: '사회' },
  { href: 'https://www.joongang.co.kr/world', label: '국제' },
  { href: 'https://www.joongang.co.kr/culture', label: '문화' },
  { href: 'https://www.joongang.co.kr/sports', label: '스포츠' },
  { href: 'https://www.joongang.co.kr/lifestyle', label: '라이프' },
  { href: 'https://www.joongang.co.kr/people', label: '피플' },
];

const specialLinks = [
  { href: 'https://www.joongang.co.kr/factpl', label: '팩플' },
  { href: 'https://www.joongang.co.kr/bicnic', label: '비크닉' },
  { href: 'https://www.joongang.co.kr/realestate', label: '부동산' },
  { href: 'https://www.joongang.co.kr/cooking', label: 'COOKING' },
  { href: 'https://www.joongang.co.kr/digitalspecial', label: '디지털 스페셜' },
  { href: 'https://www.joongang.co.kr/travel', label: '여행레저' },
  { href: 'https://www.joongang.co.kr/nk', label: '더 북한' },
  { href: 'https://www.joongang.co.kr/thechina', label: '더 차이나' },
  { href: 'https://www.joongang.co.kr/themaum', label: '더,마음' },
  { href: 'https://www.joongang.co.kr/thehighend', label: '더 하이엔드' },
  { href: 'https://www.joongang.co.kr/thelong', label: '더,오래' },
  { href: 'https://www.joongang.co.kr/thehealth', label: '더 헬스' },
];

const packageLinks = [
  { href: 'https://www.joongang.co.kr/subscription', label: '구독패키지' },
  { href: 'https://www.joongang.co.kr/issue', label: '이슈패키지' },
  { href: 'https://www.joongang.co.kr/series', label: '연재패키지' },
];

const multimediaLinks = [
  { href: 'https://www.joongang.co.kr/photo', label: '포토' },
  { href: 'https://www.joongang.co.kr/vod', label: '영상' },
  { href: 'https://www.joongang.co.kr/jpod', label: 'J팟' },
];

const intlLinks = [
  { href: 'https://koreajoongangdaily.joins.com/', label: 'ENG', ext: true },
  { href: 'https://chinese.joins.com/', label: '中文', ext: true },
  { href: 'https://japanese.joins.com/', label: '日文', ext: true },
];

const plusExploreLinks = [
  { href: 'https://www.joongang.co.kr/plus/contents/business', label: 'Leader&Reader' },
  { href: 'https://www.joongang.co.kr/plus/contents/society', label: '세상과 함께' },
  { href: 'https://www.joongang.co.kr/plus/contents/money', label: '돈 버는 재미' },
  { href: 'https://www.joongang.co.kr/plus/contents/culture', label: '마음 챙기기' },
  { href: 'https://www.joongang.co.kr/plus/contents/family', label: '가족과 함께' },
  { href: 'https://www.joongang.co.kr/plus/contents/lifestyle', label: '쉴 땐 뭐하지' },
];

const footerQuickLinks = [
  { href: 'https://www.joongang.co.kr/trend', label: '트렌드 뉴스' },
  { href: 'https://www.joongang.co.kr/brandnews', label: '브랜드뉴스' },
  { href: 'https://weather.joongang.co.kr', label: '날씨' },
  { href: 'https://www.joongang.co.kr/reporter', label: '기자' },
  { href: 'https://bbs.joongang.co.kr/jebo', label: '제보' },
  { href: 'https://www.joongang.co.kr/replica/guides', label: '지면보기 이용안내' },
  { href: 'https://subscribe.joins.com/', label: '신문 구독신청', ext: true },
  { href: 'https://jmembership.joins.com/', label: '중앙멤버십', ext: true },
  { href: 'https://www.joongang.co.kr/etc/brand_intro', label: 'The JoongAng 브랜드' },
  { href: 'https://www.joongang.co.kr/customercenter', label: '고객센터', extraClass: 'lg_hidden' },
  { href: 'https://www.joongang.co.kr/guides', label: '더중앙 이용안내', extraClass: 'lg_hidden' },
  { href: 'https://www.joongang.co.kr/joongangai', label: 'AI+ 중앙일보', withNew: true },
];

export default function MegaMenu({ open, onClose, loggedIn = false, userName, onLogin }: MegaMenuProps) {
  // ESC 키로 닫기

  return (
    <div
      id="menu_popup"
      className={classNames('full_popup', 'menu_popup', open && 'show')}
      tabIndex={0}
      role="dialog"
      aria-modal="true"
      aria-labelledby="megaMenuTitle"
      aria-hidden={!open}
    >
      <div className="layer_popup side_nav">
        {/* 상단 (모바일 헤더) */}
        <div className="layer_header lg_hidden">
          <strong className="logo">
            <a href="https://www.joongang.co.kr">
              <span className="visually_hidden">The JoongAng</span>
            </a>
          </strong>
        </div>

        <div className="scroll">
          {/* 로그인/마이 영역 */}
          <div className="my_wrap noline">
            {/* 로그아웃(=로그인 유도) 블록: 모바일에서만 노출되던 영역, 로그인 안 했을 때만 */}
            {!loggedIn && (
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
            )}

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

            {/* 배너 1 */}
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
          </div>

          {/* 본문 내비 */}
          <nav className="nav layer_body" aria-label="메가메뉴">
            <a href="https://www.joongang.co.kr" className="home lg_hidden">
              <strong className="logo">
                <span className="visually_hidden">The JoongAng</span>
              </strong>
              <i className="ico_fold" />
            </a>

            {/* 오피니언 */}
            <dl className="opinion">
              <dt>
                <strong>
                  <a href="https://www.joongang.co.kr/opinion">
                    오피니언
                    <i className="ico_fold" />
                  </a>
                </strong>
              </dt>
              <dd className="nav_item">
                <ul>
                  {opinionLinks.map(l => (
                    <li key={l.href}>
                      <a href={l.href}>{l.label}</a>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>

            {/* 뉴스 */}
            <dl className="news">
              <dt>
                <strong>뉴스</strong>
              </dt>
              <dd className="nav_item">
                <ul>
                  {newsLinks.map(l => (
                    <li key={l.href}>
                      <a href={l.href}>{l.label}</a>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>

            {/* 스페셜 */}
            <dl className="special">
              <dt>
                <strong>스페셜</strong>
              </dt>
              <dd className="nav_item">
                <ul>
                  {specialLinks.map(l => (
                    <li key={l.href}>
                      <a href={l.href}>{l.label}</a>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>

            {/* 패키지 + 멀티미디어 + 뉴스레터/중앙SUNDAY */}
            <dl className="package">
              <dt>
                <strong>패키지</strong>
              </dt>
              <dd className="nav_item">
                <ul>
                  {packageLinks.map(l => (
                    <li key={l.href}>
                      <a href={l.href}>{l.label}</a>
                    </li>
                  ))}
                </ul>
              </dd>

              <dt>
                <strong>멀티미디어</strong>
              </dt>
              <dd className="nav_item">
                <ul>
                  {multimediaLinks.map(l => (
                    <li key={l.href}>
                      <a href={l.href}>{l.label}</a>
                    </li>
                  ))}
                </ul>
              </dd>

              <dt>
                <strong>
                  <a href="https://www.joongang.co.kr/newsletter">뉴스레터</a>
                </strong>
              </dt>
              <dt>
                <strong>
                  <a href="https://www.joongang.co.kr/sunday">중앙SUNDAY</a>
                </strong>
              </dt>
            </dl>

            {/* International */}
            <dl className="lg_hidden">
              <dt>
                <strong>International Edition</strong>
              </dt>
              <dd className="nav_item">
                <ul>
                  {intlLinks.map(l => (
                    <li key={l.href}>
                      <a href={l.href} target="_blank" rel="noreferrer">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>

            {/* 더중앙플러스 섹션 */}
            <div className="plus">
              <a href="https://www.joongang.co.kr/plus" className="home">
                <strong className="logo_plus_white">
                  <span className="visually_hidden">더 중앙 플러스</span>
                </strong>
              </a>

              <dl>
                <dt>
                  <strong>
                    <a href="https://www.joongang.co.kr/plus/contents">
                      콘텐트 탐색
                      <i className="ico_fold" />
                    </a>
                  </strong>
                </dt>
                <dd className="nav_item">
                  <ul>
                    {plusExploreLinks.map(l => (
                      <li key={l.href}>
                        <a href={l.href}>{l.label}</a>
                      </li>
                    ))}
                  </ul>
                </dd>

                <dt>
                  <strong>
                    <a href="https://www.joongang.co.kr/plus/series">
                      시리즈별 보기
                      <i className="ico_fold" />
                    </a>
                  </strong>
                </dt>
                <dt>
                  <strong>
                    <a href="https://www.joongang.co.kr/plus/curation">
                      큐레이션 발견
                      <i className="ico_fold" />
                    </a>
                  </strong>
                </dt>
              </dl>

              <ul>
                <li>
                  <a href="https://www.joongang.co.kr/purchase/main">이용권 구매</a>
                </li>
                <li>
                  <a href="https://www.joongang.co.kr/plus/guides">서비스 활용 가이드</a>
                </li>
                <li>
                  <a href="https://www.joongang.co.kr/2025brand-campaign_plus-story?thejoongang_open_browser=y">
                    브랜드 소개
                    <i className="ico_new" />
                  </a>
                </li>
                <li>
                  <a href="https://www.joongang.co.kr/atoz/47">이용안내</a>
                </li>
              </ul>
            </div>

            {/* 하단 배너들 (필요 시 show/hide 클래스 그대로 유지) */}
            <div className="banner_wrap lg_hidden" style={{ background: '#FD5F48' }}>
              <a href="https://joongang-60th.co.kr?thejoongang_open_browser=y" target="_self" rel="noreferrer">
                <img
                  width={320}
                  height={60}
                  loading="lazy"
                  src="https://img.joongang.co.kr/svcimg/1000/dataedit/202508/476_20250819072740.jpg/_ir_640x120_/"
                  alt="창간60주년글로벌미디어컨퍼런스"
                />
              </a>
            </div>

            {/* 퀵 링크 묶음 */}
            <ul>
              {footerQuickLinks.map(l => (
                <li key={l.href} className={l.extraClass || ''}>
                  <strong>
                    <a href={l.href} {...(l.ext ? { target: '_blank', rel: 'noreferrer' } : {})}>
                      {l.label}
                      {l.withNew && <i className="ico_new" />}
                    </a>
                  </strong>
                </li>
              ))}
            </ul>
          </nav>

          {/* 하단 SNS 영역 (모바일에서만) */}
          <div className="layer_footer lg_hidden">
            <div className="layer_footer_item">
              <p>중앙일보를 만나는 또다른 방법</p>
              <ul className="btn_group">
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://twitter.com/joongangilbo?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
                  >
                    <i className="ico_sns_twt"></i>
                    <span className="visually_hidden">트위터</span>
                  </a>
                </li>
                <li>
                  <a target="_blank" rel="noreferrer" href="https://media.naver.com/press/025">
                    <i className="ico_sns_naver"></i>
                    <span className="visually_hidden">네이버</span>
                  </a>
                </li>
                <li>
                  <a target="_blank" rel="noreferrer" href="https://ko-kr.facebook.com/joongang/">
                    <i className="ico_sns_face"></i>
                    <span className="visually_hidden">페이스북</span>
                  </a>
                </li>
                <li>
                  <a target="_blank" rel="noreferrer" href="https://www.instagram.com/joongangilbo/?hl=ko">
                    <i className="ico_sns_instar"></i>
                    <span className="visually_hidden">인스타그램</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 닫기 버튼 */}
        <button type="button" className="btn_close lg_hidden" title="Close" onClick={onClose} aria-label="닫기">
          <i className="ico_close" />
          <span className="visually_hidden">Close</span>
        </button>
      </div>
    </div>
  );
}
