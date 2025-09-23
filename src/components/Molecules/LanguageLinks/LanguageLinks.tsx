import * as React from 'react';
import classNames from 'classnames';

export type LanguageItem = { label: string; href: string };

export type LanguageLinksProps = {
  /** 언어 링크 목록 (기본: 日文 / 中文 / ENG) */
  items?: LanguageItem[];
  /** ul에 추가 클래스 */
  className?: string;
  /** 접근성 레이블 */
  ariaLabel?: string;
  /**
   * 반응형 헬퍼 클래스 적용 여부
   * - true: 'sm_hidden md_hidden' 적용(데스크톱 전용)
   * - false: 반응형 헬퍼 미적용
   */
  responsiveHelpers?: boolean;
  /**
   * Storybook에서 페이지 이동을 막고 액션만 보려면 onItemClick 사용
   */
  onItemClick?: (item: LanguageItem, index: number, e: React.MouseEvent<HTMLAnchorElement>) => void;
};

const DEFAULT_ITEMS: LanguageItem[] = [
  { label: '日文', href: 'https://japanese.joins.com/' },
  { label: '中文', href: 'https://chinese.joins.com/' },
  { label: 'ENG', href: 'https://koreajoongangdaily.joins.com/' },
];

/**
 * LanguageLinks
 * - 전역 CSS: `.language_site` (+ 선택적으로 `sm_hidden md_hidden`)
 * - 탭/Docs에서 이동 방지하려면 onItemClick으로 e.preventDefault() 내부에서 호출됨
 */
export function LanguageLinks({
  items = DEFAULT_ITEMS,
  className,
  ariaLabel = '다국어 링크',
  responsiveHelpers = true,
  onItemClick,
}: LanguageLinksProps) {
  return (
    <ul
      className={classNames('language_site', responsiveHelpers && 'sm_hidden md_hidden', className)}
      aria-label={ariaLabel}
    >
      {items.map((item, idx) => (
        <li key={item.href || `${item.label}-${idx}`}>
          <a
            href={item.href}
            onClick={e => {
              if (onItemClick) {
                e.preventDefault();
                onItemClick(item, idx, e);
              }
            }}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default LanguageLinks;
