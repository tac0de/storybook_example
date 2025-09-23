import classNames from 'classnames';

export type PlusShortcutProps = {
  /** 클릭 시 이동할 URL */
  href?: string;
  /** 접근성 라벨 */
  ariaLabel?: string;
  /** 추가 클래스 */
  className?: string;
  /** 새 창 열기 여부 */
  targetBlank?: boolean;
};

/**
 * 더중앙플러스 바로가기
 * - 전역 CSS: `.btn_shortcut`, 내부 아이콘 `.ico_shortcut_plus`, `.logo_plus`
 */
export function PlusShortcut({
  href = 'https://www.joongang.co.kr/plus',
  ariaLabel = '더중앙플러스 바로가기',
  className,
  targetBlank = false,
}: PlusShortcutProps) {
  const rel = targetBlank ? 'noopener noreferrer' : undefined;
  const target = targetBlank ? '_blank' : undefined;

  return (
    <a href={href} className={classNames('btn_shortcut', className)} aria-label={ariaLabel} rel={rel} target={target}>
      <i className="ico_shortcut_plus" aria-hidden="true" />
      <i className="logo_plus" aria-hidden="true" />
    </a>
  );
}

export default PlusShortcut;
