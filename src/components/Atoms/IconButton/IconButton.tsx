import * as React from 'react';
import classNames from 'classnames';

import { buildAriaProps } from '../../../utils/accessibility';
import { selectVariant } from '../../../utils/variants';

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
  ariaControls?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  className?: string;
  buttonClassName?: string;
  icon?: React.ReactNode;
};

export function IconButton({
  variant = 'navbar',
  ariaLabel,
  expanded,
  ariaControls,
  ariaLabelledBy,
  ariaDescribedBy,
  className,
  buttonClassName,
  icon,
  ...rest
}: IconButtonProps) {
  const baseClass = buttonClassName ?? selectVariant(BUTTON_CLASS_BY_VARIANT, variant);
  const iconNode = icon ?? selectVariant(ICON_BY_VARIANT, variant);
  const ariaAttributes = buildAriaProps({
    expanded,
    controls: ariaControls,
    labelledBy: ariaLabelledBy,
    describedBy: ariaDescribedBy,
  });

  return (
    <button
      type="button"
      className={classNames(baseClass, className)}
      aria-label={ariaLabel}
      {...ariaAttributes}
      {...rest}
    >
      {iconNode}
    </button>
  );
}

export default IconButton;
