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
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  /** a 태그로 렌더하고 싶으면 href만 주면 됩니다 */
  href?: string;
  /** 접근성용 로딩 텍스트(시각적 숨김). loading=true일 때만 참조 */
  loadingLabel?: string;
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
  ...rest
}) {
  const classNames = cx(
    'root',
    `v-${variant}`,
    `s-${size}`,
    {
      pill,
      fullWidth,
      loading,
      disabled: disabled || loading,
    },
    className
  );

  if (href) {
    return (
      <a
        {...(rest as AnchorNativeProps)}
        href={href}
        aria-busy={loading || undefined}
        aria-disabled={disabled || loading || undefined}
        className={classNames}
        onClick={e => {
          if (disabled || loading) e.preventDefault();
          (rest as AnchorNativeProps).onClick?.(e);
        }}
      >
        {loading && <span className={cx('spinner')} aria-hidden="true" />}
        {leadingIcon && <span className={cx('icon', 'leading')}>{leadingIcon}</span>}
        <span className={cx('label')}>{children}</span>
        {trailingIcon && <span className={cx('icon', 'trailing')}>{trailingIcon}</span>}
        {loading && <span className={cx('srOnly')}>{loadingLabel}</span>}
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
    >
      {loading && <span className={cx('spinner')} aria-hidden="true" />}
      {leadingIcon && <span className={cx('icon', 'leading')}>{leadingIcon}</span>}
      <span className={cx('label')}>{children}</span>
      {trailingIcon && <span className={cx('icon', 'trailing')}>{trailingIcon}</span>}
      {loading && <span className={cx('srOnly')}>{loadingLabel}</span>}
    </button>
  );
});

export default Button;
