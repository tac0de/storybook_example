/**
 * Button 컴포넌트
 *
 * 다양한 스타일과 크기를 지원하는 버튼 컴포넌트입니다.
 * 일반 버튼과 링크 버튼을 모두 지원하며, 아이콘과 로딩 상태도 표시할 수 있습니다.
 *
 * 주요 기능:
 * 1. 다양한 스타일 (solid, outline, ghost, link)
 * 2. 다양한 크기 (sm, md, lg)
 * 3. 아이콘 지원 (앞/뒤 또는 아이콘만)
 * 4. 로딩 상태
 * 5. 비활성화 상태
 * 6. 너비 조절 (기본, 전체, 사용자 지정)
 */

import React, { memo } from 'react';
import classNames from 'classnames';
import './Button.scss';

// 버튼의 스타일 종류
export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';
// 버튼의 크기 종류
export type ButtonSize = 'sm' | 'md' | 'lg';

// 버튼의 공통 속성 정의
type CommonProps = {
  /** 버튼의 스타일 변형 */
  variant?: ButtonVariant;
  /** 버튼의 크기 */
  size?: ButtonSize;
  /** 둥근 모서리 스타일 적용 */
  pill?: boolean;
  /** 버튼을 부모 요소의 전체 너비로 확장 */
  fullWidth?: boolean;
  /** 로딩 상태 표시 */
  loading?: boolean;
  /** 아이콘만 표시하는 정사각형 버튼 */
  iconOnly?: boolean;
  /** 버튼 텍스트 앞에 표시할 아이콘 */
  leadingIcon?: React.ReactNode;
  /** 버튼 텍스트 뒤에 표시할 아이콘 */
  trailingIcon?: React.ReactNode;
  /** 여러 아이콘만 표시 (텍스트 없음) */
  icons?: React.ReactNode[];
  /** 아이콘들 사이의 간격 (px 또는 rem) */
  iconsGap?: number | string;
  /** 링크 주소 (지정시 a 태그로 렌더링) */
  href?: string;
  /** 로딩 상태일 때 표시할 텍스트 */
  loadingLabel?: string;
  /** 사용자 지정 너비 */
  customWidth?: number | string;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 버튼 내용 */
  children?: React.ReactNode;
};

// HTML 버튼과 앵커 태그의 기본 속성 타입
type ButtonNativeProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorNativeProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

// 최종 버튼 속성 타입 (공통 속성 + HTML 기본 속성)
export type ButtonProps = CommonProps & ButtonNativeProps & AnchorNativeProps;

/***
 * Button 컴포넌트
 *
 * @example
 * // 기본 버튼
 * <Button>Click me</Button>
 *
 * // 링크 버튼
 * <Button href="/home" variant="link">Home</Button>
 *
 * // 아이콘이 있는 버튼
 * <Button leadingIcon={<Icon name="search" />}>Search</Button>
 ***/

const Button: React.FC<ButtonProps> = memo(function Button({
  // 스타일 관련 props
  variant = 'solid',
  size = 'md',
  pill = false,
  fullWidth = false,
  loading = false,
  loadingLabel = 'Loading',
  // 아이콘 관련 props
  leadingIcon,
  trailingIcon,
  // 링크 관련 props
  href,
  // 기타 props
  className,
  children,
  disabled,
  customWidth,
  iconOnly = false,
  icons,
  iconsGap,
  ...rest
}) {
  // BEM 컨벤션을 따르는 클래스 이름 생성
  const buttonClassNames = classNames(
    'button',
    `button--${variant}`,
    `button--${size}`,
    {
      'button--pill': pill,
      'button--full-width': !customWidth && !iconOnly && fullWidth,
      'button--loading': loading,
      'button--disabled': disabled || loading,
      'button--icon-only': iconOnly,
      'button--custom-width': Boolean(customWidth),
    },
    className
  );

  // 사용자 지정 너비를 위한 스타일 객체
  const style = customWidth
    ? { ['--btn-width' as any]: typeof customWidth === 'number' ? `${customWidth}px` : customWidth }
    : undefined;

  // 버튼 내용 생성
  let Content: React.ReactNode;
  if (Array.isArray(icons) && icons.length > 0) {
    // 여러 아이콘만 있는 경우
    let iconsGapValue: string | undefined;
    if (iconsGap !== undefined) {
      iconsGapValue = typeof iconsGap === 'number' ? `${iconsGap}px` : iconsGap;
    }

    Content = (
      <span
        className="button__icons-container"
        style={{
          ['--icons-gap' as any]: iconsGapValue,
        }}
      >
        {icons.map((icon, idx) => (
          <span key={idx} className="button__icon">
            {icon}
          </span>
        ))}
      </span>
    );
  } else {
    // 일반적인 버튼 내용
    Content = (
      <>
        {loading && <span className="button__spinner" aria-hidden="true" />}
        {leadingIcon && <span className={classNames('button__icon', 'button__icon--leading')}>{leadingIcon}</span>}
        {!iconOnly && <span className="button__label">{children}</span>}
        {trailingIcon && !iconOnly && (
          <span className={classNames('button__icon', 'button__icon--trailing')}>{trailingIcon}</span>
        )}
        {loading && <span className="button__sr-only">{loadingLabel}</span>}
      </>
    );
  }

  // href가 있으면 앵커 태그로 렌더링
  if (href) {
    return (
      <a
        {...(rest as AnchorNativeProps)}
        href={href}
        aria-busy={loading || undefined}
        aria-disabled={disabled || loading || undefined}
        className={buttonClassNames}
        style={style}
        onClick={e => {
          if (disabled || loading) e.preventDefault();
          (rest as AnchorNativeProps).onClick?.(e);
        }}
      >
        {Content}
      </a>
    );
  }

  // 기본 버튼으로 렌더링
  return (
    <button
      {...(rest as ButtonNativeProps)}
      type={(rest as ButtonNativeProps).type ?? 'button'}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonClassNames}
      style={style}
    >
      {Content}
    </button>
  );
});

export default Button;
