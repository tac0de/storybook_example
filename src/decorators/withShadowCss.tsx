import * as React from 'react';
import { createRoot } from 'react-dom/client';
/** Vite dev css 제거 (항상) */
function stripViteDevCss(root: Document | ShadowRoot) {
  for (const el of root.querySelectorAll('style[data-vite-dev-id]')) {
    el.remove();
  }
  for (const el of root.querySelectorAll('link[rel="stylesheet"][data-vite-dev-id]')) {
    el.remove();
  }
}

/** 외부 CSS 링크 주입 */
function injectLinks(
  root: Document | ShadowRoot,
  hrefs: string[],
  prefix = 'sb-css',
  bodyClass?: string // 👈 추가
) {
  const container = root instanceof Document ? root.head : root;
  const ids: string[] = [];

  for (const href of hrefs) {
    const id = `${prefix}-${btoa(href)}`;
    ids.push(id);
    if (container.querySelector(`#${CSS.escape(id)}`)) continue;

    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = href;
    container.appendChild(link);
  }

  // 👇 Document일 때만 bodyClass 적용
  if (root instanceof Document && bodyClass) {
    root.body.classList.add(...bodyClass.split(/\s+/).filter(Boolean));
  }

  return () => {
    for (const id of ids) {
      container.querySelector(`#${CSS.escape(id)}`)?.remove();
    }
    if (root instanceof Document && bodyClass) {
      root.body.classList.remove(...bodyClass.split(/\s+/).filter(Boolean));
    }
  };
}

/** Docs 전용 ShadowRoot 마운트 (body 기반 CSS 대응) */
function ShadowMount({
  hrefs,
  bodyClass,
  children,
}: {
  hrefs: string[];
  bodyClass?: string;
  children: React.ReactNode;
}) {
  const hostRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const host = hostRef.current!;
    const shadow = host.attachShadow({ mode: 'open' });

    // 1) Vite dev css 제거
    stripViteDevCss(shadow);
    // 2) 외부 css 주입
    const clean = injectLinks(shadow, hrefs, 'shadow-css');
    // 3) body 셀렉터 대응
    const body = document.createElement('body');
    if (bodyClass) body.className = bodyClass;
    shadow.appendChild(body);

    const root = createRoot(body);
    root.render(<>{children}</>);

    return () => {
      // Defer unmount to avoid race condition during render
      setTimeout(() => {
        root.unmount();
      }, 0);
      clean();
      shadow.contains(body) && shadow.removeChild(body);
    };
    // hrefs/bodyClass만 의존: children은 Root가 관리
  }, [hrefs, bodyClass, children]);

  return <div ref={hostRef} />;
}

/**
 * 공개 데코레이터
 * - mode: 'auto-docs-shadow' (기본) → Docs 에서 ShadowRoot, 그 외 DOM
 */
export function withCss({
  hrefs,
  bodyClass,
  mode = 'auto-docs-shadow',
}: {
  hrefs: string[];
  bodyClass?: string;
  mode?: 'auto-docs-shadow' | 'dom';
  keep?: (string | RegExp)[]; // 👈 허용할 vite dev css
}) {
  return function Decorator(Story: any, ctx: any) {
    const isDocs = ctx?.viewMode === 'docs';
    const useShadow = mode === 'auto-docs-shadow' ? isDocs : false;

    React.useEffect(() => {
      if (!useShadow) {
        // DOM 경로: 항상 vite dev css 제거 후 외부 css 주입
        stripViteDevCss(document);
        const clean = injectLinks(document, hrefs, 'sb-css', bodyClass);
        return () => clean();
      }
      return undefined;
    }, [useShadow]);

    if (useShadow) {
      return (
        <ShadowMount hrefs={hrefs} bodyClass={bodyClass}>
          <Story />
        </ShadowMount>
      );
    }

    return <Story />;
  };
}
