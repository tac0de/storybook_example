type AriaProps = {
  expanded?: boolean;
  pressed?: boolean;
  controls?: string;
  labelledBy?: string;
  describedBy?: string;
};

export function buildAriaProps({ expanded, pressed, controls, labelledBy, describedBy }: AriaProps) {
  const attrs: Record<string, string | boolean> = {};
  if (expanded !== undefined) {
    attrs['aria-expanded'] = expanded;
  }
  if (pressed !== undefined) {
    attrs['aria-pressed'] = pressed;
  }
  if (controls) {
    attrs['aria-controls'] = controls;
  }
  if (labelledBy) {
    attrs['aria-labelledby'] = labelledBy;
  }
  if (describedBy) {
    attrs['aria-describedby'] = describedBy;
  }
  return attrs;
}

export function ariaBool(value?: boolean) {
  return value === undefined ? undefined : value;
}
