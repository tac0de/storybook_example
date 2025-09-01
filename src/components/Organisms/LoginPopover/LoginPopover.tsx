// components/Organisms/LoginPopover/LoginPopover.tsx
import classNames from 'classnames';
// import './LoginPopover.scss';

export type LoginPopoverProps = {
  open: boolean;
  onClose: () => void;
  onClickLogin: () => void;
  onClickJoin: () => void;
};

export function LoginPopover({ open, onClose, onClickJoin, onClickLogin }: LoginPopoverProps) {
  return (
    <div className={classNames('layer_popup', 'layer_login_popup', 'pop_over', open ? 'is-open' : 'is-closed')}>
      <div className="layer_item">
        <div className="layer_header">
          <strong className="login_popup_title">회원에게만 제공되는 편의 기능</strong>
        </div>
        <div className="layer_body">
          <ul className="login_popup_list">
            <li>내구독/보관함/하이라이트/메모/스페셜 콘텐트…</li>
          </ul>
        </div>
        <div className="layer_footer">
          <div className="btn_group">
            <button type="button" className="btn btn_s btn btn_outline_orange" onClick={onClickJoin}>
              간편가입
            </button>
            <button type="button" className="btn btn_s btn_outline_black" onClick={onClickLogin}>
              로그인
            </button>
          </div>
        </div>
        <button type="button" className="btn_close" title="Close" onClick={onClose}>
          <i className="ico_close" />
          <span className="visually_hidden">닫기</span>
        </button>
      </div>
    </div>
  );
}

export default LoginPopover;
