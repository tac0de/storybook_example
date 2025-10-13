import classNames from 'classnames';
import HeaderBar from '../../components/Organisms/HeaderBar/HeaderBar';
import MegaMenu from '../../components/Organisms/MegaMenu/MegaMenu';
import SearchLayer from '../../components/Organisms/SearchLayer/SearchLayer';
import { useDisclosure } from '../../hooks/useDisclosure';
import { useSearchSubmit } from '../../hooks/useSearchSubmit';
import { SUB_HEADER_CONTENT } from './headerContent';

type Props = {
  show60thEmblem?: boolean;
  isLoggedIn?: boolean;
  sticky?: boolean;
};

export default function SubHeader({ show60thEmblem = true, isLoggedIn = false, sticky = false }: Props) {
  const megaMenu = useDisclosure();
  const searchLayer = useDisclosure();
  const { handleSubmit } = useSearchSubmit();
  const { user: baseUser, shortcut, mastheadMenu } = SUB_HEADER_CONTENT;
  const user = { ...baseUser, loggedIn: isLoggedIn };

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
        <HeaderBar
          variant="sub"
          user={user}
          logo={{
            emblem60Url: show60thEmblem ? 'https://www.joongang.co.kr/60th' : undefined,
            logoUrl: 'https://img.joongang.co.kr/pubimg/logo/logo_thejoongang.png',
            homeHref: 'https://www.joongang.co.kr',
            width: 178,
            height: 26,
          }}
          shortcut={shortcut}
          mastheadMenu={mastheadMenu}
          onOpenMegaMenu={megaMenu.open}
          onOpenSearch={searchLayer.open}
          onClickJoin={handleJoin}
          onClickReplica={handleReplica}
          onLogout={handleLogout}
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
