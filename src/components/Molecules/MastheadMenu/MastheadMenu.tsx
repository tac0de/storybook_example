import * as React from 'react';
import classNames from 'classnames';
import { LanguageLinks, type LanguageItem } from '../LanguageLinks/LanguageLinks';
import { ShortcutLink } from '../../Atoms/ShortcutLink/ShortcutLink';
import { TextLink } from '../../Atoms/TextLink/TextLink';
import './MastheadMenu.scss';

const DEFAULT_LINKS = {
  replica: 'https://www.joongang.co.kr/replica',
  login: '/login',
  join: '/join',
  logout: '/logout',
  myNews: 'https://www.joongang.co.kr/mynews',
};

export type MastheadMenuProps = {
  loggedIn: boolean;
  onClickReplica?: () => void;
  onClickJoin?: () => void;
  onClickLogin?: () => void;
  onClickLogout?: () => void;
  replicaHref?: string;
  loginHref?: string;
  joinHref?: string;
  logoutHref?: string;
  myNewsHref?: string;
  className?: string;
  languageItems?: LanguageItem[];
  languageResponsiveHelpers?: boolean;
};

export function MastheadMenu({
  loggedIn,
  onClickReplica,
  onClickJoin,
  onClickLogin,
  onClickLogout,
  replicaHref = DEFAULT_LINKS.replica,
  loginHref = DEFAULT_LINKS.login,
  joinHref = DEFAULT_LINKS.join,
  logoutHref = DEFAULT_LINKS.logout,
  myNewsHref = DEFAULT_LINKS.myNews,
  className,
  languageItems,
  languageResponsiveHelpers = true,
}: MastheadMenuProps) {
  const languages = languageItems && languageItems.length > 0 ? languageItems : undefined;

  const handleClick = (handler?: () => void): ((event: React.MouseEvent<HTMLAnchorElement>) => void) | undefined => {
    if (!handler) return undefined;
    return event => {
      event.preventDefault();
      handler();
    };
  };

  return (
    <div className={classNames('masthead_menu', className)}>
      <ShortcutLink
        baseClassName="newspaper font_gray sm_hidden md_hidden"
        ariaLabel="지면보기"
        href={replicaHref}
        onClick={handleClick(onClickReplica)}
      >
        <i className="ico_newspaper black" aria-hidden="true" />
        지면보기
      </ShortcutLink>

      {languages ? <LanguageLinks items={languages} responsiveHelpers={languageResponsiveHelpers} /> : null}

      {!loggedIn ? (
        <ul className="logout">
          <li>
            <TextLink
              href={loginHref}
              ariaLabel="로그인"
              preventDefault={Boolean(onClickLogin)}
              onClick={handleClick(onClickLogin)}
            >
              로그인
            </TextLink>
          </li>
          <li>
            <TextLink
              href={joinHref}
              className="sm_hidden md_hidden"
              ariaLabel="회원가입"
              preventDefault={Boolean(onClickJoin)}
              onClick={handleClick(onClickJoin)}
            >
              회원가입
            </TextLink>
            <TextLink
              href={replicaHref}
              className="lg_hidden"
              ariaLabel="지면보기"
              preventDefault={Boolean(onClickReplica)}
              onClick={handleClick(onClickReplica)}
            >
              지면보기
            </TextLink>
          </li>
        </ul>
      ) : (
        <ul className="user login">
          <li className="link_logout">
            <TextLink
              href={logoutHref}
              ariaLabel="로그아웃"
              preventDefault={Boolean(onClickLogout)}
              onClick={handleClick(onClickLogout)}
            >
              로그아웃
            </TextLink>
          </li>
          <li>
            <TextLink href={myNewsHref} ariaLabel="마이페이지" preventDefault={false}>
              마이페이지
            </TextLink>
          </li>
          <li className="lg_hidden">
            <TextLink
              href={replicaHref}
              ariaLabel="지면보기"
              preventDefault={Boolean(onClickReplica)}
              onClick={handleClick(onClickReplica)}
            >
              지면보기
            </TextLink>
          </li>
        </ul>
      )}
    </div>
  );
}

export default MastheadMenu;
