/**
 * LinkButton 컴포넌트
 *
 * 링크와 버튼의 기능을 모두 지원하는 재사용 가능한 원자 컴포넌트입니다.
 * 외부 링크, 내부 링크, 그리고 클릭 핸들러를 모두 지원합니다.
 *
 * 주요 기능:
 * - 링크 및 버튼 기능 통합
 * - 다양한 스타일 변형 지원
 * - 접근성 지원
 * - 아이콘 지원
 */

import React, { memo } from 'react';
import classNames from 'classnames';
import './LinkButton.scss';

/**
 * LinkButton 컴포넌트의 Props 인터페이스
 */
export interface LinkButtonProps {
  /** 버튼/링크에 표시될 텍스트 */
  children: React.ReactNode;
  /** 링크 URL (제공되면 <a> 태그로 렌더링) */
  href?: string;
  /** 클릭 핸들러 (제공되면 <button> 태그로 렌더링) */
  onClick?: (e: React.MouseEvent) => void;
  /** 버튼/링크 스타일 변형 */
  variant?: 'default' | 'outline' | 'ghost' | 'text';
  /** 크기 변형 */
  size?: 'sm' | 'md' | 'lg';
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 외부 링크 여부 (새 탭에서 열기) */
  external?: boolean;
  /** 접근성 라벨 */
  ariaLabel?: string;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 아이콘 (텍스트 앞에 표시) */
  icon?: React.ReactNode;
  /** 아이콘만 표시 (텍스트 숨김) */
  iconOnly?: boolean;
}

/**
 * LinkButton 컴포넌트
 */
const LinkButton: React.FC<LinkButtonProps> = memo(function LinkButton({
  children,
  href,
  onClick,
  variant = 'default',
  size = 'md',
  disabled = false,
  external = false,
  ariaLabel,
  className,
  icon,
  iconOnly = false,
}) {
  const classes = classNames(
    'link-button',
    `link-button--${variant}`,
    `link-button--${size}`,
    {
      'link-button--disabled': disabled,
      'link-button--icon-only': iconOnly,
      'link-button--with-icon': Boolean(icon),
    },
    className
  );

  const content = (
    <>
      {icon && <span className="link-button__icon">{icon}</span>}
      {!iconOnly && <span className="link-button__text">{children}</span>}
      {iconOnly && <span className="visually-hidden">{children}</span>}
    </>
  );

  // 링크로 렌더링
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  // 버튼으로 렌더링
  return (
    <button type="button" className={classes} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
      {content}
    </button>
  );
});

export default LinkButton;
