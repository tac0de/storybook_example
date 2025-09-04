// .storybook/withCssLink.tsx
import * as React from 'react';

export const withCssLink = (href: string) => (Story: any) => {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    const id = `sb-css-${btoa(href)}`;
    let cleanup: (() => void) | undefined;

    if (document.getElementById(id)) {
      setReady(true);
    } else {
      const link = Object.assign(document.createElement('link'), {
        id,
        rel: 'stylesheet',
        href,
      }) as HTMLLinkElement;

      link.onload = () => setReady(true);
      document.head.appendChild(link);

      cleanup = () => {
        document.getElementById(id)?.remove();
      };
    }
    return cleanup; // 항상 함수 반환
  }, []);

  return (
    <div style={{ visibility: ready ? 'visible' : 'hidden' }}>
      <Story />
    </div>
  ); // FOUC 방지
};
