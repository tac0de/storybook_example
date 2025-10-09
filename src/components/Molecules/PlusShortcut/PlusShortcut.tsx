import type { ReactNode } from 'react';
import { ShortcutLink } from '../../Atoms/ShortcutLink/ShortcutLink';

export type PlusShortcutVariant = 'plus' | 'plusWithoutLogo' | 'default';

const ICONS: Record<PlusShortcutVariant, ReactNode> = {
  plus: (
    <>
      <i className="ico_shortcut_plus" aria-hidden="true" />
      <i className="logo_plus" aria-hidden="true" />
    </>
  ),
  plusWithoutLogo: <i className="ico_shortcut_plus" aria-hidden="true" />,
  default: (
    <>
      <i className="ico_shortcut" aria-hidden="true" />
      <i className="ico_emblem60" role="img" aria-label="60주년" />
    </>
  ),
};

export type PlusShortcutProps = {
  variant?: PlusShortcutVariant;
  href?: string;
  ariaLabel?: string;
  className?: string;
  targetBlank?: boolean;
};

export function PlusShortcut({
  variant = 'plus',
  href = 'https://www.joongang.co.kr/plus',
  ariaLabel = '더중앙플러스 바로가기',
  className,
  targetBlank = false,
}: PlusShortcutProps) {
  return (
    <ShortcutLink href={href} ariaLabel={ariaLabel} targetBlank={targetBlank} className={className}>
      {ICONS[variant]}
    </ShortcutLink>
  );
}

export default PlusShortcut;
