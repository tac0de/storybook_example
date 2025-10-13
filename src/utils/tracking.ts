export type TrackingAttributes = {
  category?: string;
  action?: string;
  label?: string;
};

export function buildTrackingAttributes(tracking?: TrackingAttributes) {
  if (!tracking) {
    return {};
  }

  const attrs: Record<string, string> = {};

  if (tracking.category) {
    attrs['data-evnt-ctg'] = tracking.category;
  }

  if (tracking.action) {
    attrs['data-evnt-act'] = tracking.action;
  }

  if (tracking.label) {
    attrs['data-evnt-lbl'] = tracking.label;
  }

  return attrs;
}
