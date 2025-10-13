import type { NavItem } from '../components/Molecules/NavList/NavList';
import type { HeaderBarMastheadMenuProps, HeaderBarUser } from '../components/Organisms/HeaderBar/HeaderBar';
import type { PlusShortcutProps, PlusShortcutVariant } from '../components/Molecules/PlusShortcut/PlusShortcut';

export type RawNavDescriptor =
  | string
  | [label: string, href: string]
  | {
      label: string;
      href?: string;
      active?: boolean;
      ariaLabel?: string;
    };

export interface NavRecipeOptions {
  baseHref?: string;
  slugify?: (label: string) => string;
}

const defaultSlugify = (label: string) =>
  label
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');

const DEFAULT_MASTHEAD: HeaderBarMastheadMenuProps = {
  replicaHref: 'https://www.joongang.co.kr/replica',
  loginHref: '/login',
  joinHref: '/join',
  logoutHref: '/logout',
  myNewsHref: 'https://www.joongang.co.kr/mynews',
};

export function buildNavItems(items: RawNavDescriptor[], options: NavRecipeOptions = {}): NavItem[] {
  const { baseHref, slugify = defaultSlugify } = options;

  return items.map(item => {
    if (typeof item === 'string') {
      const label = item;
      const href = baseHref ? `${baseHref}/${slugify(label)}` : '#';
      return { label, href };
    }

    if (Array.isArray(item)) {
      const [label, href] = item;
      return { label, href };
    }

    const { label, href: explicitHref, active, ariaLabel } = item;
    const href = explicitHref ?? (baseHref ? `${baseHref}/${slugify(label)}` : '#');

    return {
      label,
      href,
      active,
      ariaLabel,
    };
  });
}

export type ShortcutRecipe =
  | false
  | string
  | {
      href?: string;
      ariaLabel?: string;
      variant?: PlusShortcutVariant;
      targetBlank?: boolean;
    };

export function buildShortcut(recipe: ShortcutRecipe): PlusShortcutProps | undefined {
  if (recipe === false) {
    return undefined;
  }

  if (typeof recipe === 'string') {
    return {
      variant: 'default',
      href: recipe,
    };
  }

  return {
    variant: recipe.variant ?? 'plus',
    href: recipe.href,
    ariaLabel: recipe.ariaLabel,
    targetBlank: recipe.targetBlank,
  };
}

export type UserRecipe = boolean | Partial<HeaderBarUser>;

export function buildUser(recipe: UserRecipe): HeaderBarUser {
  if (typeof recipe === 'boolean') {
    return { loggedIn: recipe };
  }

  return {
    loggedIn: recipe.loggedIn ?? false,
  };
}

export interface MastheadRecipeOptions extends Partial<HeaderBarMastheadMenuProps> {
  enabled?: boolean;
}

export function buildMastheadMenu(options?: MastheadRecipeOptions): HeaderBarMastheadMenuProps | undefined {
  if (options?.enabled === false) {
    return undefined;
  }

  return {
    ...DEFAULT_MASTHEAD,
    ...options,
  };
}

export interface HeaderContentRecipe {
  nav?: RawNavDescriptor[];
  navOptions?: NavRecipeOptions;
  user?: UserRecipe;
  shortcut?: ShortcutRecipe;
  masthead?: MastheadRecipeOptions;
}

export function createHeaderContent(recipe: HeaderContentRecipe = {}) {
  return {
    nav: recipe.nav ? buildNavItems(recipe.nav, recipe.navOptions) : undefined,
    user: buildUser(recipe.user ?? false),
    shortcut: buildShortcut(recipe.shortcut ?? false),
    mastheadMenu: buildMastheadMenu(recipe.masthead),
  };
}
