import InlineLinkList from '../../../common/InlineLinkList';
import SearchTagLink, { type SearchTagLinkProps } from '../../../Atoms/SearchTagLink/SearchTagLink';

type SearchLinkItem = Pick<
  SearchTagLinkProps,
  'href' | 'label' | 'eventCategory' | 'eventAction' | 'eventLabel' | 'targetBlank'
>;

export type SearchTagLinkListProps<T extends SearchLinkItem> = {
  links: T[];
  className?: string;
  itemClassName?: string;
  keyExtractor?: (link: T, index: number) => string;
};

export default function SearchTagLinkList<T extends SearchLinkItem>({
  links,
  className,
  itemClassName,
  keyExtractor,
}: SearchTagLinkListProps<T>) {
  return (
    <InlineLinkList
      links={links}
      className={className}
      itemClassName={itemClassName}
      keyExtractor={keyExtractor}
      renderLink={link => (
        <SearchTagLink
          href={link.href}
          label={link.label}
          eventCategory={link.eventCategory}
          eventAction={link.eventAction}
          eventLabel={link.eventLabel}
          targetBlank={link.targetBlank}
        />
      )}
    />
  );
}
