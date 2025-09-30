// src/layouts/Header/SubHeader.tsx
import { useState } from 'react';
import classNames from 'classnames';
import HeaderBar from '../../components/Organisms/HeaderBar/HeaderBar';
import MegaMenu from '../../components/Organisms/MegaMenu/MegaMenu';
import SearchLayer from '../../components/Organisms/SearchLayer/SearchLayer';
import { useSearchSubmit } from '../../hooks/useSearchSubmit';

type Props = {
  show60thEmblem?: boolean;
  isLoggedIn?: boolean;
  sticky?: boolean;
};

export default function SubHeader({ show60thEmblem = true, isLoggedIn = false, sticky = false }: Props) {
  const [openMega, setOpenMega] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const { handleSubmit } = useSearchSubmit();

  return (
    <header id="header" className={classNames('header', 'nav_re', 'emblem60', sticky && 'sticky_top')}>
      <HeaderBar
        variant="sub"
        logo={{
          emblem60Url: show60thEmblem ? 'https://www.joongang.co.kr/60th' : undefined,
          logoUrl: 'https://img.joongang.co.kr/pubimg/logo/logo_thejoongang.png',
          homeHref: 'https://www.joongang.co.kr',
          width: 178,
          height: 26,
        }}
        user={{ loggedIn: isLoggedIn }}
        onOpenMegaMenu={() => setOpenMega(!openMega)}
        onOpenSearch={() => setOpenSearch(true)}
        onClickJoin={() => alert('회원가입 페이지로 이동')}
        onClickReplica={() => alert('지면보기 페이지로 이동')}
        shortcut={{
          variant: 'plus_without_logo',
          href: 'https://www.joongang.co.kr/plus',
          ariaLabel: '더중앙플러스 바로가기',
        }}
      />

      <MegaMenu open={openMega} onClose={() => setOpenMega(false)} />
      <SearchLayer open={openSearch} onClose={() => setOpenSearch(false)} onSubmit={handleSubmit} />
    </header>
  );
}
