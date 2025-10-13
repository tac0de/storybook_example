import classNames from 'classnames';

import {
  MegaMenuAccountSection,
  MegaMenuCloseButton,
  MegaMenuHeader,
  MegaMenuMobileFooter,
  MegaMenuNavigation,
} from '../../Molecules/MegaMenu';
import { megaMenuConfig } from './megaMenuConfig';

export type MegaMenuProps = {
  open: boolean;
  onClose: () => void;
  loggedIn?: boolean;
  userName?: string;
  onLogin?: () => void;
};

export default function MegaMenu({ open, onClose, loggedIn = false, userName, onLogin }: MegaMenuProps) {
  return (
    <div
      id="menu_popup"
      className={classNames('full_popup', 'menu_popup', open && 'show')}
      tabIndex={0}
      role="dialog"
      aria-modal="true"
      aria-labelledby="megaMenuTitle"
      aria-hidden={!open}
    >
      <div className="layer_popup side_nav">
        <MegaMenuHeader />
        <div className="scroll">
          <MegaMenuAccountSection loggedIn={loggedIn} userName={userName} onLogin={onLogin} />
          <MegaMenuNavigation config={megaMenuConfig} />
          <MegaMenuMobileFooter />
        </div>
        <MegaMenuCloseButton onClose={onClose} />
      </div>
    </div>
  );
}
