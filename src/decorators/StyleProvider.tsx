// .storybook/StyleProvider.tsx
import * as React from 'react';
import type { Decorator } from '@storybook/react';

// .storybook/stylePresets.ts
export const STYLES = {
  BASE: [{ href: '/legacy.css', id: 'gmc-index' }],
  SUB: [
    { href: '/joongang-css/layout.min.css', id: 'layout' },
    { href: '/joongang-css/common.min.css', id: 'common' },
  ],
};

export const CUSTOM_STYLES = {
  HOME: `
    #storybook-preview-wrapper{ background-color: #101010 !important; }
    #storybook-preview-wrapper::before{ content: none; }
  `,
  ARTICLE: `
    #storybook-preview-wrapper{ background-color: #101010 !important; }
    .bg_bloomberg_summary,
    .bg_bloomberg_only_news,
    .bg_bloomberg_pick,
    .bg_bloomberg_only_interview,
    .bg_sp_updown,
    .bg_gmc_trend,
    .bg_bloomberg_interview,
    .bg_bloomberg_original_news,
    .bg_bloomberg_news,
    .bg_sp_updown_news,
    .bg_gmc_report,
    .bg_investor_select,
    .bg_gmc_keyword,
    .bg_gmc_guru,
    .bg_no_category {
      background-size: 100% 762px;
      background-position: center top !important;
    }
  `,
};

type StyleConfig = { href: string; id?: string };
type ProviderProps = {
  children: React.ReactNode;
  styles: StyleConfig[]; // 반드시 .css URL
  customCss?: string; // 인라인 주입할 CSS(옵션)
  customCssId?: string; // 인라인 스타일 id(옵션)
  scopeClass?: string; // ex) 'skin-gmc' (루트 네임스페이스)
  inDocs?: boolean; // Docs에서도 로드할지(기본 false)
  owner?: string; // 소유자 id(스토리 id를 권장)
};

export function StyleProvider({
  children,
  styles,
  customCss,
  customCssId,
  scopeClass,
  inDocs = false,
  owner = 'sb-style',
}: ProviderProps) {
  React.useEffect(() => {
    // viewMode 감지
    const params = new URLSearchParams(window.location.search);
    const isDocs = (params.get('viewMode') ?? 'story') === 'docs';
    let initialized = false;
    let createdStyle: HTMLStyleElement | null = null;
    const createdLinks: HTMLLinkElement[] = [];

    // 실행하지 않을 조건이라도, 아래에서 항상 cleanup 함수를 "반환"해야 함
    const shouldRun = !(isDocs && !inDocs);

    if (shouldRun) {
      const viteCSS = Array.from(document.querySelectorAll<HTMLStyleElement>('style[data-vite-dev-id]'));
      for (const style of viteCSS) {
        style.remove();
      }

      const attach = ({ href, id }: StyleConfig) => {
        if (!/\.css(\?|$)/.test(href)) {
          // SCSS 금지: 반드시 CSS만

          console.warn('[StyleProvider] Only .css is supported. Skipped:', href);
          return;
        }
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.id = id ?? `${owner}-${btoa(href)}`;
        link.dataset.styleOwner = owner;

        document.head.appendChild(link);
        createdLinks.push(link);
      };

      styles.forEach(attach);

      if (customCss && customCssId) {
        const style = document.createElement('style');
        style.id = customCssId;
        style.textContent = customCss;
        style.dataset.styleOwner = owner;
        document.head.appendChild(style);
        createdStyle = style;
      }

      // 2) scope class
      const root = document.getElementById('storybook-root') ?? document.body;
      if (scopeClass) root.classList.add(scopeClass);
      initialized = true;
    }

    // ✅ 모든 경로에서 동일하게 cleanup 함수 반환 (일관성 OK)
    return () => {
      // 실행 안 했으면 바로 빠져나감 (no-empty-function 회피)
      if (!initialized) return;

      const root = document.getElementById('storybook-root') ?? document.body;
      if (scopeClass) root.classList.remove(scopeClass);

      if (createdStyle) {
        createdStyle.remove();
        createdStyle = null;
      }

      createdLinks.forEach(l => {
        l.disabled = true;
        const cleanup = () => {
          l.remove();
        };
        window.setTimeout(cleanup, 3000);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(styles), customCss, customCssId, scopeClass, inDocs, owner]);

  return <>{children}</>;
}

/** Storybook 데코레이터로도 편하게 쓰기 */
export const withStyleProvider =
  (styles: StyleConfig[], opts?: Omit<ProviderProps, 'children' | 'styles'>): Decorator =>
  (Story, ctx) => (
    <StyleProvider
      styles={styles}
      owner={ctx.id}
      inDocs={opts?.inDocs}
      scopeClass={opts?.scopeClass}
      customCss={opts?.customCss}
      customCssId={opts?.customCssId}
    >
      <Story />
    </StyleProvider>
  );
