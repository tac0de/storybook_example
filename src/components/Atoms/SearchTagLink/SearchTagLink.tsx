import classNames from 'classnames';
import type { MouseEvent } from 'react';

import TrackableLink from '../../common/TrackableLink';
import type { TrackingAttributes } from '../../../utils/tracking';

export type SearchTagLinkProps = {
  href: string;
  label: string;
  className?: string;
  eventCategory?: string;
  eventAction?: string;
  eventLabel?: string;
  targetBlank?: boolean;
  onTrack?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export default function SearchTagLink({
  href,
  label,
  className,
  eventCategory,
  eventAction,
  eventLabel,
  targetBlank = false,
  onTrack,
}: SearchTagLinkProps) {
  const tracking: TrackingAttributes | undefined =
    eventCategory || eventAction || eventLabel
      ? {
          category: eventCategory,
          action: eventAction,
          label: eventLabel,
        }
      : undefined;

  return (
    <TrackableLink
      href={href}
      className={classNames('nav_link', className)}
      tracking={tracking}
      external={targetBlank}
      onTrack={onTrack}
    >
      <span>{label}</span>
    </TrackableLink>
  );
}
