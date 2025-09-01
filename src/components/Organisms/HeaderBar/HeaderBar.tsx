// components/Organisms/HeaderBar/HeaderBar.tsx
import classNames from 'classnames';
import type { HeaderBarProps } from './types';
import './HeaderBar.scss';

export function HeaderBar({
  emblem60Url,
  logoUrl,
  homeHref,
  nav,
  user,
  onOpenMegaMenu,
  onOpenSearch,
  onClickLogin,
  onClickJoin,
  onClickReplica,
}: HeaderBarProps) {
  return (
    <header id="header" className={classNames('header', 'nav_re', 'emblem60', 'ja-header')}>
      <div className="header_wrap">
        <h1 className="logo">
          {/* 60주년 엠블럼 링크 */}
          {emblem60Url && (
            <a href={emblem60Url} aria-label="중앙일보 60주년 선포페이지">
              <span className="emblem">
                <i className="ico_emblem60" role="img" aria-label="60주년" />
              </span>
            </a>
          )}

          {/* 메인 로고 */}
          <a href={homeHref} aria-label="중앙일보">
            <img width={249} height={86} src={logoUrl} alt="중앙일보" />
          </a>
        </h1>

        <div className="header_area flex_sm_column_reverse flex_md_column_reverse">
          <nav className="header_nav" aria-label="주요 메뉴">
            {/* 데스크톱 GNB */}
            <ul className="nav sm_hidden md_hidden">
              {nav.map(item => (
                <li className={classNames('nav_item', item.active && 'is-active')} key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>

            {/* masthead */}
            <div className="masthead_menu">
              <a
                className="newspaper font_gray sm_hidden md_hidden"
                href="#"
                onClick={e => {
                  e.preventDefault();
                  onClickReplica();
                }}
                aria-label="지면보기"
              >
                <i className="ico_newspaper black" />
                지면보기
              </a>

              {/* 다국어 링크 */}
              <ul className="language_site sm_hidden md_hidden">
                <li>
                  <a href="https://japanese.joins.com/">日文</a>
                </li>
                <li>
                  <a href="https://chinese.joins.com/">中文</a>
                </li>
                <li>
                  <a href="https://koreajoongangdaily.joins.com/">ENG</a>
                </li>
              </ul>

              {/* 로그인/회원가입 / 모바일 지면보기 */}
              {!user.loggedIn ? (
                <ul className="logout">
                  <li>
                    <a
                      href="#"
                      onClick={e => {
                        e.preventDefault();
                        onClickLogin();
                      }}
                    >
                      로그인
                    </a>
                  </li>
                  <li>
                    <a
                      className="sm_hidden md_hidden"
                      href="#"
                      onClick={e => {
                        e.preventDefault();
                        onClickJoin();
                      }}
                    >
                      회원가입
                    </a>
                    <a
                      className="lg_hidden"
                      href="#"
                      onClick={e => {
                        e.preventDefault();
                        onClickReplica();
                      }}
                    >
                      지면보기
                    </a>
                  </li>
                </ul>
              ) : (
                <ul className="user login">
                  <li className="link_logout">
                    <a href="/logout">로그아웃</a>
                  </li>
                  <li>
                    <a href="/mynews">마이페이지</a>
                  </li>
                  <li className="lg_hidden">
                    <a
                      href="#"
                      onClick={e => {
                        e.preventDefault();
                        onClickReplica();
                      }}
                    >
                      지면보기
                    </a>
                  </li>
                </ul>
              )}
            </div>

            <a href="https://www.joongang.co.kr/plus" className="btn_shortcut" aria-label="더중앙플러스 바로가기">
              <i className="ico_shortcut_plus" />
              <i className="logo_plus" />
            </a>

            <button
              type="button"
              className="btn_navbar"
              onClick={onOpenMegaMenu}
              aria-label="메뉴"
              aria-haspopup="dialog"
              aria-expanded={false}
            >
              <i className="ico_navbar" />
            </button>

            <button
              type="button"
              className="btn_search"
              onClick={onOpenSearch}
              aria-label="검색"
              aria-haspopup="dialog"
              aria-expanded={false}
            >
              <i className="ico_search art_search" />
              <i className="ico_search_gra art_search_gra" />
              <i className="ico_search_ai art_ai" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default HeaderBar;
