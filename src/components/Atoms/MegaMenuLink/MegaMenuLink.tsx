import classNames from 'classnames';

export type MegaMenuLinkProps = {
  href: string;
  label: string;
  ext?: boolean;
  withNew?: boolean;
  className?: string;
};

export default function MegaMenuLink({ href, label, ext = false, withNew = false, className }: MegaMenuLinkProps) {
  const externalProps = ext ? { target: '_blank', rel: 'noreferrer' as const } : {};

  return (
    <a href={href} className={classNames(className)} {...externalProps}>
      {label}
      {withNew ? <i className="ico_new" /> : null}
    </a>
  );
}
