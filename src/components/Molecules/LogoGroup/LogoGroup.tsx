// src/components/Molecules/LogoGroup/LogoGroup.tsx
import classNames from 'classnames';

export type LogoGroupProps = {
  variant?: 'default' | 'plus';
  emblem60Url?: string;
  homeHref: string;
  logoUrl?: string;
  logoAlt?: string;
  emblemAriaLabel?: string;
  className?: string;
  width?: number;
  height?: number;
  renderAsH1?: boolean; // h1 렌더링 여부 제어 prop 추가
};

export function LogoGroup({
  variant = 'default',
  emblem60Url,
  homeHref,
  logoUrl,
  logoAlt = '중앙일보',
  emblemAriaLabel = '60주년',
  className,
  width = 249,
  height = 86,
  renderAsH1 = true, // 기본값은 true
}: LogoGroupProps) {
  const content = (
    <>
      {variant === 'plus' ? (
        <a href={homeHref}>
          <span className="visually_hidden">{logoAlt}</span>
        </a>
      ) : (
        <>
          {emblem60Url && (
            <a href={emblem60Url} className="logo" aria-label="중앙일보 60주년 선포페이지">
              <span className="emblem">
                <i className="ico_emblem60" role="img" aria-label={emblemAriaLabel} />
              </span>
            </a>
          )}
          <a href={homeHref} className="logo" aria-label="중앙일보">
            <img width={width} height={height} src={logoUrl} alt={logoAlt} />
          </a>
        </>
      )}
    </>
  );

  if (renderAsH1) {
    const h1Class = variant === 'plus' ? 'logo_plus' : 'logo';
    return <h1 className={classNames(h1Class, className)}>{content}</h1>;
  }

  // h1 없이 렌더링 (SubHeader용)
  return <>{content}</>;
}

export default LogoGroup;
