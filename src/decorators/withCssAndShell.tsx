// .storybook/withCssAndShell.tsx
import * as React from 'react';
import type { Decorator } from '@storybook/react';

/* ================================
 * Types
 * ================================ */

type BodyClass = string | string[];
type AllowPolicy = 'none' | 'all' | (string & {});
export type WithCssAndShellOpts = {
  hrefs?: string[];
  bodyClass?: BodyClass;
  inlineCss?: string;
  allow?: AllowPolicy;
  structure?: string; // ex) 'div#root > section.header_wrap'
};
type Tag = keyof React.JSX.IntrinsicElements;

/* ================================
 * Helpers (no hooks)
 * ================================ */

const DEV_SELECTOR = 'style[data-vite-dev-id],link[rel="stylesheet"][data-vite-dev-id]';

function toArray(x?: BodyClass): string[] {
  if (Array.isArray(x)) return x;
  if (x) return [x];
  return [];
}

function linkId(href: string): string {
  return `sb-css-${btoa(href)}`;
}

function isDevNode(n: Node): n is HTMLStyleElement | HTMLLinkElement {
  return (
    (n instanceof HTMLStyleElement || (n instanceof HTMLLinkElement && n.rel === 'stylesheet')) &&
    (n as Element).hasAttribute('data-vite-dev-id')
  );
}

function setEnabled(el: HTMLStyleElement | HTMLLinkElement, on: boolean): void {
  try {
    (el as unknown as { disabled: boolean }).disabled = !on;
  } catch {
    /* intentional no-op */
  }
}

function collectDocs(): Document[] {
  const docs: Document[] = [document];
  const frames = document.querySelectorAll('iframe');
  for (const f of Array.from(frames)) {
    try {
      if (f instanceof HTMLIFrameElement && f.contentDocument) {
        docs.push(f.contentDocument);
      }
    } catch {
      /* cross-origin iframes are ignored */
    }
  }
  return docs;
}

/** 🔧 비트연산 없이 간단 해시 (eslint no-bitwise 우회) */
function hashCss(s: string): string {
  let h = 1;
  const MOD = 9007199254740991; // Number.MAX_SAFE_INTEGER
  for (let i = 0; i < s.length; i++) {
    h = (h * 131 + s.charCodeAt(i)) % MOD;
  }
  return Math.floor(h).toString(36);
}

/** 🔧 파일명 기준 허용 매칭 */
function buildAllowFn(allow: AllowPolicy | undefined): (el: Element) => boolean {
  if (!allow || allow === 'none') return () => false;
  if (allow === 'all') return () => true;

  if (typeof allow === 'string') {
    const clean = allow.trim().replace(/[?#].*$/, '');
    const seg = clean.split('/').filter(Boolean);
    const fileToken = seg.length ? seg[seg.length - 1] : clean;
    if (!fileToken) return () => false;

    return (el: Element) => {
      const devId = el.getAttribute('data-vite-dev-id') || '';
      const href = el instanceof HTMLLinkElement ? el.href || '' : '';
      return devId.includes(fileToken) || href.includes(fileToken);
    };
  }

  return () => false;
}

/* ================================
 * Structure → Wrappers
 * ================================ */

type WrapperObj = {
  tag: Tag;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  ['data-testid']?: string;
};

/** 'div > section.hello#sec' → [{tag:'div'}, {tag:'section', className:'hello', id:'sec'}] */
function parseStructure(structure: string, defaultTag: Tag = 'div'): WrapperObj[] {
  const parts = structure
    .split('>')
    .map(s => s.trim())
    .filter(Boolean);

  const wrappers: WrapperObj[] = [];
  for (const p of parts) {
    let rest = p;
    let tag: Tag = defaultTag;
    let id: string | undefined;
    const classes: string[] = [];

    // id
    const idIdx = rest.indexOf('#');
    if (idIdx >= 0) {
      const after = rest.slice(idIdx + 1);
      const idToken = after.split('.')[0] || '';
      id = idToken || undefined;
      rest = rest.replace(`#${idToken}`, '');
    }

    // tag
    const [firstToken] = rest.split('.');
    if (firstToken && firstToken !== '' && !firstToken.startsWith('.')) {
      tag = firstToken as Tag;
      rest = rest.slice(firstToken.length);
    }

    // classes
    if (rest.includes('.')) {
      const cls = rest.split('.').filter(Boolean);
      classes.push(...cls);
    }

    wrappers.push({
      tag,
      id,
      className: classes.length ? classes.join(' ') : undefined,
    });
  }
  return wrappers;
}

/* ================================
 * Inline CSS applier (selector → element.style)
 * ================================ */

function parseSelectors(raw: string): string[] {
  return raw
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
}

function parseDecls(raw: string): Array<readonly [string, string]> {
  return raw
    .split(';')
    .map(s => s.trim())
    .filter(Boolean)
    .map(pair => {
      const idx = pair.indexOf(':');
      if (idx <= 0) return null;
      const prop = pair.slice(0, idx).trim();
      const val = pair.slice(idx + 1).trim();
      if (!prop || !val) return null;
      return [prop, val] as const;
    })
    .filter(Boolean) as Array<readonly [string, string]>;
}

/**
 * - 여러 룰 지원: "sel { a:b; c:d } sel2, sel3 { e:f }"
 * - 선언은 element.style.setProperty 로 적용
 * - cleanup 시 기존 inline style 복원
 */
function applyInlineCssToDoc(doc: Document, css: string) {
  const cleaned = css.replace(/\/\*[\s\S]*?\*\//g, ''); // 주석 제거
  const ruleRe = /([^{}]+)\{([^}]*)\}/g;
  const touched = new Map<Element, string | null>(); // prev style attribute

  const applyDecls = (el: Element, decls: Array<readonly [string, string]>) => {
    if (!touched.has(el)) {
      touched.set(el, el.getAttribute('style'));
    }
    for (const [prop, val] of decls) {
      (el as HTMLElement).style.setProperty(prop, val);
    }
  };

  let m: RegExpExecArray | null;
  while ((m = ruleRe.exec(cleaned))) {
    const selectors = parseSelectors(m[1]);
    const decls = parseDecls(m[2]);
    if (selectors.length === 0 || decls.length === 0) continue;

    for (const sel of selectors) {
      let nodes: Element[];
      try {
        nodes = Array.from(doc.querySelectorAll(sel));
      } catch {
        continue; // 잘못된 selector는 무시
      }
      for (const el of nodes) applyDecls(el, decls);
    }
  }

  // cleanup 함수 반환
  return () => {
    for (const [el, prev] of touched) {
      if (prev === null || prev === undefined || prev === '') {
        el.removeAttribute('style');
      } else {
        el.setAttribute('style', prev);
      }
    }
  };
}

/* ================================
 * DivShell (❌ TS children 오류 해결)
 * ================================ */

type DivShellProps = React.PropsWithChildren<{ wrappers?: WrapperObj[] }>;

const DivShell = ({ wrappers = [], children }: DivShellProps) => {
  const nested = React.useMemo(() => {
    let acc: React.ReactNode = children;
    for (let i = wrappers.length - 1; i >= 0; i--) {
      const { tag, id, className, style } = wrappers[i];
      const key = id || className || `shell-${i}`;
      const TagEl = tag as Tag;
      acc = (
        <TagEl key={key} id={id} className={className} style={style} data-testid={wrappers[i]['data-testid']}>
          {acc}
        </TagEl>
      );
    }
    return acc;
  }, [wrappers, children]);

  return <>{nested}</>;
};
DivShell.displayName = 'DivShell';

/* ================================
 * Links + BodyClass + Dev CSS gating + InlineCss applier
 * ================================ */

function WithCssPlumbing({
  hrefs = [],
  bodyClass,
  allow,
  inlineCss,
  children,
}: Required<Pick<WithCssAndShellOpts, 'hrefs' | 'bodyClass' | 'allow' | 'inlineCss'>> & {
  children: React.ReactNode;
}) {
  const hrefsMemo = React.useMemo(() => hrefs.slice(), [hrefs]);
  const bodyClasses = React.useMemo(() => toArray(bodyClass), [bodyClass]);
  const allowFn = React.useMemo(() => buildAllowFn(allow), [allow]);
  const allowKey = React.useMemo(() => {
    if (!allow || allow === 'none' || allow === 'all') return allow || 'none';
    if (allow === 'module') return 'module';
    return `file:${String(allow)}`;
  }, [allow]);
  const inlineCssTrim = React.useMemo(() => (inlineCss || '').trim(), [inlineCss]);
  const inlineHash = React.useMemo(() => (inlineCssTrim ? hashCss(inlineCssTrim) : ''), [inlineCssTrim]);

  React.useEffect(() => {
    const addedLinks = new Map<Document, string[]>();
    const addedClasses = new Map<Document, string[]>();
    const inlineCleanups = new Map<Document, (() => void) | undefined>();
    const devObservers: MutationObserver[] = [];

    const ensureLink = (doc: Document, href: string) => {
      const id = linkId(href);
      if (doc.getElementById(id)) return;
      const link = doc.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = href;
      link.crossOrigin = 'anonymous';
      doc.head?.appendChild(link);
      const arr = addedLinks.get(doc) ?? [];
      arr.push(id);
      addedLinks.set(doc, arr);
    };

    const applyBody = (doc: Document) => {
      if (!doc.body || bodyClasses.length === 0) return;
      const applied: string[] = [];
      for (const cls of bodyClasses) {
        if (!doc.body.classList.contains(cls)) {
          doc.body.classList.add(cls);
          applied.push(cls);
        }
      }
      if (applied.length > 0) addedClasses.set(doc, applied);
    };

    const gateNow = (doc: Document) => {
      const devs = doc.querySelectorAll<HTMLElement>(DEV_SELECTOR);
      for (const el of Array.from(devs)) {
        setEnabled(el as HTMLStyleElement | HTMLLinkElement, allowFn(el));
      }
    };

    const onDevMutations = (muts: MutationRecord[], _observer: MutationObserver) => {
      for (const m of muts) {
        m.addedNodes.forEach(n => {
          if (isDevNode(n)) setEnabled(n, allowFn(n));
        });
      }
    };

    const observeDev = (doc: Document) => {
      try {
        const mo = new MutationObserver(onDevMutations);
        mo.observe(doc.head || doc, { childList: true, subtree: true });
        devObservers.push(mo);
      } catch {
        /* noop */
      }
    };

    const applyDoc = (doc: Document) => {
      for (const href of hrefsMemo) ensureLink(doc, href);
      applyBody(doc);
      gateNow(doc);
      observeDev(doc);

      if (inlineCssTrim) {
        try {
          const cleanup = applyInlineCssToDoc(doc, inlineCssTrim);
          inlineCleanups.set(doc, cleanup);
        } catch {
          inlineCleanups.set(doc, undefined);
        }
      }
    };

    for (const d of collectDocs()) applyDoc(d);

    let iframeObs: MutationObserver | undefined;
    const handleIframeNode = (n: Node) => {
      if (!(n instanceof HTMLIFrameElement)) return;
      const run = () => {
        try {
          if (n.contentDocument) applyDoc(n.contentDocument);
        } catch {
          /* noop */
        }
      };
      run();
      try {
        n.addEventListener('load', run, { once: true });
      } catch {
        /* noop */
      }
    };

    try {
      iframeObs = new MutationObserver(muts => {
        for (const m of muts) m.addedNodes.forEach(handleIframeNode);
      });
      iframeObs.observe(document.body || document, { childList: true, subtree: true });
    } catch {
      /* noop */
    }

    return () => {
      try {
        iframeObs?.disconnect();
      } catch {
        /* noop */
      }
      for (const o of devObservers) {
        try {
          o.disconnect();
        } catch {
          /* noop */
        }
      }

      for (const d of collectDocs()) {
        for (const id of addedLinks.get(d) || []) {
          try {
            d.getElementById(id)?.remove();
          } catch {
            /* noop */
          }
        }
        for (const c of addedClasses.get(d) || []) {
          try {
            d.body?.classList.remove(c);
          } catch {
            /* noop */
          }
        }
        try {
          inlineCleanups.get(d)?.();
        } catch {
          /* noop */
        }
        try {
          const devs = d.querySelectorAll<HTMLElement>(DEV_SELECTOR);
          for (const el of Array.from(devs)) setEnabled(el as HTMLStyleElement | HTMLLinkElement, true);
        } catch {
          /* noop */
        }
      }
    };
  }, [hrefsMemo, bodyClasses, allowKey, allowFn, inlineHash, inlineCssTrim]);

  return <>{children}</>;
}
WithCssPlumbing.displayName = 'WithCssPlumbing';

/* ================================
 * Public Decorator
 * ================================ */

export function withCssAndShell(opt: WithCssAndShellOpts = {}): Decorator {
  const Decor: Decorator = Story => {
    // ⚠️ useMemo 제거 (eslint react-hooks/exhaustive-deps 경고 해소)
    const wrappers = opt.structure ? parseStructure(opt.structure, 'div') : [];

    return (
      <WithCssPlumbing
        hrefs={opt.hrefs ?? []}
        bodyClass={opt.bodyClass ?? []}
        allow={opt.allow ?? 'none'}
        inlineCss={opt.inlineCss ?? ''}
      >
        <DivShell wrappers={wrappers}>
          <Story />
        </DivShell>
      </WithCssPlumbing>
    );
  };
  (Decor as unknown as { displayName: string }).displayName = 'withCssAndShell';
  return Decor;
}
