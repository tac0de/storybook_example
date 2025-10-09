import { useState } from 'react';
import classNames from 'classnames';
import { HeaderBar } from '../../components/Organisms/HeaderBar/HeaderBar.compound';
import MegaMenu from '../../components/Organisms/MegaMenu/MegaMenu';
import SearchLayer from '../../components/Organisms/SearchLayer/SearchLayer';
import { useSearchSubmit } from '../../hooks/useSearchSubmit';

type Props = {
  show60thEmblem?: boolean;
  isLoggedIn?: boolean;
  sticky?: boolean;
};

export default function SubHeader({ show60thEmblem = true, isLoggedIn = false, sticky = false }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { handleSubmit } = useSearchSubmit();

  const handleJoin = () => {
    alert('회원가입 페이지로 이동');
  };

  const handleLogout = () => {
    alert('로그아웃');
  };

  const handleReplica = () => {
    alert('지면보기 페이지로 이동');
  };

  return (
    <>
      <header id="header" className={classNames('header', 'nav_re', 'emblem60', sticky && 'sticky_top')}>
        <HeaderBar.Root
          variant="sub"
          user={{ loggedIn: isLoggedIn }}
          onOpenMegaMenu={() => setIsMenuOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onClickJoin={handleJoin}
          onClickReplica={handleReplica}
          onLogout={handleLogout}
        >
          <HeaderBar.Logo
            variant="sub"
            emblem60Url={show60thEmblem ? 'https://www.joongang.co.kr/60th' : undefined}
            logoUrl="https://img.joongang.co.kr/pubimg/logo/logo_thejoongang.png"
            homeHref="https://www.joongang.co.kr"
            width={178}
            height={26}
          />
          <HeaderBar.Right>
            <HeaderBar.Auth />
            <HeaderBar.OptionArea>
              <HeaderBar.Actions />
              <HeaderBar.Shortcut
                variant="plusWithoutLogo"
                href="https://www.joongang.co.kr/plus"
                ariaLabel="더중앙플러스 바로가기"
              />
            </HeaderBar.OptionArea>
          </HeaderBar.Right>
        </HeaderBar.Root>
      </header>

      <MegaMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SearchLayer open={isSearchOpen} onClose={() => setIsSearchOpen(false)} onSubmit={handleSubmit} />
    </>
  );
}
