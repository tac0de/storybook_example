import { forwardRef, type AnchorHTMLAttributes, type MouseEvent } from 'react';

import { useComposedCallback } from '../../hooks/useComposedCallback';
import { buildTrackingAttributes, type TrackingAttributes } from '../../utils/tracking';

export type TrackableLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  tracking?: TrackingAttributes;
  external?: boolean;
  onTrack?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export const TrackableLink = forwardRef<HTMLAnchorElement, TrackableLinkProps>(function TrackableLink(
  { tracking, external = false, onTrack, onClick, rel, target, ...rest },
  ref
) {
  const trackingAttrs = buildTrackingAttributes(tracking);
  const finalRel = external ? 'noreferrer' : rel;
  const finalTarget = external ? '_blank' : target;
  const composedOnClick = useComposedCallback(onClick, onTrack);

  return <a ref={ref} {...trackingAttrs} {...rest} rel={finalRel} target={finalTarget} onClick={composedOnClick} />;
});

export default TrackableLink;
