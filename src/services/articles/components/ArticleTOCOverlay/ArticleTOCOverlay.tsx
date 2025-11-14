import * as React from 'react';

import styles from './ArticleTOCOverlay.module.scss';
import { useDisclosure } from '../../../../hooks/useDisclosure';
import { useBodyScrollLock } from '../../../../hooks/useBodyScrollLock';
import { useEscapeKey } from '../../../../hooks/useEscapeKey';
import { useClickOutside } from '../../../../hooks/useClickOutside';
import { useFocusTrap } from '../../../../hooks/useFocusTrap';

export type TocItem = { id: string; title: string };

export interface ArticleTOCOverlayProps {
  items: TocItem[];
  onNavigate?: (id: string) => void;
}

export function ArticleTOCOverlay({ items, onNavigate }: ArticleTOCOverlayProps) {
  const dialog = useDisclosure();
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const closeBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const overlayId = React.useId();

  useBodyScrollLock(dialog.isOpen);
  useEscapeKey(() => dialog.close(), dialog.isOpen);
  useClickOutside(panelRef, () => dialog.close(), dialog.isOpen);
  useFocusTrap(panelRef, dialog.isOpen, { initialFocus: () => closeBtnRef.current, restoreFocus: true });

  const handleNavigate = (id: string) => {
    onNavigate?.(id);
    dialog.close();
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-label="목차 열기"
        aria-controls={overlayId}
        aria-expanded={dialog.isOpen}
        onClick={dialog.open}
      >
        <span aria-hidden>📑</span> 목차
      </button>

      {dialog.isOpen && (
        <div className={styles.backdrop} role="presentation">
          <div ref={panelRef} id={overlayId} role="dialog" aria-modal="true" className={styles.panel}>
            <div className={styles.header}>
              <h2 className={styles.title}>목차</h2>
              <button ref={closeBtnRef} type="button" className={styles.close} onClick={dialog.close}>
                닫기
              </button>
            </div>
            <ul className={styles.list}>
              {items.map(item => (
                <li key={item.id} className={styles.item}>
                  <button type="button" className={styles.link} onClick={() => handleNavigate(item.id)}>
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default ArticleTOCOverlay;
