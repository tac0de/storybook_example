import classNames from 'classnames';
import HeaderBar from '../../components/Organisms/HeaderBar/HeaderBar';
import MegaMenu from '../../components/Organisms/MegaMenu/MegaMenu';
import SearchLayer from '../../components/Organisms/SearchLayer/SearchLayer';
import { useDisclosure } from '../../hooks/useDisclosure';
import { useSearchSubmit } from '../../hooks/useSearchSubmit';
import { PLUS_HOME_HEADER_CONTENT } from './headerContent';

export default function PlusHomeHeader() {
  const megaMenu = useDisclosure();
  const searchLayer = useDisclosure();
  const { nav, user, shortcut, mastheadMenu } = PLUS_HOME_HEADER_CONTENT;
  const { handleSubmit } = useSearchSubmit();

  return (
    <>
      <header id="header" className={classNames('header', 'black_type', 'nav_re', 'emblem60')}>
        <HeaderBar
          variant="plus"
          user={user}
          logo={{ variant: 'plus', homeHref: 'https://www.joongang.co.kr/plus' }}
          nav={nav}
          mastheadMenu={mastheadMenu}
          shortcut={shortcut}
          onOpenMegaMenu={megaMenu.toggle}
          onOpenSearch={searchLayer.open}
          onClickJoin={() => alert('회원가입')}
          onClickReplica={() => alert('지면보기')}
          onLogout={() => alert('로그아웃')}
          actions={{
            menuExpanded: megaMenu.isOpen,
            searchExpanded: searchLayer.isOpen,
          }}
        />
      </header>

      <MegaMenu open={megaMenu.isOpen} onClose={megaMenu.close} />
      <SearchLayer open={searchLayer.isOpen} onClose={searchLayer.close} onSubmit={handleSubmit} />
    </>
  );
}
