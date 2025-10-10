export type SearchLayerHeaderProps = {
  onClose: () => void;
};

export default function SearchLayerHeader({ onClose }: SearchLayerHeaderProps) {
  return (
    <div className="layer_header">
      <button
        type="button"
        onClick={onClose}
        className="btn_close"
        title="Close"
        data-evnt-ctg="area:중앙|홈"
        data-evnt-act="click:search_검색창"
        data-evnt-lbl="검색창 닫기"
      >
        <i className="ico_close"></i>
        <span className="visually_hidden">Close</span>
      </button>
    </div>
  );
}
