import React, { memo } from 'react';
import cxBind from 'classnames/bind';
import styles from './Button.module.scss';

const cx = cxBind.bind(styles);

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  pill?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  /** If true, renders square button, ignore text */
  iconOnly?: boolean;
  /** One icon on left, one on right */
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  /** NEW: multiple icons only, no label */
  icons?: React.ReactNode[];
  iconsGap?: number | string; // px or rem
  href?: string;
  loadingLabel?: string;
  customWidth?: number | string;
  className?: string;
  children?: React.ReactNode;
};

type ButtonNativeProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorNativeProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type ButtonProps = CommonProps & ButtonNativeProps & AnchorNativeProps;

const Button: React.FC<ButtonProps> = memo(function Button({
  variant = 'solid',
  size = 'md',
  pill = false,
  fullWidth = false,
  loading = false,
  loadingLabel = 'Loading',
  leadingIcon,
  trailingIcon,
  href,
  className,
  children,
  disabled,
  customWidth,
  iconOnly = false,
  icons,
  iconsGap,
  ...rest
}) {
  const classNames = cx(
    'root',
    `v-${variant}`,
    `s-${size}`,
    {
      pill,
      fullWidth: !customWidth && !iconOnly && fullWidth, // iconOnly면 fullWidth 무시
      loading,
      disabled: disabled || loading,
      iconOnly,
    },
    { customWidth: Boolean(customWidth) },
    className
  );

  const style = customWidth
    ? { ['--btn-width' as any]: typeof customWidth === 'number' ? `${customWidth}px` : customWidth }
    : undefined;
  // content builder
  let Content: React.ReactNode;
  if (Array.isArray(icons) && icons.length > 0) {
    let iconsGapValue: string | undefined;
    if (iconsGap !== undefined) {
      if (typeof iconsGap === 'number') {
        iconsGapValue = `${iconsGap}px`;
      } else {
        iconsGapValue = iconsGap;
      }
    }

    Content = (
      <span
        className={cx('iconsOnly')}
        style={{
          ['--icons-gap' as any]: iconsGapValue,
        }}
      >
        {icons.map((ic, idx) => (
          <span key={idx} className={cx('iconMulti')}>
            {ic}
          </span>
        ))}
      </span>
    );
  } else {
    Content = (
      <>
        {loading && <span className={cx('spinner')} aria-hidden="true" />}
        {leadingIcon && <span className={cx('icon', 'leading')}>{leadingIcon}</span>}
        {!iconOnly && <span className={cx('label')}>{children}</span>}
        {trailingIcon && !iconOnly && <span className={cx('icon', 'trailing')}>{trailingIcon}</span>}
        {loading && <span className={cx('srOnly')}>{loadingLabel}</span>}
      </>
    );
  }

  if (href) {
    return (
      <a
        {...(rest as AnchorNativeProps)}
        href={href}
        aria-busy={loading || undefined}
        aria-disabled={disabled || loading || undefined}
        className={classNames}
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

  return (
    <button
      {...(rest as ButtonNativeProps)}
      type={(rest as ButtonNativeProps).type ?? 'button'}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={classNames}
      style={style}
    >
      {Content}
    </button>
  );
});

export default Button;
