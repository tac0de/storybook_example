import { useCallback, useRef } from 'react';
import classNames from 'classnames';

import {
  MegaMenuAccountSection,
  MegaMenuCloseButton,
  MegaMenuHeader,
  MegaMenuMobileFooter,
  MegaMenuNavigation,
} from '../../Molecules/MegaMenu';
import { megaMenuConfig } from './megaMenuConfig';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useBodyScrollLock } from '../../../hooks/useBodyScrollLock';
import { useEscapeKey } from '../../../hooks/useEscapeKey';
import { useFocusTrap } from '../../../hooks/useFocusTrap';

export type MegaMenuProps = {
  open: boolean;
  onClose: () => void;
  loggedIn?: boolean;
  userName?: string;
  onLogin?: () => void;
};

export default function MegaMenu({ open, onClose, loggedIn = false, userName, onLogin }: MegaMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useClickOutside(
    panelRef,
    () => {
      if (open) {
        onClose();
      }
    },
    open
  );
  const handleEscape = useCallback(() => {
    if (open) {
      onClose();
    }
  }, [onClose, open]);
  useEscapeKey(handleEscape, open);
  useBodyScrollLock(open);
  useFocusTrap(panelRef, open);

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
      <div className="layer_popup side_nav" ref={panelRef}>
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
