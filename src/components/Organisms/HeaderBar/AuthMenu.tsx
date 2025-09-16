// components/Organisms/HeaderBar/AuthMenu.tsx
import * as React from 'react';
import type { HeaderBarUser } from './types';

type Props = {
  user: HeaderBarUser;
  onClickJoin: () => void;
  onClickReplica: () => void;
};

function AuthMenu({ user, onClickJoin, onClickReplica }: Props) {
  if (!user.loggedIn) {
    return (
      <ul className="logout">
        <li>
          <a href="#" onClick={e => e.preventDefault()}>
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
    );
  }

  return (
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
  );
}

export default React.memo(AuthMenu);
