import MegaMenuLinkList, { type MegaMenuLinkItem } from '../MegaMenuLinkList/MegaMenuLinkList';

export type MegaMenuNavigationProps = {
  opinionLinks: MegaMenuLinkItem[];
  newsLinks: MegaMenuLinkItem[];
  specialLinks: MegaMenuLinkItem[];
  packageLinks: MegaMenuLinkItem[];
  multimediaLinks: MegaMenuLinkItem[];
  intlLinks: MegaMenuLinkItem[];
  plusExploreLinks: MegaMenuLinkItem[];
  footerQuickLinks: MegaMenuLinkItem[];
};

const plusUtilityLinks: MegaMenuLinkItem[] = [
  { href: 'https://www.joongang.co.kr/purchase/main', label: '이용권 구매' },
  { href: 'https://www.joongang.co.kr/plus/guides', label: '서비스 활용 가이드' },
  {
    href: 'https://www.joongang.co.kr/2025brand-campaign_plus-story?thejoongang_open_browser=y',
    label: '브랜드 소개',
    withNew: true,
  },
  { href: 'https://www.joongang.co.kr/atoz/47', label: '이용안내' },
];

export default function MegaMenuNavigation({
  opinionLinks,
  newsLinks,
  specialLinks,
  packageLinks,
  multimediaLinks,
  intlLinks,
  plusExploreLinks,
  footerQuickLinks,
}: MegaMenuNavigationProps) {
  return (
    <nav className="nav layer_body" aria-label="메가메뉴">
      <MegaMenuNavHome />
      <MegaMenuNavSection
        className="opinion"
        title="오피니언"
        titleHref="https://www.joongang.co.kr/opinion"
        showFoldIcon
        links={opinionLinks}
      />
      <MegaMenuNavSection className="news" title="뉴스" links={newsLinks} />
      <MegaMenuNavSection className="special" title="스페셜" links={specialLinks} />
      <MegaMenuPackageSection packageLinks={packageLinks} multimediaLinks={multimediaLinks} />
      <MegaMenuInternationalSection links={intlLinks} />
      <MegaMenuPlusSection plusExploreLinks={plusExploreLinks} />
      <MegaMenuSecondaryBanner />
      <MegaMenuQuickLinks links={footerQuickLinks} />
    </nav>
  );
}

function MegaMenuNavHome() {
  return (
    <a href="https://www.joongang.co.kr" className="home lg_hidden">
      <strong className="logo">
        <span className="visually_hidden">The JoongAng</span>
      </strong>
      <i className="ico_fold" />
    </a>
  );
}

type MegaMenuNavSectionProps = {
  className: string;
  title: string;
  links: MegaMenuLinkItem[];
  titleHref?: string;
  showFoldIcon?: boolean;
};

function MegaMenuNavSection({ className, title, titleHref, showFoldIcon, links }: MegaMenuNavSectionProps) {
  return (
    <dl className={className}>
      <dt>
        <strong>
          {titleHref ? (
            <a href={titleHref}>
              {title}
              {showFoldIcon && <i className="ico_fold" />}
            </a>
          ) : (
            title
          )}
        </strong>
      </dt>
      <dd className="nav_item">
        <MegaMenuLinkList links={links} />
      </dd>
    </dl>
  );
}

function MegaMenuPackageSection({
  packageLinks,
  multimediaLinks,
}: {
  packageLinks: MegaMenuLinkItem[];
  multimediaLinks: MegaMenuLinkItem[];
}) {
  return (
    <dl className="package">
      <dt>
        <strong>패키지</strong>
      </dt>
      <dd className="nav_item">
        <MegaMenuLinkList links={packageLinks} />
      </dd>
      <dt>
        <strong>멀티미디어</strong>
      </dt>
      <dd className="nav_item">
        <MegaMenuLinkList links={multimediaLinks} />
      </dd>
      <dt>
        <strong>
          <a href="https://www.joongang.co.kr/newsletter">뉴스레터</a>
        </strong>
      </dt>
      <dt>
        <strong>
          <a href="https://www.joongang.co.kr/sunday">중앙SUNDAY</a>
        </strong>
      </dt>
    </dl>
  );
}

function MegaMenuInternationalSection({ links }: { links: MegaMenuLinkItem[] }) {
  return (
    <dl className="lg_hidden">
      <dt>
        <strong>International Edition</strong>
      </dt>
      <dd className="nav_item">
        <MegaMenuLinkList links={links} />
      </dd>
    </dl>
  );
}

function MegaMenuPlusSection({ plusExploreLinks }: { plusExploreLinks: MegaMenuLinkItem[] }) {
  return (
    <div className="plus">
      <a href="https://www.joongang.co.kr/plus" className="home">
        <strong className="logo_plus_white">
          <span className="visually_hidden">더 중앙 플러스</span>
        </strong>
      </a>
      <dl>
        <dt>
          <strong>
            <a href="https://www.joongang.co.kr/plus/contents">
              콘텐트 탐색
              <i className="ico_fold" />
            </a>
          </strong>
        </dt>
        <dd className="nav_item">
          <MegaMenuLinkList links={plusExploreLinks} />
        </dd>
        <dt>
          <strong>
            <a href="https://www.joongang.co.kr/plus/series">
              시리즈별 보기
              <i className="ico_fold" />
            </a>
          </strong>
        </dt>
        <dt>
          <strong>
            <a href="https://www.joongang.co.kr/plus/curation">
              큐레이션 발견
              <i className="ico_fold" />
            </a>
          </strong>
        </dt>
      </dl>
      <MegaMenuLinkList links={plusUtilityLinks} />
    </div>
  );
}

function MegaMenuSecondaryBanner() {
  return (
    <div className="banner_wrap lg_hidden" style={{ background: '#FD5F48' }}>
      <a href="https://joongang-60th.co.kr?thejoongang_open_browser=y" target="_self" rel="noreferrer">
        <img
          width={320}
          height={60}
          loading="lazy"
          src="https://img.joongang.co.kr/svcimg/1000/dataedit/202508/476_20250819072740.jpg/_ir_640x120_/"
          alt="창간60주년글로벌미디어컨퍼런스"
        />
      </a>
    </div>
  );
}

function MegaMenuQuickLinks({ links }: { links: MegaMenuLinkItem[] }) {
  return <MegaMenuLinkList links={links} wrapWithStrong />;
}
