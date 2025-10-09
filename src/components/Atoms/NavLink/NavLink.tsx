import classNames from 'classnames';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

export type NavLinkProps = {
  href: string;
  active?: boolean;
  ariaLabel?: string;
  baseClassName?: string;
  activeClassName?: string;
  className?: string;
  linkClassName?: string;
  children?: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'>;

export function NavLink({
  href,
  active = false,
  ariaLabel,
  baseClassName = 'nav_item',
  activeClassName = 'is-active',
  className,
  linkClassName,
  children,
  onClick,
  ...rest
}: NavLinkProps) {
  return (
    <li className={classNames(baseClassName, className, active && activeClassName)}>
      <a href={href} className={linkClassName} aria-label={ariaLabel} onClick={onClick} {...rest}>
        {children}
      </a>
    </li>
  );
}

export default NavLink;
