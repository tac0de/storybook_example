import * as React from 'react';
import type { Decorator } from '@storybook/react';

type BodyClass = string | string[];
type AllowPolicy =
  | 'none' // ← 기본값: dev CSS 전부 끔
  | 'all' // ← dev CSS 전부 켬
  | { folders: string[] }; // ← 특정 폴더 토큰과 매칭되는 것만 켬

type CssOpts =
  | string[] // 간단: hrefs
  | {
      hrefs?: string[];
      bodyClass?: BodyClass;
      allow?: AllowPolicy;
    };

const DEV = 'style[data-vite-dev-id],link[rel="stylesheet"][data-vite-dev-id]';
const toArr = (x?: BodyClass) => (Array.isArray(x) ? x : x ? [x] : []);
const linkId = (href: string) => `sb-css-${btoa(href)}`;

const isDev = (n: Node): n is HTMLStyleElement | HTMLLinkElement =>
  (n instanceof HTMLStyleElement || (n instanceof HTMLLinkElement && n.rel === 'stylesheet')) &&
  (n as Element).hasAttribute('data-vite-dev-id');

const setEnabled = (el: HTMLStyleElement | HTMLLinkElement, on: boolean) => {
  try {
    (el as any).disabled = !on;
  } catch {}
};

const allowMatcher = (allow?: AllowPolicy) => {
  if (allow === 'all') return (_: Element) => true;
  if (allow && typeof allow === 'object' && Array.isArray(allow.folders) && allow.folders.length > 0) {
    const tokens = allow.folders;
    return (el: Element) => {
      const id = el.getAttribute('data-vite-dev-id') || '';
      const href = (el instanceof HTMLLinkElement && el.href) || '';
      return tokens.some(t => id.includes(t) || href.includes(t));
    };
  }
  // default: 'none'
  return (_: Element) => false;
};

function allDocs(): Document[] {
  const docs = [document];
  document.querySelectorAll('iframe').forEach(f => {
    try {
      if (f instanceof HTMLIFrameElement && f.contentDocument) docs.push(f.contentDocument);
    } catch {}
  });
  return docs;
}

export function withCssLinks(opts: CssOpts = []): Decorator {
  const o = Array.isArray(opts) ? { hrefs: opts } : opts;
  const hrefs = o.hrefs ?? [];
  const bodyClasses = toArr(o.bodyClass);
  const canAllow = allowMatcher(o.allow);

  const depKey = React.useMemo(
    () =>
      [
        hrefs.join('|'),
        bodyClasses.join('|'),
        // Allow 정책 키 (문자열화)
        typeof o.allow === 'string'
          ? o.allow
          : o.allow && 'folders' in o.allow
            ? `folders:${o.allow.folders.join(',')}`
            : 'none',
      ].join('::'),
    [hrefs, bodyClasses, o.allow]
  );

  React.useEffect(() => {
    const addedLinks = new Map<Document, string[]>();
    const addedClasses = new Map<Document, string[]>();
    const devObservers: MutationObserver[] = [];

    const applyDoc = (doc: Document) => {
      // 1) 외부 CSS 링크 주입
      for (const href of hrefs) {
        const id = linkId(href);
        if (!doc.getElementById(id)) {
          const link = Object.assign(doc.createElement('link'), {
            id,
            rel: 'stylesheet',
            href,
            crossOrigin: 'anonymous',
          }) as HTMLLinkElement;
          doc.head?.appendChild(link);
          (addedLinks.get(doc) ?? addedLinks.set(doc, []).get(doc)!).push(id);
        }
      }

      // 2) bodyClass 토글
      if (doc.body && bodyClasses.length) {
        const applied: string[] = [];
        for (const c of bodyClasses) {
          if (!doc.body.classList.contains(c)) {
            doc.body.classList.add(c);
            applied.push(c);
          }
        }
        if (applied.length) addedClasses.set(doc, applied);
      }

      // 3) Vite dev CSS 게이팅 (초기 스윕)
      doc.querySelectorAll<HTMLElement>(DEV).forEach(el => {
        const allow = canAllow(el);
        setEnabled(el as any, allow);
      });

      // 4) dev CSS가 동적으로 추가될 때도 즉시 게이팅
      try {
        const mo = new MutationObserver(ms => {
          for (const m of ms) {
            m.addedNodes.forEach(n => {
              if (isDev(n)) {
                const allow = canAllow(n);
                setEnabled(n, allow);
              }
            });
          }
        });
        mo.observe(doc.head || doc, { childList: true, subtree: true });
        devObservers.push(mo);
      } catch {}
    };

    // 초기 적용 (문서 + 스토리북 iframes)
    allDocs().forEach(applyDoc);

    // iframe이 나중에 생기더라도 적용
    let iframeObs: MutationObserver | undefined;
    try {
      iframeObs = new MutationObserver(ms => {
        for (const m of ms) {
          m.addedNodes.forEach(n => {
            if (n instanceof HTMLIFrameElement) {
              const run = () => n.contentDocument && applyDoc(n.contentDocument);
              try {
                run();
                n.addEventListener('load', run, { once: true });
              } catch {}
            }
          });
        }
      });
      iframeObs.observe(document.body || document, { childList: true, subtree: true });
    } catch {}

    return () => {
      try {
        iframeObs?.disconnect();
      } catch {}
      for (const mo of devObservers) {
        try {
          mo.disconnect();
        } catch {}
      }
      // 정리: 주입한 링크/클래스 제거, dev CSS 전부 재활성화
      allDocs().forEach(doc => {
        for (const id of addedLinks.get(doc) || []) {
          try {
            doc.getElementById(id)?.remove();
          } catch {}
        }
        for (const c of addedClasses.get(doc) || []) {
          try {
            doc.body?.classList.remove(c);
          } catch {}
        }
        try {
          doc.querySelectorAll<HTMLElement>(DEV).forEach(el => setEnabled(el as any, true));
        } catch {}
      });
    };
  }, [depKey, canAllow]); // eslint-friendly deps

  // 데코레이터 – 사이드이펙트만 수행하고 Story 렌더링
  return (Story: any) => <Story />;
}
