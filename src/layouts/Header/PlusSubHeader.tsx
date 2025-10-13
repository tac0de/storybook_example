import classNames from 'classnames';
import HeaderBar from '../../components/Organisms/HeaderBar/HeaderBar';
import MegaMenu from '../../components/Organisms/MegaMenu/MegaMenu';
import SearchLayer from '../../components/Organisms/SearchLayer/SearchLayer';
import { useDisclosure } from '../../hooks/useDisclosure';
import { useSearchSubmit } from '../../hooks/useSearchSubmit';
import { PLUS_SUB_HEADER_CONTENT } from './headerContent';

export default function PlusSubHeader() {
  const megaMenu = useDisclosure();
  const searchLayer = useDisclosure();
  const { user, shortcut, mastheadMenu } = PLUS_SUB_HEADER_CONTENT;
  const { handleSubmit } = useSearchSubmit();

  return (
    <>
      <header id="header" className={classNames('header', 'nav_re', 'black_type', 'emblem60')}>
        <HeaderBar
          variant="plus-sub"
          user={user}
          logo={{ variant: 'plus', homeHref: 'https://www.joongang.co.kr/plus' }}
          shortcut={shortcut}
          mastheadMenu={mastheadMenu}
          onOpenMegaMenu={megaMenu.open}
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
