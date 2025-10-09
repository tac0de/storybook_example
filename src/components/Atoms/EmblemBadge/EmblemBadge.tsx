import classNames from 'classnames';

export type EmblemBadgeProps = {
  iconClassName?: string;
  spanClassName?: string;
  ariaLabel?: string;
};

export function EmblemBadge({
  iconClassName = 'ico_emblem60',
  spanClassName = 'emblem',
  ariaLabel = '60주년',
}: EmblemBadgeProps) {
  return (
    <span className={classNames(spanClassName)}>
      <i className={iconClassName} role="img" aria-label={ariaLabel} />
    </span>
  );
}

export default EmblemBadge;
