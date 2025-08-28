import React, { memo } from 'react';
import classNames from 'classnames';
import './UtilityLinks.scss';
import TextLink from '../../Atoms/TextLink/TextLink';

/**
 * 개별 유틸리티 링크 아이템의 타입 정의
 * @description 각 링크의 속성을 정의하는 타입
 */
export type UtilityLinkItem = {
  /** 링크에 표시될 텍스트 */
  label: string;
  /** 링크 URL */
  href: string;
  /** 현재 활성화된 링크인지 여부 */
  active?: boolean;
  /** 비활성화된 스타일 적용 여부 */
  muted?: boolean;
  /** 외부 링크인지 여부 (새 탭에서 열림) */
  external?: boolean;
};

/**
 * 링크 간 구분자 스타일 타입
 * @description 링크 사이에 표시될 구분자의 종류
 */
export type SeparatorStyle = 'pipe' | 'dot' | 'none';

/**
 * UtilityLinks 컴포넌트의 Props 인터페이스
 * @description 유틸리티 링크 목록을 렌더링하는 컴포넌트의 속성들
 */
export interface UtilityLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 렌더링할 링크 아이템 배열 */
  items: UtilityLinkItem[];
  /** 링크 간 구분자 스타일 (기본값: 'pipe') */
  separator?: SeparatorStyle;
  /** 간격을 축약할지 여부 */
  condensed?: boolean;
  /** 줄바꿈을 허용할지 여부 */
  wrap?: boolean;
  /** 접근성을 위한 nav 요소의 aria-label */
  ariaLabel?: string;
  /** 링크 클릭 시 호출될 콜백 함수 */
  onItemClick?: (item: UtilityLinkItem, index: number, e: React.MouseEvent) => void;
}

/**
 * UtilityLinks 컴포넌트
 * @description 유틸리티 링크들을 가로로 나열하여 표시하는 컴포넌트
 *
 * 주요 기능:
 * - 다양한 구분자 스타일 지원 (파이프, 점, 없음)
 * - 반응형 레이아웃 (줄바꿈 옵션)
 * - 접근성 지원 (ARIA 라벨, 키보드 네비게이션)
 * - 외부 링크 자동 처리 (새 탭 열기)
 *
 * BEM 컨벤션:
 * - Block: utility-links
 * - Elements: __list, __item, __link
 * - Modifiers: --wrap, --condensed, --sep-pipe, --sep-dot, --sep-none, --last
 */
const UtilityLinks: React.FC<UtilityLinksProps> = memo(function UtilityLinks({
  items,
  separator = 'pipe',
  condensed = false,
  wrap = false,
  ariaLabel = 'Utility links',
  onItemClick,
  className,
  ...rest
}) {
  return (
    <nav
      {...rest} // 추가 nav 속성들을 전달
      aria-label={ariaLabel} // 접근성을 위한 라벨 설정
      className={classNames(
        'utility-links', // BEM Block 클래스
        {
          'utility-links--condensed': condensed, // 압축된 간격 모디파이어
          'utility-links--wrap': wrap, // 줄바꿈 허용 모디파이어
        },
        className // 외부에서 전달된 추가 클래스
      )}
    >
      <ul className="utility-links__list" role="list">
        {items.map((item, index) => {
          // 마지막 아이템인지 확인 (구분자 표시 여부 결정)
          const isLast = index === items.length - 1;

          // 클릭 이벤트 핸들러 (커스텀 클릭 로직이 있을 때만)
          const handleClick = (e: React.MouseEvent) => {
            if (onItemClick) {
              e.preventDefault(); // 기본 링크 동작 방지
              onItemClick(item, index, e); // 커스텀 클릭 핸들러 호출
            }
          };

          return (
            <li
              key={item.href + index} // 고유 키 생성 (href + index 조합)
              className={classNames(
                'utility-links__item', // BEM Element 클래스
                `utility-links__item--sep-${separator}`, // 구분자 스타일 모디파이어
                {
                  'utility-links__item--last': isLast, // 마지막 아이템 모디파이어
                }
              )}
            >
              <TextLink
                href={item.href}
                className="utility-links__link" // BEM Element 클래스
                active={item.active} // 활성 상태
                muted={item.muted} // 비활성 스타일
                onClick={onItemClick ? handleClick : undefined} // 조건부 클릭 핸들러
                target={item.external ? '_blank' : undefined} // 외부 링크는 새 탭에서 열기
                rel={item.external ? 'noreferrer' : undefined} // 보안을 위한 rel 속성
              >
                {item.label}
              </TextLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
});

export default UtilityLinks;
