import * as React from 'react';

type BodyClass = string | string[];
type Opts = string[] | { hrefs?: string[]; bodyClass?: BodyClass; owner?: string };

const DEV = 'style[data-vite-dev-id],link[rel="stylesheet"][data-vite-dev-id]';
const toArr = (x?: BodyClass) => (Array.isArray(x) ? x : x ? [x] : []);
const linkId = (href: string) => `sb-css-${btoa(href)}`;
const isDev = (n: Node): n is HTMLStyleElement | HTMLLinkElement =>
  (n instanceof HTMLStyleElement || (n instanceof HTMLLinkElement && n.rel === 'stylesheet')) &&
  (n as Element).hasAttribute('data-vite-dev-id');

const folderFromUrl = (u?: string) => {
  try {
    const p = new URL(String(u), window.location.href).pathname.replace(/\/+$/, '');
    const seg = p.split('/');
    return seg.at(-2) || '';
  } catch {
    return '';
  }
};

const matchFolder = (el: Element, folder: string) => {
  const id = el.getAttribute('data-vite-dev-id') || '';
  const href = (el instanceof HTMLLinkElement && el.href) || '';
  return folder ? id.includes(folder) || href.includes(folder) : false;
};

const setEnabled = (el: HTMLStyleElement | HTMLLinkElement, on: boolean) => {
  try {
    (el as any).disabled = !on;
  } catch {}
};

function collectDocs(): Document[] {
  const docs = [document];
  document.querySelectorAll('iframe').forEach(f => {
    try {
      if (f instanceof HTMLIFrameElement && f.contentDocument) docs.push(f.contentDocument);
    } catch {}
  });
  return docs;
}

export const withCssLinks =
  (opts: Opts = []) =>
  (Story: any) => {
    const o = Array.isArray(opts) ? { hrefs: opts } : opts;
    const hrefs = o.hrefs ?? [];
    const bodyClasses = toArr(o.bodyClass);
    const folder = o.owner ? folderFromUrl(o.owner) : undefined;

    React.useEffect(() => {
      const addedLinks = new Map<Document, string[]>();
      const addedClasses = new Map<Document, string[]>();
      const devObservers: MutationObserver[] = [];

      const applyToDoc = (doc: Document) => {
        // 1) hrefs 주입
        hrefs.forEach(href => {
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
        });
        // 2) bodyClass 적용
        if (bodyClasses.length && doc.body) {
          const applied: string[] = [];
          bodyClasses.forEach(c => {
            if (!doc.body!.classList.contains(c)) {
              doc.body!.classList.add(c);
              applied.push(c);
            }
          });
          if (applied.length) addedClasses.set(doc, applied);
        }
        // 3) devCSS 토글 (owner 있으면 → 그 폴더만 활성화, 없으면 전부 비활성화)
        doc.querySelectorAll<HTMLElement>(DEV).forEach(el => {
          const allow = folder ? matchFolder(el, folder) : false;
          setEnabled(el as any, allow);
        });
      };

      // 초기 적용
      collectDocs().forEach(applyToDoc);

      // iframe 생성 감시
      const iframeObs = new MutationObserver(ms => {
        ms.forEach(m =>
          m.addedNodes.forEach(n => {
            if (!(n instanceof HTMLIFrameElement)) return;
            const onLoad = () => {
              try {
                n.contentDocument && applyToDoc(n.contentDocument);
              } catch {}
            };
            try {
              onLoad();
            } catch {}
            try {
              n.addEventListener('load', onLoad, { once: true });
            } catch {}
          })
        );
      });
      try {
        iframeObs.observe(document.body || document, { childList: true, subtree: true });
      } catch {}

      // devCSS 추가 감시
      collectDocs().forEach(doc => {
        try {
          const o = new MutationObserver(ms => {
            ms.forEach(m =>
              m.addedNodes.forEach(n => {
                if (isDev(n)) {
                  const allow = folder ? matchFolder(n, folder) : false;
                  setEnabled(n, allow);
                }
              })
            );
          });
          o.observe(doc.head || doc, { childList: true, subtree: true });
          devObservers.push(o);
        } catch {}
      });

      return () => {
        try {
          iframeObs.disconnect();
        } catch {}
        devObservers.forEach(o => {
          try {
            o.disconnect();
          } catch {}
        });
        // cleanup: 링크/클래스 제거 + dev CSS 전부 활성화 복구
        collectDocs().forEach(doc => {
          try {
            (addedLinks.get(doc) || []).forEach(id => doc.getElementById(id)?.remove());
          } catch {}
          try {
            (addedClasses.get(doc) || []).forEach(c => doc.body?.classList.remove(c));
          } catch {}
          try {
            doc.querySelectorAll<HTMLElement>(DEV).forEach(el => setEnabled(el as any, true));
          } catch {}
        });
      };
    }, [hrefs.join('|'), bodyClasses.join('|'), folder]);

    return <Story />;
  };
