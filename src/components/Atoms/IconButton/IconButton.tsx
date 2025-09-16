/**
 * IconButton 컴포넌트
 *
 * 아이콘만 표시하는 버튼 컴포넌트입니다.
 * 접근성을 고려하여 스크린 리더용 텍스트를 포함합니다.
 *
 * 주요 기능:
 * - 다양한 아이콘 지원
 * - 접근성 지원 (aria-label, 숨김 텍스트)
 * - 크기 변형 지원
 * - 상태 관리 (활성/비활성)
 */

import React, { memo } from 'react';
import classNames from 'classnames';
import './IconButton.scss';

/**
 * IconButton 컴포넌트의 Props 인터페이스
 */
export interface IconButtonProps {
  /** 아이콘 요소 (i 태그 또는 React 컴포넌트) */
  icon: React.ReactNode;
  /** 접근성을 위한 라벨 (필수) */
  ariaLabel: string;
  /** 클릭 핸들러 */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** 버튼 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 버튼 변형 스타일 */
  variant?: 'default' | 'ghost' | 'outline';
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 활성 상태 (토글 버튼용) */
  active?: boolean;
  /** ARIA 확장 상태 (드롭다운, 팝업 등) */
  ariaExpanded?: boolean;
  /** ARIA 팝업 타입 */
  ariaHaspopup?: 'dialog' | 'menu' | 'listbox' | 'tree' | 'grid' | boolean;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 버튼 타입 */
  type?: 'button' | 'submit' | 'reset';
}

/**
 * IconButton 컴포넌트
 */
const IconButton: React.FC<IconButtonProps> = memo(function IconButton({
  icon,
  ariaLabel,
  onClick,
  size = 'md',
  variant = 'default',
  disabled = false,
  active = false,
  ariaExpanded,
  ariaHaspopup,
  className,
  type = 'button',
}) {
  const classes = classNames(
    'icon-button',
    `icon-button--${variant}`,
    `icon-button--${size}`,
    {
      'icon-button--disabled': disabled,
      'icon-button--active': active,
    },
    className
  );

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-haspopup={ariaHaspopup}
    >
      <span className="icon-button__icon" aria-hidden="true">
        {icon}
      </span>
      <span className="visually-hidden">{ariaLabel}</span>
    </button>
  );
});

export default IconButton;
