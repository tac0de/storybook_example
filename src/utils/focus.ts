const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(',');

const hasWindow = typeof window !== 'undefined';
const defaultDocument = typeof document !== 'undefined' ? document : null;

export interface GetFocusableElementsOptions {
  includeRoot?: boolean;
  filter?: (element: HTMLElement) => boolean;
}

function isVisible(element: HTMLElement): boolean {
  if (!hasWindow) return true;
  if (element.hidden) return false;
  const style = window.getComputedStyle(element);
  if (style.display === 'none' || style.visibility === 'hidden') {
    return false;
  }
  return true;
}

export function getFocusableElements(root: HTMLElement, options: GetFocusableElementsOptions = {}): HTMLElement[] {
  if (!hasWindow) {
    return [];
  }
  const nodes = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
  if (options.includeRoot && root.matches?.(FOCUSABLE_SELECTOR)) {
    nodes.unshift(root);
  }

  const { filter } = options;

  return nodes.filter(element => {
    if (!isVisible(element)) return false;
    if (element.hasAttribute('disabled')) return false;
    if (filter && !filter(element)) return false;
    return true;
  });
}

type FocusElementOptions = Parameters<HTMLElement['focus']>[0];

export function focusElement(element: HTMLElement, options?: FocusElementOptions): boolean {
  if (!element) {
    return false;
  }
  try {
    element.focus(options);
    return defaultDocument?.activeElement === element;
  } catch {
    return false;
  }
}
