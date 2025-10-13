import classNames from 'classnames';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

export type LogoAnchorProps = {
  href: string;
  ariaLabel?: string;
  baseClassName?: string | null;
  className?: string;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'aria-label' | 'className' | 'children'>;

export function LogoAnchor({ href, ariaLabel, baseClassName = 'logo', className, children, ...rest }: LogoAnchorProps) {
  return (
    <a href={href} className={classNames(baseClassName ?? undefined, className)} aria-label={ariaLabel} {...rest}>
      {children}
    </a>
  );
}

export default LogoAnchor;
