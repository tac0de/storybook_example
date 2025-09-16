// components/Organisms/HeaderBar/MastheadMenu.tsx
import * as React from 'react';
import LangLinks from './LangLinks';
import AuthMenu from './AuthMenu';
import type { HeaderBarUser } from './types';

type Props = {
  user: HeaderBarUser;
  onClickReplica: () => void;
  onClickJoin: () => void;
};

function MastheadMenu({ user, onClickReplica, onClickJoin }: Props) {
  return (
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

      <LangLinks />
      <AuthMenu user={user} onClickJoin={onClickJoin} onClickReplica={onClickReplica} />
    </div>
  );
}

export default React.memo(MastheadMenu);
