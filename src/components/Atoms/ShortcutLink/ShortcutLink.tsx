import classNames from 'classnames';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

export type ShortcutLinkProps = {
  href?: string;
  ariaLabel?: string;
  targetBlank?: boolean;
  baseClassName?: string;
  className?: string;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'aria-label' | 'className' | 'children' | 'target' | 'rel'>;

export function ShortcutLink({
  href = '#',
  ariaLabel,
  targetBlank = false,
  baseClassName = 'btn_shortcut',
  className,
  children,
  ...rest
}: ShortcutLinkProps) {
  const target = targetBlank ? '_blank' : undefined;
  const rel = targetBlank ? 'noopener noreferrer' : undefined;

  return (
    <a
      href={href}
      className={classNames(baseClassName, className)}
      aria-label={ariaLabel}
      target={target}
      rel={rel}
      {...rest}
    >
      {children}
    </a>
  );
}

export default ShortcutLink;
