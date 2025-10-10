import classNames from 'classnames';

import {
  MegaMenuAccountSection,
  MegaMenuCloseButton,
  MegaMenuHeader,
  MegaMenuMobileFooter,
  MegaMenuNavigation,
  type MegaMenuLinkItem,
} from '../../Molecules/MegaMenu';

export type MegaMenuProps = {
  open: boolean;
  onClose: () => void;
  loggedIn?: boolean;
  userName?: string;
  onLogin?: () => void;
};

const opinionLinks: MegaMenuLinkItem[] = [
  { href: 'https://www.joongang.co.kr/opinion/editorialcolumn', label: '사설칼럼' },
  { href: 'https://www.joongang.co.kr/opinion/satiricalcartoon', label: '만평' },
  { href: 'https://www.joongang.co.kr/opinion/debatepolllist', label: 'Hot Poll' },
  { href: 'https://www.joongang.co.kr/opinion/resetkorea', label: '리셋 코리아' },
  { href: 'https://www.joongang.co.kr/opinion/vod', label: '영상' },
];

const newsLinks: MegaMenuLinkItem[] = [
  { href: 'https://www.joongang.co.kr/politics', label: '정치' },
  { href: 'https://www.joongang.co.kr/money', label: '경제' },
  { href: 'https://www.joongang.co.kr/society', label: '사회' },
  { href: 'https://www.joongang.co.kr/world', label: '국제' },
  { href: 'https://www.joongang.co.kr/culture', label: '문화' },
  { href: 'https://www.joongang.co.kr/sports', label: '스포츠' },
  { href: 'https://www.joongang.co.kr/lifestyle', label: '라이프' },
  { href: 'https://www.joongang.co.kr/people', label: '피플' },
];

const specialLinks: MegaMenuLinkItem[] = [
  { href: 'https://www.joongang.co.kr/factpl', label: '팩플' },
  { href: 'https://www.joongang.co.kr/bicnic', label: '비크닉' },
  { href: 'https://www.joongang.co.kr/realestate', label: '부동산' },
  { href: 'https://www.joongang.co.kr/cooking', label: 'COOKING' },
  { href: 'https://www.joongang.co.kr/digitalspecial', label: '디지털 스페셜' },
  { href: 'https://www.joongang.co.kr/travel', label: '여행레저' },
  { href: 'https://www.joongang.co.kr/nk', label: '더 북한' },
  { href: 'https://www.joongang.co.kr/thechina', label: '더 차이나' },
  { href: 'https://www.joongang.co.kr/themaum', label: '더,마음' },
  { href: 'https://www.joongang.co.kr/thehighend', label: '더 하이엔드' },
  { href: 'https://www.joongang.co.kr/thelong', label: '더,오래' },
  { href: 'https://www.joongang.co.kr/thehealth', label: '더 헬스' },
];

const packageLinks: MegaMenuLinkItem[] = [
  { href: 'https://www.joongang.co.kr/subscription', label: '구독패키지' },
  { href: 'https://www.joongang.co.kr/issue', label: '이슈패키지' },
  { href: 'https://www.joongang.co.kr/series', label: '연재패키지' },
];

const multimediaLinks: MegaMenuLinkItem[] = [
  { href: 'https://www.joongang.co.kr/photo', label: '포토' },
  { href: 'https://www.joongang.co.kr/vod', label: '영상' },
  { href: 'https://www.joongang.co.kr/jpod', label: 'J팟' },
];

const intlLinks: MegaMenuLinkItem[] = [
  { href: 'https://koreajoongangdaily.joins.com/', label: 'ENG', ext: true },
  { href: 'https://chinese.joins.com/', label: '中文', ext: true },
  { href: 'https://japanese.joins.com/', label: '日文', ext: true },
];

const plusExploreLinks: MegaMenuLinkItem[] = [
  { href: 'https://www.joongang.co.kr/plus/contents/business', label: 'Leader&Reader' },
  { href: 'https://www.joongang.co.kr/plus/contents/society', label: '세상과 함께' },
  { href: 'https://www.joongang.co.kr/plus/contents/money', label: '돈 버는 재미' },
  { href: 'https://www.joongang.co.kr/plus/contents/culture', label: '마음 챙기기' },
  { href: 'https://www.joongang.co.kr/plus/contents/family', label: '가족과 함께' },
  { href: 'https://www.joongang.co.kr/plus/contents/lifestyle', label: '쉴 땐 뭐하지' },
];

const footerQuickLinks: MegaMenuLinkItem[] = [
  { href: 'https://www.joongang.co.kr/trend', label: '트렌드 뉴스' },
  { href: 'https://www.joongang.co.kr/brandnews', label: '브랜드뉴스' },
  { href: 'https://weather.joongang.co.kr', label: '날씨' },
  { href: 'https://www.joongang.co.kr/reporter', label: '기자' },
  { href: 'https://bbs.joongang.co.kr/jebo', label: '제보' },
  { href: 'https://www.joongang.co.kr/replica/guides', label: '지면보기 이용안내' },
  { href: 'https://subscribe.joins.com/', label: '신문 구독신청', ext: true },
  { href: 'https://jmembership.joins.com/', label: '중앙멤버십', ext: true },
  { href: 'https://www.joongang.co.kr/etc/brand_intro', label: 'The JoongAng 브랜드' },
  { href: 'https://www.joongang.co.kr/customercenter', label: '고객센터', extraClass: 'lg_hidden' },
  { href: 'https://www.joongang.co.kr/guides', label: '더중앙 이용안내', extraClass: 'lg_hidden' },
  { href: 'https://www.joongang.co.kr/joongangai', label: 'AI+ 중앙일보', withNew: true },
];

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
          <MegaMenuNavigation
            opinionLinks={opinionLinks}
            newsLinks={newsLinks}
            specialLinks={specialLinks}
            packageLinks={packageLinks}
            multimediaLinks={multimediaLinks}
            intlLinks={intlLinks}
            plusExploreLinks={plusExploreLinks}
            footerQuickLinks={footerQuickLinks}
          />
          <MegaMenuMobileFooter />
        </div>
        <MegaMenuCloseButton onClose={onClose} />
      </div>
    </div>
  );
}
