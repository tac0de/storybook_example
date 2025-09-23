export type LogoGroupProps = {
  /** 60주년 엠블럼 링크 (없으면 엠블럼 비노출) */
  emblem60Url?: string;
  /** 메인 로고 클릭 시 이동할 홈 링크 */
  homeHref: string;
  /** 메인 로고 이미지 URL */
  logoUrl: string;
  /** 메인 로고 대체텍스트 (기본: '중앙일보') */
  logoAlt?: string;
  /** 엠블럼 접근성 라벨 (기본: '60주년') */
  emblemAriaLabel?: string;
  /** 로고 컨테이너에 추가 클래스 */
  className?: string;
  /** width/height는 전역 CSS가 레이아웃을 잡더라도 SSR/CLS 예방용으로 유지 */
  width?: number;
  height?: number;
};

/**
 * 전역 CSS(.logo, .emblem, .ico_emblem60)를 그대로 사용하는 로고 그룹.
 * - 전역 스타일에 맞춘 마크업 구조만 제공합니다.
 * - 필요 시 상위에서 레이아웃을 감싸고 local SCSS로 최소 오버라이드 하세요.
 */
export function LogoGroup({
  emblem60Url,
  homeHref,
  logoUrl,
  logoAlt = '중앙일보',
  emblemAriaLabel = '60주년',
  className,
  width = 249,
  height = 86,
}: LogoGroupProps) {
  return (
    <h1 className={['logo', className].filter(Boolean).join(' ')}>
      {emblem60Url && (
        <a href={emblem60Url} aria-label="중앙일보 60주년 선포페이지">
          <span className="emblem">
            <i className="ico_emblem60" role="img" aria-label={emblemAriaLabel} />
          </span>
        </a>
      )}
      <a href={homeHref} aria-label="중앙일보">
        <img width={width} height={height} src={logoUrl} alt={logoAlt} />
      </a>
    </h1>
  );
}

export default LogoGroup;
