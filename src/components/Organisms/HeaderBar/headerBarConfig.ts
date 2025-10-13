import type { HeaderBarVariant } from './HeaderBar';

export type HeaderBarVariantConfig = {
  rootClass: string;
  rightClass: string;
  navClass: string | null;
  optionClass: string | null;
  showAuth: boolean;
  wrapOptionArea: boolean;
};

export const HEADER_BAR_VARIANT_CONFIG: Record<HeaderBarVariant, HeaderBarVariantConfig> = {
  default: {
    rootClass: 'header_wrap',
    rightClass: 'header_area flex_sm_column_reverse flex_md_column_reverse',
    navClass: 'header_nav',
    optionClass: null,
    showAuth: false,
    wrapOptionArea: false,
  },
  plus: {
    rootClass: 'header_wrap',
    rightClass: 'header_area flex_sm_column_reverse flex_md_column_reverse',
    navClass: 'header_nav',
    optionClass: null,
    showAuth: false,
    wrapOptionArea: false,
  },
  sub: {
    rootClass: 'uh',
    rightClass: 'header_right_area',
    navClass: null,
    optionClass: 'header_option_area',
    showAuth: true,
    wrapOptionArea: true,
  },
  'plus-sub': {
    rootClass: 'uh',
    rightClass: 'header_right_area',
    navClass: null,
    optionClass: 'header_option_area',
    showAuth: true,
    wrapOptionArea: true,
  },
};
