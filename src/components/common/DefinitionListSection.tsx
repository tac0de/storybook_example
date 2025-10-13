import classNames from 'classnames';
import type { ReactNode } from 'react';

export type DefinitionListSectionProps = {
  className?: string;
  title: ReactNode;
  titleHref?: string;
  showFoldIcon?: boolean;
  bodyClassName?: string;
  children: ReactNode;
};

export default function DefinitionListSection({
  className,
  title,
  titleHref,
  showFoldIcon = false,
  bodyClassName = 'nav_item',
  children,
}: DefinitionListSectionProps) {
  return (
    <dl className={classNames(className)}>
      <dt>
        <strong>
          {titleHref ? (
            <a href={titleHref}>
              {title}
              {showFoldIcon ? <i className="ico_fold" /> : null}
            </a>
          ) : (
            title
          )}
        </strong>
      </dt>
      <dd className={bodyClassName}>{children}</dd>
    </dl>
  );
}
