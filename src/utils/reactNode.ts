import type { ReactNode } from 'react';

export function maybeWrap(children: ReactNode, wrapper?: (content: ReactNode) => ReactNode) {
  if (children === null || children === undefined) {
    return null;
  }
  return wrapper ? wrapper(children) : children;
}

export function composeChildren(...nodes: Array<ReactNode | null | undefined>): ReactNode | null {
  const filtered = nodes.filter(Boolean);
  if (!filtered.length) {
    return null;
  }
  if (filtered.length === 1) {
    return filtered[0] ?? null;
  }
  return filtered as unknown as ReactNode;
}
