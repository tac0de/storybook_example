/**
 * ActionGroup 컴포넌트
 *
 * 여러 액션 버튼들을 그룹화하여 표시하는 분자 컴포넌트입니다.
 * 헤더, 툴바, 카드 등에서 액션 버튼들을 일관되게 배치할 때 사용합니다.
 *
 * 주요 기능:
 * - 다양한 액션 버튼 지원
 * - 수평/수직 레이아웃
 * - 간격 조절
 * - 반응형 숨김 처리
 * - 접근성 지원
 * - 구분선 지원
 */

import React, { memo } from 'react';
import classNames from 'classnames';
import './ActionGroup.scss';

/**
 * 액션 아이템 타입
 */
export interface ActionItem {
  /** 고유 식별자 */
  id: string;
  /** 액션 타입 */
  type: 'button' | 'link' | 'custom';
  /** 표시할 콘텐츠 */
  content: React.ReactNode;
  /** 클릭 핸들러 (button 타입용) */
  onClick?: (e: React.MouseEvent) => void;
  /** 링크 URL (link 타입용) */
  href?: string;
  /** 외부 링크 여부 */
  external?: boolean;
  /** 접근성 라벨 */
  ariaLabel?: string;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 활성 상태 */
  active?: boolean;
  /** 반응형 숨김 클래스 */
  responsiveHidden?: string;
  /** 구분선 표시 (이 아이템 뒤에) */
  divider?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * ActionGroup 컴포넌트의 Props 인터페이스
 */
export interface ActionGroupProps {
  /** 액션 아이템 배열 */
  items: ActionItem[];
  /** 레이아웃 방향 */
  direction?: 'horizontal' | 'vertical';
  /** 아이템 간 간격 */
  spacing?: 'tight' | 'normal' | 'loose';
  /** 정렬 방식 */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /** 래핑 허용 여부 */
  wrap?: boolean;
  /** 접근성 라벨 */
  ariaLabel?: string;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * ActionGroup 컴포넌트
 */
const ActionGroup: React.FC<ActionGroupProps> = memo(function ActionGroup({
  items,
  direction = 'horizontal',
  spacing = 'normal',
  align = 'center',
  wrap = false,
  ariaLabel,
  className,
}) {
  const classes = classNames(
    'action-group',
    `action-group--${direction}`,
    `action-group--spacing-${spacing}`,
    `action-group--align-${align}`,
    {
      'action-group--wrap': wrap,
    },
    className
  );

  const renderActionItem = (item: ActionItem, index: number) => {
    const {
      type,
      disabled,
      active,
      responsiveHidden,
      className: itemClassName,
      onClick,
      href,
      external,
      ariaLabel,
      content: itemContent,
    } = item;
    const itemClasses = classNames(
      'action-group__item',
      {
        'action-group__item--disabled': disabled,
        'action-group__item--active': active,
      },
      responsiveHidden,
      itemClassName
    );

    let content: React.ReactNode;

    switch (type) {
      case 'button':
        content = (
          <button
            type="button"
            className="action-group__button"
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
          >
            {itemContent}
          </button>
        );
        break;

      case 'link':
        content = (
          <a
            href={href}
            className="action-group__link"
            aria-label={ariaLabel}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
          >
            {itemContent}
          </a>
        );
        break;

      case 'custom':
      default:
        content = itemContent;
        break;
    }

    const { id, divider } = item;
    return (
      <React.Fragment key={id}>
        <div className={itemClasses}>{content}</div>
        {divider && index < items.length - 1 && <div className="action-group__divider" />}
      </React.Fragment>
    );
  };

  return (
    <div className={classes} role="group" aria-label={ariaLabel}>
      {items.map((item, index) => renderActionItem(item, index))}
    </div>
  );
});

export default ActionGroup;
