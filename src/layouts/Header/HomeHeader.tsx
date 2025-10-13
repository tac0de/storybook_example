// src/layouts/Header/HomeHeader.tsx
import classNames from 'classnames';
import HeaderBar from '../../components/Organisms/HeaderBar/HeaderBar';
import MegaMenu from '../../components/Organisms/MegaMenu/MegaMenu';
import SearchLayer from '../../components/Organisms/SearchLayer/SearchLayer';
import { useDisclosure } from '../../hooks/useDisclosure';
import { useSearchSubmit } from '../../hooks/useSearchSubmit';
import { HOME_HEADER_CONTENT } from './headerContent';

export type HomeHeaderProps = {
  sticky?: boolean;
};

export default function HomeHeader({ sticky = false }: HomeHeaderProps) {
  const megaMenu = useDisclosure();
  const searchLayer = useDisclosure();
  const { nav, user, shortcut, mastheadMenu } = HOME_HEADER_CONTENT;
  const { handleSubmit } = useSearchSubmit();

  return (
    <header id="header" className={classNames('header', 'nav_re', 'emblem60', sticky && 'sticky_top')}>
      <HeaderBar
        logo={{
          emblem60Url: 'https://www.joongang.co.kr/60th',
          logoUrl: 'https://img.joongang.co.kr/pubimg/index/logo_thejoongang.png',
          homeHref: 'https://www.joongang.co.kr',
        }}
        nav={nav}
        user={user}
        mastheadMenu={mastheadMenu}
        shortcut={shortcut}
        onOpenMegaMenu={megaMenu.toggle}
        onOpenSearch={searchLayer.open}
        onClickJoin={() => {
          window.location.href = '/join';
        }}
        onClickReplica={() => {
          window.location.href = '/replica/guides';
        }}
        actions={{
          menuExpanded: megaMenu.isOpen,
          searchExpanded: searchLayer.isOpen,
        }}
      />
      <MegaMenu open={megaMenu.isOpen} onClose={megaMenu.close} />
      <SearchLayer open={searchLayer.isOpen} onClose={searchLayer.close} onSubmit={handleSubmit} />
    </header>
  );
}
