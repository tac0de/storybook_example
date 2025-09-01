// components/Organisms/MegaMenu/MegaMenu.tsx
import classNames from 'classnames';
// import './MegaMenu.scss';

export type MegaMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MegaMenu({ open, onClose }: MegaMenuProps) {
  return (
    <div
      id="menu_popup"
      className={classNames('full_popup', 'menu_popup', open ? 'is-open' : 'is-closed')}
      role="dialog"
      aria-modal="true"
      aria-labelledby="megaMenuTitle"
    >
      <div className="layer_popup side_nav">
        <div className="layer_header lg_hidden">
          <strong id="megaMenuTitle" className="logo">
            <a href="https://www.joongang.co.kr">
              <span className="visually_hidden">The JoongAng</span>
            </a>
          </strong>
        </div>

        {/* ...여기에는 제공한 dl/dd 구조를 그대로 TSX로 옮겨오면 됨 (링크/배너들) ... */}
        {/* 길어서 생략하지만, 구조는 동일하게 유지 + 필요한 곳에 aria/role 보강 */}

        <button type="button" className="btn_close lg_hidden" title="Close" onClick={onClose}>
          <i className="ico_close" />
          <span className="visually_hidden">Close</span>
        </button>
      </div>
    </div>
  );
}

export default MegaMenu;
