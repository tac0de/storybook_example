import classNames from 'classnames';
import { LanguageLinks, type LanguageItem } from '../LanguageLinks/LanguageLinks';
import './MastheadMenu.scss';

export type MastheadMenuProps = {
  loggedIn: boolean;
  onClickReplica: () => void;
  onClickJoin: () => void;
  className?: string;

  /** (옵션) masthead 내부에 다국어 링크를 함께 노출 */
  languageItems?: LanguageItem[];
  /** sm/md 숨김 헬퍼를 적용할지 (전역 CSS 기준) */
  languageResponsiveHelpers?: boolean;
};

export function MastheadMenu({
  loggedIn,
  onClickReplica,
  onClickJoin,
  className,
  languageItems, // ← 추가
  languageResponsiveHelpers = true, // ← 추가
}: MastheadMenuProps) {
  return (
    <div className={classNames('masthead_menu', className)}>
      {/* 데스크톱 지면보기 링크 */}
      <a
        className="newspaper font_gray sm_hidden md_hidden"
        href="#"
        onClick={e => {
          e.preventDefault();
          onClickReplica();
        }}
        aria-label="지면보기"
      >
        <i className="ico_newspaper black" aria-hidden="true" />
        지면보기
      </a>

      {/* 언어 링크 (원 마크업과 동일하게 masthead 내부에 배치) */}
      {languageItems && languageItems.length > 0 && (
        <LanguageLinks items={languageItems} responsiveHelpers={languageResponsiveHelpers} />
      )}

      {/* 로그인/회원가입 / 모바일 지면보기 */}
      {!loggedIn ? (
        <ul className="logout">
          <li>
            <a href="#" onClick={e => e.preventDefault()} aria-label="로그인">
              로그인
            </a>
          </li>
          <li>
            {/* 데스크톱 회원가입 */}
            <a
              className="sm_hidden md_hidden"
              href="#"
              onClick={e => {
                e.preventDefault();
                onClickJoin();
              }}
              aria-label="회원가입"
            >
              회원가입
            </a>
            {/* 모바일 지면보기 */}
            <a
              className="lg_hidden"
              href="#"
              onClick={e => {
                e.preventDefault();
                onClickReplica();
              }}
              aria-label="지면보기"
            >
              지면보기
            </a>
          </li>
        </ul>
      ) : (
        <ul className="user login">
          <li className="link_logout">
            <a href="/logout" aria-label="로그아웃">
              로그아웃
            </a>
          </li>
          <li>
            <a href="/mynews" aria-label="마이페이지">
              마이페이지
            </a>
          </li>
          <li className="lg_hidden">
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                onClickReplica();
              }}
              aria-label="지면보기"
            >
              지면보기
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}

export default MastheadMenu;
