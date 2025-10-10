export default function MegaMenuMobileFooter() {
  return (
    <div className="layer_footer lg_hidden">
      <div className="layer_footer_item">
        <p>중앙일보를 만나는 또다른 방법</p>
        <ul className="btn_group">
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/joongangilbo?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
            >
              <i className="ico_sns_twt"></i>
              <span className="visually_hidden">트위터</span>
            </a>
          </li>
          <li>
            <a target="_blank" rel="noreferrer" href="https://media.naver.com/press/025">
              <i className="ico_sns_naver"></i>
              <span className="visually_hidden">네이버</span>
            </a>
          </li>
          <li>
            <a target="_blank" rel="noreferrer" href="https://ko-kr.facebook.com/joongang/">
              <i className="ico_sns_face"></i>
              <span className="visually_hidden">페이스북</span>
            </a>
          </li>
          <li>
            <a target="_blank" rel="noreferrer" href="https://www.instagram.com/joongangilbo/?hl=ko">
              <i className="ico_sns_instar"></i>
              <span className="visually_hidden">인스타그램</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
