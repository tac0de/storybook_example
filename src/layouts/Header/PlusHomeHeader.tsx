import { useState } from 'react';
import classNames from 'classnames';
import { HeaderBar } from '../../components/Organisms/HeaderBar/HeaderBar.compound';
import MegaMenu from '../../components/Organisms/MegaMenu/MegaMenu';
import SearchLayer from '../../components/Organisms/SearchLayer/SearchLayer';
import { useSearchSubmit } from '../../hooks/useSearchSubmit';

export default function PlusHomeHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const user = { loggedIn: true };
  const { handleSubmit } = useSearchSubmit();

  return (
    <>
      <header id="header" className={classNames('header', 'black_type', 'nav_re', 'emblem60')}>
        <HeaderBar.Root
          variant="plus"
          user={user}
          onOpenMegaMenu={() => setIsMenuOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onClickJoin={() => alert('회원가입')}
          onClickReplica={() => alert('지면보기')}
          onLogout={() => alert('로그아웃')}
        >
          <HeaderBar.Logo variant="plus" homeHref="https://www.joongang.co.kr/plus" />
          <HeaderBar.Right>
            <HeaderBar.Nav
              items={[
                { label: '콘텐트 탐색', href: '#' },
                { label: '시리즈별 보기', href: '#' },
                { label: '큐레이션 발견', href: '#' },
              ]}
            >
              <HeaderBar.Shortcut variant="default" href="https://www.joongang.co.kr" ariaLabel="더중앙 바로가기" />
              <HeaderBar.Actions />
            </HeaderBar.Nav>
          </HeaderBar.Right>
        </HeaderBar.Root>
      </header>

      <MegaMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SearchLayer open={isSearchOpen} onClose={() => setIsSearchOpen(false)} onSubmit={handleSubmit} />
    </>
  );
}
