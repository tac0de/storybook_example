export type SearchTagLink = {
  href: string;
  label: string;
};

export type SearchTrendKeyword = {
  href: string;
  label: string;
  eventCategory: string;
  eventAction: string;
  eventLabel: string;
};

export type SearchLayerConfig = {
  updatedAt: string;
  aiTags: {
    desktop: SearchTagLink[];
    carousel: SearchTagLink[][];
  };
  trendKeywords: SearchTrendKeyword[];
};

export type RawTag =
  | string
  | [label: string, href: string]
  | {
      label: string;
      href?: string;
      query?: string;
    };

export interface TagRecipeOptions {
  baseHref?: string;
  queryParam?: string;
}

const encode = (value: string) => encodeURIComponent(value.trim());

function buildHref(label: string, options: TagRecipeOptions, explicit?: string) {
  if (explicit) return explicit;
  const { baseHref, queryParam = 'keyword' } = options;
  if (!baseHref) return '#';
  return `${baseHref}?${queryParam}=${encode(label)}`;
}

export function buildSearchTags(tags: RawTag[], options: TagRecipeOptions = {}): SearchTagLink[] {
  return tags.map(tag => {
    if (typeof tag === 'string') {
      return {
        label: tag,
        href: buildHref(tag, options),
      };
    }

    if (Array.isArray(tag)) {
      const [label, href] = tag;
      return { label, href };
    }

    const { label, href: explicitHref, query } = tag;
    const href = buildHref(label, options, explicitHref ?? query);

    return { label, href };
  });
}

export type RawTrend =
  | string
  | {
      label: string;
      href?: string;
      query?: string;
      icon?: string;
      eventLabel?: string;
    };

export interface TrendRecipeOptions extends TagRecipeOptions {
  eventCategory?: string;
  eventAction?: string;
}

export function buildTrendKeywords(trends: RawTrend[], options: TrendRecipeOptions = {}): SearchTrendKeyword[] {
  const { eventCategory = 'area:중앙|홈', eventAction = 'move:search_검색창' } = options;

  return trends.map(trend => {
    if (typeof trend === 'string') {
      const label = trend;
      return {
        label,
        href: buildHref(label, options),
        eventCategory,
        eventAction,
        eventLabel: `트렌드 키워드_${label}`,
      };
    }

    const { label, href: explicitHref, query, icon, eventLabel: customEventLabel } = trend;
    const iconPrefix = icon ? `${icon} ` : '';
    const augmentedLabel = `${iconPrefix}${label}`.trim();
    const href = buildHref(label, options, explicitHref ?? query);
    const eventLabel = customEventLabel ?? `트렌드 키워드_${label}`;

    return {
      label: augmentedLabel,
      href,
      eventCategory,
      eventAction,
      eventLabel,
    };
  });
}

export interface SearchLayerRecipe {
  updatedAt: string;
  desktopTags: RawTag[];
  carouselSize?: number;
  trendKeywords: RawTrend[];
  searchOptions?: TagRecipeOptions;
  trendOptions?: TrendRecipeOptions;
}

export function createSearchLayerConfig(recipe: SearchLayerRecipe): SearchLayerConfig {
  const desktop = buildSearchTags(recipe.desktopTags, recipe.searchOptions);
  const chunkSize = recipe.carouselSize ?? 4;

  const carousel: SearchTagLink[][] = [];
  for (let i = 0; i < desktop.length; i += chunkSize) {
    carousel.push(desktop.slice(i, i + chunkSize));
  }

  return {
    updatedAt: recipe.updatedAt,
    aiTags: {
      desktop,
      carousel,
    },
    trendKeywords: buildTrendKeywords(recipe.trendKeywords, {
      ...recipe.searchOptions,
      ...recipe.trendOptions,
    }),
  };
}
