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

type Size = 'sm' | 'md' | 'lg' | number;

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  /** 아이콘 종류 */
  name: IconName;
  /** sm | md | lg | number(px). 숫자는 --icon-size로 반영 */
  size?: Size;
  /** 접근성 레이블. 없으면 aria-hidden */
  ariaLabel?: string;
}

const Icon: React.FC<IconProps> = memo(function Icon({ name, size = 'md', ariaLabel, className, ...rest }) {
  const style = typeof size === 'number' ? { ['--icon-size' as any]: `${size}px` } : undefined;

  return (
    <i
      {...rest}
      className={cx('root', `icon-${name}`, `size-${typeof size === 'string' ? size : 'custom'}`, className)}
      style={style}
      aria-hidden={!ariaLabel}
      aria-label={ariaLabel}
    />
  );
});

export default Icon;
