// .storybook/withCssLinks.tsx
import * as React from 'react';

export const withCssLinks = (hrefs: string[]) => (Story: any) => {
  const [ready, setReady] = React.useState(false);

  const hrefsKey = hrefs.join('|');
  React.useEffect(() => {
    const ids: string[] = [];
    let mounted = true;

    const ensureLink = (href: string) => {
      const id = `sb-css-${btoa(href)}`;
      ids.push(id);

      if (document.getElementById(id)) return;

      const link = Object.assign(document.createElement('link'), {
        id,
        rel: 'stylesheet',
        href,
      }) as HTMLLinkElement;

      link.onload = () => mounted && setReady(true);
      link.onerror = () => mounted && setReady(true);

      document.head.appendChild(link);
    };

    hrefs.forEach(ensureLink);

    // 이미 로드된 경우 대비
    setReady(true);

    return () => {
      mounted = false;
      ids.forEach(id => {
        document.getElementById(id)?.remove();
      });
    };
  }, [hrefsKey]);

  return (
    <div style={{ visibility: ready ? 'visible' : 'hidden' }}>
      <Story />
    </div>
  ); // FOUC 방지
};
