import { useState } from 'react';
import classNames from 'classnames';
import { HeaderBar } from '../../components/Organisms/HeaderBar/HeaderBar.compound';
import MegaMenu from '../../components/Organisms/MegaMenu/MegaMenu';
import SearchLayer from '../../components/Organisms/SearchLayer/SearchLayer';
import { useSearchSubmit } from '../../hooks/useSearchSubmit';

export type HomeHeaderProps = {
  sticky?: boolean;
};

export default function HomeHeader({ sticky = false }: HomeHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { handleSubmit } = useSearchSubmit();

  const user = { loggedIn: false };

  const handleJoin = () => {
    window.location.href = '/join';
  };

  const handleReplica = () => {
    window.location.href = '/replica/guides';
  };

  return (
    <>
      <header id="header" className={classNames('header', 'nav_re', 'emblem60', sticky && 'sticky_top')}>
        <HeaderBar.Root
          variant="default"
          user={user}
          onOpenMegaMenu={() => setIsMenuOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onClickJoin={handleJoin}
          onClickReplica={handleReplica}
        >
          <HeaderBar.Logo
            emblem60Url="https://www.joongang.co.kr/60th"
            logoUrl="https://img.joongang.co.kr/pubimg/index/logo_thejoongang.png"
            homeHref="https://www.joongang.co.kr"
          />
          <HeaderBar.Right>
            <HeaderBar.MastheadMenu
              replicaHref="/replica/guides"
              loginHref="/login"
              joinHref="/join"
              myNewsHref="https://www.joongang.co.kr/mynews"
              languageItems={[
                { label: 'ENG', href: 'https://koreajoongangdaily.joins.com' },
                { label: '中文', href: 'https://chinese.joins.com' },
              ]}
            />
            <HeaderBar.Nav
              items={[
                { label: '오피니언', href: 'https://www.joongang.co.kr/opinion' },
                { label: '정치', href: 'https://www.joongang.co.kr/politics' },
                { label: '경제', href: 'https://www.joongang.co.kr/money' },
                { label: '사회', href: 'https://www.joongang.co.kr/society' },
                { label: '국제', href: 'https://www.joongang.co.kr/world' },
                { label: '문화', href: 'https://www.joongang.co.kr/culture' },
                { label: '스포츠', href: 'https://www.joongang.co.kr/sports' },
                { label: '라이프', href: 'https://www.joongang.co.kr/lifestyle' },
                { label: '피플', href: 'https://www.joongang.co.kr/people' },
              ]}
            >
              <HeaderBar.Shortcut />
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
