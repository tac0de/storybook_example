// layouts/Header/GlobalHeader.tsx
import { useState, useCallback } from 'react';
import HeaderBar from '../../components/Organisms/HeaderBar/HeaderBar';
import MegaMenu from '../../components/Organisms/MegaMenu/MegaMenu';
import SearchLayer from '../../components/Organisms/SearchLayer/SearchLayer';
import LoginPopover from '../../components/Organisms/LoginPopover/LoginPopover';

export default function GlobalHeader() {
  const [openMega, setOpenMega] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const user = { loggedIn: false };

  const onSubmitSearch = useCallback((q: string) => {
    if (!q) return;
    window.location.href = `/search?keyword=${encodeURIComponent(q)}`;
  }, []);

  return (
    <>
      <HeaderBar
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
        onOpenMegaMenu={() => setOpenMega(true)}
        onOpenSearch={() => setOpenSearch(true)}
        onClickLogin={() => setOpenLogin(true)}
        onClickJoin={() => {
          window.location.href = '/join';
        }}
        onClickReplica={() => {
          window.location.href = '/replica/guides';
        }}
      />

      <MegaMenu open={openMega} onClose={() => setOpenMega(false)} />
      <SearchLayer open={openSearch} onClose={() => setOpenSearch(false)} onSubmit={onSubmitSearch} />
      <LoginPopover
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        onClickJoin={() => {
          window.location.href = '/join';
        }}
        onClickLogin={() => {
          window.location.href = '/login';
        }}
      />
    </>
  );
}
