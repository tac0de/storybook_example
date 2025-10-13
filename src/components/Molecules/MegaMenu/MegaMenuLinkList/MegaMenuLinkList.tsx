import MegaMenuLink from '../../../Atoms/MegaMenuLink/MegaMenuLink';

export type MegaMenuLinkItem = {
  href: string;
  label: string;
  ext?: boolean;
  extraClass?: string;
  withNew?: boolean;
};

type MegaMenuLinkListProps = {
  links: MegaMenuLinkItem[];
  wrapWithStrong?: boolean;
};

export default function MegaMenuLinkList({ links, wrapWithStrong = false }: MegaMenuLinkListProps) {
  return (
    <ul>
      {links.map(link => (
        <li key={link.href} className={link.extraClass}>
          {wrapWithStrong ? <strong>{renderLink(link)}</strong> : renderLink(link)}
        </li>
      ))}
    </ul>
  );
}

function renderLink({ href, label, ext, withNew }: MegaMenuLinkItem) {
  return <MegaMenuLink href={href} label={label} ext={ext} withNew={withNew} />;
}
