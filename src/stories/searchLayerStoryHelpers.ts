import { withCssAndShell } from '../decorators/withCssAndShell';

type DecoratorOptions = {
  structure?: string;
  hrefs?: string[];
  bodyClass?: string[];
};

const SEARCH_LAYER_OVERLAY = 'div.layer_popup.layer_search';
const HEADER_SHELL = 'header#header.header.nav_re.emblem60.sticky_top';
const MEGA_MENU_POPUP_SHELL = `${HEADER_SHELL} > .full_popup.menu_popup.show`;
const MEGA_MENU_LAYER_SHELL = `${MEGA_MENU_POPUP_SHELL} > .layer_popup.side_nav`;
const MEGA_MENU_SCROLL_SHELL = `${MEGA_MENU_LAYER_SHELL} > .scroll`;

export function createShellDecorator(options: DecoratorOptions = {}) {
  return withCssAndShell({
    hrefs: options.hrefs ?? ['/joongang-css/index.min.css'],
    bodyClass: options.bodyClass ?? ['index'],
    ...(options.structure ? { structure: options.structure } : {}),
  });
}

export function createSearchLayerDecorator(options: DecoratorOptions = {}) {
  return createShellDecorator(options);
}

export const searchLayerBaseDecorator = createSearchLayerDecorator();
export const searchLayerOverlayDecorator = createSearchLayerDecorator({
  structure: SEARCH_LAYER_OVERLAY,
});

export const megaMenuBaseDecorator = createShellDecorator({
  structure: HEADER_SHELL,
});

export const megaMenuPopupDecorator = createShellDecorator({
  structure: MEGA_MENU_POPUP_SHELL,
});

export const megaMenuLayerDecorator = createShellDecorator({
  structure: MEGA_MENU_LAYER_SHELL,
});

export const megaMenuScrollDecorator = createShellDecorator({
  structure: MEGA_MENU_SCROLL_SHELL,
});
