// src/layouts/Header/PlusSubHeader.tsx
import { useState } from 'react';
import classNames from 'classnames';
import HeaderBar from '../../components/Organisms/HeaderBar/HeaderBar';
import MegaMenu from '../../components/Organisms/MegaMenu/MegaMenu';
import SearchLayer from '../../components/Organisms/SearchLayer/SearchLayer';

export default function PlusSubHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const user = { loggedIn: true };

  return (
    <>
      <header id="header" className={classNames('header', 'nav_re', 'black_type', 'emblem60')}>
        <HeaderBar
          variant="plus-sub" // 'plus-sub' variant 사용
          logo={{
            variant: 'plus',
            homeHref: 'https://www.joongang.co.kr/plus',
          }}
          user={user}
          onOpenMegaMenu={() => setIsMenuOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onClickJoin={() => alert('회원가입')}
          onClickReplica={() => alert('지면보기')}
          shortcut={{
            variant: 'default',
            href: 'https://www.joongang.co.kr',
            ariaLabel: '더중앙 바로가기',
          }}
        />
      </header>
      <MegaMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SearchLayer open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
