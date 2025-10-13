// src/components/Molecules/LogoGroup/LogoGroup.tsx
import classNames from 'classnames';
import { LogoAnchor } from '../../Atoms/LogoAnchor/LogoAnchor';
import { EmblemBadge } from '../../Atoms/EmblemBadge/EmblemBadge';

export type LogoGroupVariant = 'default' | 'sub' | 'plus' | 'plus-sub';

type LogoGroupStyle = {
  wrapperClass: string;
  anchorClass: string | null;
  showEmblem: boolean;
};

const LOGO_GROUP_STYLE: Record<LogoGroupVariant, LogoGroupStyle> = {
  default: {
    wrapperClass: 'logo',
    anchorClass: null,
    showEmblem: true,
  },
  sub: {
    wrapperClass: 'logo',
    anchorClass: 'logo',
    showEmblem: true,
  },
  plus: {
    wrapperClass: 'logo_plus',
    anchorClass: 'logo_plus',
    showEmblem: false,
  },
  'plus-sub': {
    wrapperClass: 'logo_plus',
    anchorClass: 'logo_plus',
    showEmblem: false,
  },
};

export type LogoGroupProps = {
  variant?: LogoGroupVariant;
  emblem60Url?: string;
  homeHref: string;
  logoUrl?: string;
  logoAlt?: string;
  emblemAriaLabel?: string;
  className?: string;
  width?: number;
  height?: number;
  renderAsH1?: boolean;
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
  renderAsH1 = true,
}: LogoGroupProps) {
  const style = LOGO_GROUP_STYLE[variant];
  const wrapperClass = classNames(style.wrapperClass, className);
  const anchorBase = style.anchorClass;
  const showEmblem = style.showEmblem && Boolean(emblem60Url);

  const mainLogo = () => {
    if (variant === 'plus' || variant === 'plus-sub') {
      return <span className="visually_hidden">{logoAlt}</span>;
    }
    if (logoUrl) {
      return <img width={width} height={height} src={logoUrl} alt={logoAlt} />;
    }
    return <span className="visually_hidden">{logoAlt}</span>;
  };

  const emblemNode =
    showEmblem && emblem60Url ? (
      <LogoAnchor href={emblem60Url} ariaLabel="중앙일보 60주년 선포페이지" baseClassName={anchorBase}>
        <EmblemBadge ariaLabel={emblemAriaLabel} />
      </LogoAnchor>
    ) : null;

  const body = (
    <>
      {emblemNode}
      <LogoAnchor href={homeHref} ariaLabel={logoAlt} baseClassName={anchorBase}>
        {mainLogo()}
      </LogoAnchor>
    </>
  );

  if (renderAsH1) {
    return <h1 className={wrapperClass}>{body}</h1>;
  }

  return <>{body}</>;
}

export default LogoGroup;
