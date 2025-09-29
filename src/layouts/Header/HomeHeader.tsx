// layouts/Header/GlobalHeader.tsx
import { useState, useCallback } from 'react';
import classNames from 'classnames';
import HeaderBar from '../../components/Organisms/HeaderBar/HeaderBar';
import MegaMenu from '../../components/Organisms/MegaMenu/MegaMenu';
import SearchLayer from '../../components/Organisms/SearchLayer/SearchLayer';

export type HomeHeaderProps = {
  sticky?: boolean;
};

export default function HomeHeader({ sticky = false }: HomeHeaderProps) {
  const [openMega, setOpenMega] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const user = { loggedIn: false };

  const onSubmitSearch = useCallback((q: string) => {
    if (!q) return;
    window.location.href = `/search?keyword=${encodeURIComponent(q)}`;
  }, []);

  return (
    <header id="header" className={classNames('header', 'nav_re', 'emblem60', sticky && 'sticky_top')}>
      <HeaderBar
        className="header_wrap"
        emblem60Url="https://www.joongang.co.kr/60th"
        logoUrl="https://img.joongang.co.kr/pubimg/index/logo_thejoongang.png"
        homeHref="https://www.joongang.co.kr"
        nav={[
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
        user={user}
        onOpenMegaMenu={() => setOpenMega(!openMega)}
        onOpenSearch={() => setOpenSearch(true)}
        onClickJoin={() => {
          window.location.href = '/join';
        }}
        onClickReplica={() => {
          window.location.href = '/replica/guides';
        }}
      />
      <MegaMenu open={openMega} onClose={() => setOpenMega(false)} />
      <SearchLayer open={openSearch} onClose={() => setOpenSearch(false)} onSubmit={onSubmitSearch} />
    </header>
  );
}
