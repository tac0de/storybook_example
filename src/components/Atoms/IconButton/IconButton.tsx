import * as React from 'react';
import classNames from 'classnames';

export type IconButtonVariant = 'navbar' | 'ham' | 'search';

const BUTTON_CLASS_BY_VARIANT: Record<IconButtonVariant, string> = {
  navbar: 'btn_navbar',
  ham: 'btn_navbar',
  search: 'btn_search',
};

const ICON_BY_VARIANT: Record<IconButtonVariant, React.ReactNode> = {
  navbar: <i className="ico_navbar" aria-hidden="true" />,
  ham: <i className="ico_ham" aria-hidden="true" />,
  search: (
    <>
      <i className="ico_search art_search" aria-hidden="true" />
      <i className="ico_search_gra art_search_gra" aria-hidden="true" />
      <i className="ico_search_ai art_ai" aria-hidden="true" />
    </>
  ),
};

export type IconButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'aria-label' | 'className'
> & {
  variant?: IconButtonVariant;
  ariaLabel: string;
  expanded?: boolean;
  className?: string;
  buttonClassName?: string;
  icon?: React.ReactNode;
};

export function IconButton({
  variant = 'navbar',
  ariaLabel,
  expanded,
  className,
  buttonClassName,
  icon,
  ...rest
}: IconButtonProps) {
  const baseClass = buttonClassName ?? BUTTON_CLASS_BY_VARIANT[variant];
  const iconNode = icon ?? ICON_BY_VARIANT[variant];
  const ariaExpanded = typeof expanded === 'boolean' ? expanded : undefined;

  return (
    <button
      type="button"
      className={classNames(baseClass, className)}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      {...rest}
    >
      {iconNode}
    </button>
  );
}

export default IconButton;
