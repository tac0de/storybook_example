// src/components/Molecules/PlusShortcut/PlusShortcut.tsx
import classNames from 'classnames';

export type PlusShortcutProps = {
  variant?: 'plus' | 'plus_without_logo' | 'default';
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
  const rel = targetBlank ? 'noopener noreferrer' : undefined;
  const target = targetBlank ? '_blank' : undefined;

  let icon;

  if (variant === 'plus') {
    icon = (
      <>
        <i className="ico_shortcut_plus" aria-hidden="true" />
        <i className="logo_plus" aria-hidden="true" />
      </>
    );
  } else if (variant === 'plus_without_logo') {
    icon = (
      <>
        <i className="ico_shortcut_plus" aria-hidden="true" />
      </>
    );
  } else {
    icon = (
      <>
        <i className="ico_shortcut"></i>
        <i className="ico_emblem60" role="img" aria-label="60주년"></i>
      </>
    );
  }

  return (
    <a href={href} className={classNames('btn_shortcut', className)} aria-label={ariaLabel} rel={rel} target={target}>
      {icon}
    </a>
  );
}

export default PlusShortcut;
