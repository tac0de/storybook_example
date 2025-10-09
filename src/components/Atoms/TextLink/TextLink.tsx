import classNames from 'classnames';
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';

export type TextLinkProps = {
  href?: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  targetBlank?: boolean;
  preventDefault?: boolean;
} & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'className' | 'children' | 'aria-label' | 'target' | 'rel' | 'onClick'
> & {
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  };

export function TextLink({
  href = '#',
  children,
  className,
  ariaLabel,
  targetBlank = false,
  preventDefault = false,
  onClick,
  ...rest
}: TextLinkProps) {
  const target = targetBlank ? '_blank' : undefined;
  const rel = targetBlank ? 'noopener noreferrer' : undefined;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (preventDefault) {
      event.preventDefault();
    }
    onClick?.(event);
  };

  return (
    <a
      href={href}
      className={classNames(className)}
      aria-label={ariaLabel}
      target={target}
      rel={rel}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  );
}

export default TextLink;
