import * as React from 'react';
import classNames from 'classnames';

export type IconButtonKind = 'navbar' | 'search' | 'newspaper';

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** 아이콘 종류 (전역 CSS 클래스 사용) */
  kind: IconButtonKind;
  /** 접근성 라벨 */
  ariaLabel: string;
  /** 추가 클래스 */
  className?: string;
};

/**
 * 전역 아이콘을 사용하는 버튼
 * - ico_navbar, ico_search, ico_newspaper 등 전역 CSS 기반
 */
export function IconButton({ kind, ariaLabel, className, ...rest }: IconButtonProps) {
  const iconCls = kind === 'navbar' ? 'ico_navbar' : kind === 'search' ? 'ico_search' : 'ico_newspaper';

  return (
    <button type="button" className={classNames('btn_icon', className)} aria-label={ariaLabel} {...rest}>
      <i className={iconCls} aria-hidden="true" />
    </button>
  );
}

export default IconButton;
