export type MegaMenuCloseButtonProps = {
  onClose: () => void;
};

export default function MegaMenuCloseButton({ onClose }: MegaMenuCloseButtonProps) {
  return (
    <button type="button" className="btn_close lg_hidden" title="Close" onClick={onClose} aria-label="닫기">
      <i className="ico_close" />
      <span className="visually_hidden">Close</span>
    </button>
  );
}
