export type MegaMenuLink = {
  href: string;
  label: string;
  ext?: boolean;
  extraClass?: string;
  withNew?: boolean;
};

export type MegaMenuSection = {
  title: string;
  href?: string;
  showFoldIcon?: boolean;
  links: MegaMenuLink[];
};

export type MegaMenuConfig = {
  opinion: MegaMenuSection;
  news: MegaMenuSection;
  special: MegaMenuSection;
  packages: MegaMenuLink[];
  multimedia: MegaMenuLink[];
  newsletterLinks: MegaMenuLink[];
  intl: MegaMenuLink[];
  plusExplore: MegaMenuSection;
  plusSecondary: MegaMenuLink[];
  plusUtilities: MegaMenuLink[];
  footerQuickLinks: MegaMenuLink[];
};

export type RawMegaMenuLink =
  | [label: string, href: string]
  | {
      label: string;
      href: string;
      ext?: boolean;
      extraClass?: string;
      withNew?: boolean;
    };

export type BaseLinkEntry =
  | string
  | {
      path: string;
      ext?: boolean;
      extraClass?: string;
      withNew?: boolean;
    };

export type MegaMenuLinkEntries = Record<string, BaseLinkEntry>;

export function makeLinks(descriptors: RawMegaMenuLink[]): MegaMenuLink[] {
  return descriptors.map(descriptor =>
    Array.isArray(descriptor)
      ? { label: descriptor[0], href: descriptor[1] }
      : {
          label: descriptor.label,
          href: descriptor.href,
          ext: descriptor.ext,
          extraClass: descriptor.extraClass,
          withNew: descriptor.withNew,
        }
  );
}

export function linksFromBase(baseHref: string, entries: MegaMenuLinkEntries): MegaMenuLink[] {
  return Object.entries(entries).map(([label, entry]) => {
    if (typeof entry === 'string') {
      return { label, href: joinUrl(baseHref, entry) };
    }
    const { path, ext, extraClass, withNew } = entry;
    return {
      label,
      href: joinUrl(baseHref, path),
      ext,
      extraClass,
      withNew,
    };
  });
}

export type MegaMenuSectionRecipe = {
  title: string;
  href?: string;
  showFoldIcon?: boolean;
  links: MegaMenuLink[];
};

export function makeSection({ title, href, showFoldIcon, links }: MegaMenuSectionRecipe): MegaMenuSection {
  return { title, href, showFoldIcon, links };
}

export type MegaMenuConfigRecipe = MegaMenuConfig;

export function createMegaMenuConfig(recipe: MegaMenuConfigRecipe): MegaMenuConfig {
  return recipe;
}

function joinUrl(base: string, path: string) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  const normalizedBase = base.replace(/\/$/, '');
  if (!path) return normalizedBase;
  if (path.startsWith('/')) {
    return `${normalizedBase}${path}`;
  }
  return `${normalizedBase}/${path}`;
}
