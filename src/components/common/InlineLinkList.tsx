import classNames from 'classnames';
import type { ReactNode } from 'react';

export type InlineLinkBase = {
  href: string;
  label?: ReactNode;
};

export type InlineLinkListProps<T extends InlineLinkBase> = {
  links: T[];
  className?: string;
  itemClassName?: string;
  renderLink?: (link: T) => ReactNode;
  keyExtractor?: (link: T, index: number) => string;
};

export default function InlineLinkList<T extends InlineLinkBase>({
  links,
  className,
  itemClassName,
  renderLink,
  keyExtractor,
}: InlineLinkListProps<T>) {
  const getKey = keyExtractor ?? ((link: T) => link.href);

  return (
    <ul className={classNames(className)}>
      {links.map((link, index) => (
        <li key={getKey(link, index)} className={classNames(itemClassName)}>
          {renderLink ? renderLink(link) : defaultRenderer(link)}
        </li>
      ))}
    </ul>
  );
}

function defaultRenderer(link: InlineLinkBase) {
  return <a href={link.href}>{link.label ?? link.href}</a>;
}
