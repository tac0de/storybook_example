import type { Meta, StoryObj } from '@storybook/react-vite';
import MegaMenuNavigation, { type MegaMenuNavigationProps } from './MegaMenuNavigation';
import type { MegaMenuLinkItem } from '../MegaMenuLinkList/MegaMenuLinkList';
import { withCssAndShell } from '../../../../decorators/withCssAndShell';

const createLinks = (labels: string[], baseUrl: string): MegaMenuLinkItem[] =>
  labels.map(label => ({
    href: `${baseUrl}/${encodeURIComponent(label)}`,
    label,
  }));

const opinionLinks: MegaMenuLinkItem[] = [
  { href: 'https://www.joongang.co.kr/opinion/editorialcolumn', label: '사설칼럼' },
  { href: 'https://www.joongang.co.kr/opinion/debatepolllist', label: 'Hot Poll' },
  { href: 'https://www.joongang.co.kr/opinion/resetkorea', label: '리셋 코리아' },
];

const newsLinks = createLinks(['정치', '경제', '사회', '국제'], 'https://www.joongang.co.kr');

const specialLinks = createLinks(['팩플', '비크닉', '부동산', 'COOKING'], 'https://www.joongang.co.kr');

const packageLinks = createLinks(['구독패키지', '이슈패키지', '연재패키지'], 'https://www.joongang.co.kr');

const multimediaLinks = createLinks(['포토', '영상', 'J팟'], 'https://www.joongang.co.kr');

const intlLinks: MegaMenuLinkItem[] = [
  { href: 'https://koreajoongangdaily.joins.com', label: 'ENG', ext: true },
  { href: 'https://chinese.joins.com', label: '中文', ext: true },
  { href: 'https://japanese.joins.com', label: '日文', ext: true },
];

const plusExploreLinks = createLinks(
  ['Leader&Reader', '세상과 함께', '돈 버는 재미'],
  'https://www.joongang.co.kr/plus'
);

const footerQuickLinks: MegaMenuLinkItem[] = [
  { href: 'https://www.joongang.co.kr/trend', label: '트렌드 뉴스' },
  { href: 'https://www.joongang.co.kr/brandnews', label: '브랜드뉴스' },
  { href: 'https://www.joongang.co.kr/joongangai', label: 'AI+ 중앙일보', withNew: true },
];

const meta: Meta<typeof MegaMenuNavigation> = {
  title: 'Molecules/MegaMenu/MegaMenuNavigation',
  component: MegaMenuNavigation,
  tags: ['autodocs'],
  args: {
    opinionLinks,
    newsLinks,
    specialLinks,
    packageLinks,
    multimediaLinks,
    intlLinks,
    plusExploreLinks,
    footerQuickLinks,
  } satisfies MegaMenuNavigationProps,
  parameters: { layout: 'fullscreen' },
  decorators: [
    withCssAndShell({
      hrefs: ['/joongang-css/index.min.css'],
      structure: 'div.full_popup.menu_popup.show',
      bodyClass: ['index'],
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof MegaMenuNavigation>;

export const Default: Story = {};
