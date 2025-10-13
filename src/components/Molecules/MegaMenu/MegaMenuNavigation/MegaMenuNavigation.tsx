import MegaMenuLinkList from '../MegaMenuLinkList/MegaMenuLinkList';
import DefinitionListSection from '../../../common/DefinitionListSection';
import type { MegaMenuConfig, MegaMenuLink, MegaMenuSection } from '../../../Organisms/MegaMenu/megaMenuConfig';

export type MegaMenuNavigationProps = {
  config: MegaMenuConfig;
};

export default function MegaMenuNavigation({ config }: MegaMenuNavigationProps) {
  const primarySections: Array<{ className: string; section: MegaMenuSection }> = [
    { className: 'opinion', section: config.opinion },
    { className: 'news', section: config.news },
    { className: 'special', section: config.special },
  ];

  return (
    <nav className="nav layer_body" aria-label="메가메뉴">
      <MegaMenuNavHome />
      {primarySections.map(section => (
        <DefinitionListSection
          key={section.className}
          className={section.className}
          title={section.section.title}
          titleHref={section.section.href}
          showFoldIcon={section.section.showFoldIcon}
        >
          <MegaMenuLinkList links={section.section.links} />
        </DefinitionListSection>
      ))}
      <MegaMenuPackageSection
        packageLinks={config.packages}
        multimediaLinks={config.multimedia}
        newsletterLinks={config.newsletterLinks}
      />
      <MegaMenuInternationalSection links={config.intl} />
      <MegaMenuPlusSection
        exploreSection={config.plusExplore}
        secondaryLinks={config.plusSecondary}
        utilityLinks={config.plusUtilities}
      />
      <MegaMenuSecondaryBanner />
      <MegaMenuQuickLinks links={config.footerQuickLinks} />
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

function MegaMenuPackageSection({
  packageLinks,
  multimediaLinks,
  newsletterLinks,
}: {
  packageLinks: MegaMenuLink[];
  multimediaLinks: MegaMenuLink[];
  newsletterLinks: MegaMenuLink[];
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
      {newsletterLinks.map(link => (
        <dt key={link.href}>
          <strong>
            <a href={link.href}>{link.label}</a>
          </strong>
        </dt>
      ))}
    </dl>
  );
}

function MegaMenuInternationalSection({ links }: { links: MegaMenuLink[] }) {
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

function MegaMenuPlusSection({
  exploreSection,
  secondaryLinks,
  utilityLinks,
}: {
  exploreSection: MegaMenuSection;
  secondaryLinks: MegaMenuLink[];
  utilityLinks: MegaMenuLink[];
}) {
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
            <a href={exploreSection.href}>
              {exploreSection.title}
              <i className="ico_fold" />
            </a>
          </strong>
        </dt>
        <dd className="nav_item">
          <MegaMenuLinkList links={exploreSection.links} />
        </dd>
        {secondaryLinks.map(link => (
          <dt key={link.href}>
            <strong>
              <a href={link.href}>
                {link.label}
                <i className="ico_fold" />
              </a>
            </strong>
          </dt>
        ))}
      </dl>
      <MegaMenuLinkList links={utilityLinks} />
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

function MegaMenuQuickLinks({ links }: { links: MegaMenuLink[] }) {
  return <MegaMenuLinkList links={links} wrapWithStrong />;
}
