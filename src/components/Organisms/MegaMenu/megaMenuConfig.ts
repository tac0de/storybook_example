import {
  createMegaMenuConfig,
  linksFromBase,
  makeLinks,
  makeSection,
  type MegaMenuConfig,
  type MegaMenuLink,
  type MegaMenuSection,
} from '../../../recipes/megaMenuRecipes';

export type { MegaMenuConfig, MegaMenuLink, MegaMenuSection };

const BASE = 'https://www.joongang.co.kr';
const OPINION_BASE = `${BASE}/opinion`;
const PLUS_BASE = `${BASE}/plus`;
const PLUS_CONTENT_BASE = `${PLUS_BASE}/contents`;

export const megaMenuConfig: MegaMenuConfig = createMegaMenuConfig({
  opinion: makeSection({
    title: '오피니언',
    href: OPINION_BASE,
    showFoldIcon: true,
    links: linksFromBase(OPINION_BASE, {
      사설칼럼: 'editorialcolumn',
      만평: 'satiricalcartoon',
      'Hot Poll': 'debatepolllist',
      '리셋 코리아': 'resetkorea',
      영상: 'vod',
    }),
  }),
  news: makeSection({
    title: '뉴스',
    links: linksFromBase(BASE, {
      정치: 'politics',
      경제: 'money',
      사회: 'society',
      국제: 'world',
      문화: 'culture',
      스포츠: 'sports',
      라이프: 'lifestyle',
      피플: 'people',
    }),
  }),
  special: makeSection({
    title: '스페셜',
    links: linksFromBase(BASE, {
      팩플: 'factpl',
      비크닉: 'bicnic',
      부동산: 'realestate',
      COOKING: 'cooking',
      '디지털 스페셜': 'digitalspecial',
      여행레저: 'travel',
      '더 북한': 'nk',
      '더 차이나': 'thechina',
      '더,마음': 'themaum',
      '더 하이엔드': 'thehighend',
      '더,오래': 'thelong',
      '더 헬스': 'thehealth',
    }),
  }),
  packages: linksFromBase(BASE, {
    구독패키지: 'subscription',
    이슈패키지: 'issue',
    연재패키지: 'series',
  }),
  multimedia: linksFromBase(BASE, {
    포토: 'photo',
    영상: 'vod',
    J팟: 'jpod',
  }),
  newsletterLinks: linksFromBase(BASE, {
    뉴스레터: 'newsletter',
    중앙SUNDAY: 'sunday',
  }),
  intl: makeLinks([
    { label: 'ENG', href: 'https://koreajoongangdaily.joins.com/', ext: true },
    { label: '中文', href: 'https://chinese.joins.com/', ext: true },
    { label: '日文', href: 'https://japanese.joins.com/', ext: true },
  ]),
  plusExplore: makeSection({
    title: '콘텐트 탐색',
    href: `${PLUS_CONTENT_BASE}`,
    showFoldIcon: true,
    links: linksFromBase(PLUS_CONTENT_BASE, {
      'Leader&Reader': 'business',
      '세상과 함께': 'society',
      '돈 버는 재미': 'money',
      '마음 챙기기': 'culture',
      '가족과 함께': 'family',
      '쉴 땐 뭐하지': 'lifestyle',
    }),
  }),
  plusSecondary: linksFromBase(PLUS_BASE, {
    '시리즈별 보기': 'series',
    '큐레이션 발견': 'curation',
  }),
  plusUtilities: makeLinks([
    { label: '이용권 구매', href: `${BASE}/purchase/main` },
    { label: '서비스 활용 가이드', href: `${PLUS_BASE}/guides` },
    {
      label: '브랜드 소개',
      href: 'https://www.joongang.co.kr/2025brand-campaign_plus-story?thejoongang_open_browser=y',
      withNew: true,
    },
    { label: '이용안내', href: `${BASE}/atoz/47` },
  ]),
  footerQuickLinks: makeLinks([
    { label: '트렌드 뉴스', href: `${BASE}/trend` },
    { label: '브랜드뉴스', href: `${BASE}/brandnews` },
    { label: '날씨', href: 'https://weather.joongang.co.kr' },
    { label: '기자', href: `${BASE}/reporter` },
    { label: '제보', href: 'https://bbs.joongang.co.kr/jebo' },
    { label: '지면보기 이용안내', href: `${BASE}/replica/guides` },
    { label: '신문 구독신청', href: 'https://subscribe.joins.com/', ext: true },
    { label: '중앙멤버십', href: 'https://jmembership.joins.com/', ext: true },
    { label: 'The JoongAng 브랜드', href: `${BASE}/etc/brand_intro` },
    { label: '고객센터', href: `${BASE}/customercenter`, extraClass: 'lg_hidden' },
    { label: '더중앙 이용안내', href: `${BASE}/guides`, extraClass: 'lg_hidden' },
    { label: 'AI+ 중앙일보', href: `${BASE}/joongangai`, withNew: true },
  ]),
});
