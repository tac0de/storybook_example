// components/Organisms/HeaderBar/BrandLogo.tsx
import * as React from 'react';

type Props = {
  emblem60Url?: string;
  logoUrl: string;
  homeHref: string;
};

function BrandLogo({ emblem60Url, logoUrl, homeHref }: Props) {
  return (
    <h1 className="logo">
      {emblem60Url && (
        <a href={emblem60Url} aria-label="중앙일보 60주년 선포페이지">
          <span className="emblem">
            <i className="ico_emblem60" role="img" aria-label="60주년" />
          </span>
        </a>
      )}
      <a href={homeHref} aria-label="중앙일보">
        <img width={249} height={86} src={logoUrl} alt="중앙일보" />
      </a>
    </h1>
  );
}

export default React.memo(BrandLogo);
