import React, { memo } from 'react';
import classNamesBind from 'classnames/bind';
import styles from './Icon.module.scss';

const cx = classNamesBind.bind(styles);

export type IconName =
  | 'search'
  | 'search_gra'
  | 'search_ai'
  | 'navbar'
  | 'shortcut_plus'
  | 'newspaper_black'
  | 'chevron_right'
  | 'logo_plus';

type Size = 'sm' | 'md' | 'lg' | 'xl' | number;

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  /** 아이콘 종류 */
  name: IconName;
  /** 높이 기준 크기 (sm | md | lg | number(px)) */
  size?: Size;
  /** 커스텀 가로 크기(px). 지정하면 height=size, width=customWidth */
  customWidth?: number;
  /** 접근성 레이블. 없으면 aria-hidden */
  ariaLabel?: string;
}

const Icon: React.FC<IconProps> = memo(function Icon({
  name,
  size = 'md',
  customWidth,
  ariaLabel,
  className,
  ...rest
}) {
  let style: React.CSSProperties = {};

  if (typeof size === 'number') {
    style = {
      ['--icon-size' as any]: `${size}px`,
      ...(customWidth ? { ['--icon-width' as any]: `${customWidth}px` } : {}),
    };
  } else if (customWidth) {
    style = { ['--icon-width' as any]: `${customWidth}px` };
  }

  return (
    <i
      {...rest}
      className={cx(
        'root',
        `icon-${name}`,
        `size-${typeof size === 'string' ? size : 'custom'}`,
        { customWidth: Boolean(customWidth) },
        className
      )}
      style={style}
      aria-hidden={!ariaLabel}
      aria-label={ariaLabel}
    />
  );
});

export default Icon;
