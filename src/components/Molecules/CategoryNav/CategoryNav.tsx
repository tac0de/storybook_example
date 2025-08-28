/**
 * CategoryNav 컴포넌트
 *
 * 이 컴포넌트는 카테고리 네비게이션을 표시하는 재사용 가능한 컴포넌트입니다.
 * BEM 컨벤션을 사용하여 CSS 클래스를 구성하고, 접근성을 고려한 설계를 제공합니다.
 *
 * 주요 기능:
 * - 가로 스크롤 지원 (모바일)
 * - 페이드 효과 (스크롤 힌트)
 * - 활성/강조 상태 표시
 * - 클릭 이벤트 처리
 * - 접근성 지원
 */

import React, { memo } from 'react';
import classNames from 'classnames';
import './CategoryNav.scss';
import TextLink from '../../Atoms/TextLink/TextLink';

/**
 * 카테고리 항목 데이터 타입
 * 각 카테고리의 정보를 정의합니다.
 */
export type CategoryItem = {
  /** 카테고리 표시 텍스트 */
  label: string;
  /** 카테고리 링크 URL */
  href: string;
  /** 현재 활성 상태 여부 (선택된 카테고리) */
  active?: boolean;
  /** 강조 표시 여부 (중요한 카테고리, 예: '스포츠') */
  emphasized?: boolean;
  // children?: CategoryItem[]; // 하위 메뉴가 필요한 경우 확장 가능
};

/**
 * CategoryNav 컴포넌트의 Props 인터페이스
 * React.HTMLAttributes를 확장하여 기본 div 태그 속성들도 사용할 수 있습니다.
 */
export interface CategoryNavProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 표시할 카테고리 항목들의 배열 */
  items: CategoryItem[];
  /**
   * 모바일에서 가로 스크롤 허용 여부
   * true일 경우 화면을 넘어가는 항목들을 스크롤로 볼 수 있습니다
   */
  scrollableOnMobile?: boolean;
  /**
   * 좌우 페이드 섀도(스크롤 힌트) 표시 여부
   * true일 경우 스크롤 가능한 영역을 시각적으로 표시합니다
   */
  withEdgeFade?: boolean;
  /**
   * 카테고리 클릭 시 실행될 콜백 함수
   * 라우터 없이 직접 네비게이션을 제어하려면 사용합니다
   */
  onItemClick?: (item: CategoryItem, index: number, event: React.MouseEvent) => void;
  /**
   * 네비게이션의 접근성 라벨
   * 스크린 리더 사용자를 위한 설명
   */
  ariaLabel?: string;
}

/**
 * CategoryNav 컴포넌트 구현
 *
 * memo()를 사용하여 성능 최적화를 적용했습니다.
 * props가 변경되지 않으면 리렌더링을 방지합니다.
 */
const CategoryNav: React.FC<CategoryNavProps> = memo(function CategoryNav({
  items, // 카테고리 항목들
  scrollableOnMobile = true, // 기본값: 모바일 스크롤 허용
  withEdgeFade = false, // 기본값: 페이드 효과 표시
  onItemClick, // 클릭 이벤트 핸들러 (선택사항)
  ariaLabel = 'Main categories', // 기본 접근성 라벨
  className, // 외부에서 전달된 추가 클래스
  ...rest // 나머지 div 태그 속성들을 spread operator로 받음
}) {
  return (
    <nav
      {...rest} // 추가 nav 속성들을 전달
      aria-label={ariaLabel} // 접근성을 위한 라벨 설정
      className={classNames(
        // BEM 컨벤션에 따른 기본 블록 클래스
        'category-nav',
        // 조건부 modifier 클래스들 (BEM: block--modifier)
        {
          'category-nav--scrollable-on-mobile': scrollableOnMobile, // 모바일 스크롤 허용
          'category-nav--with-edge-fade': withEdgeFade, // 페이드 효과 표시
        },
        // 외부에서 전달된 추가 클래스
        className
      )}
    >
      {/* 카테고리 목록 - role="list"로 접근성 향상 */}
      <ul className="category-nav__list" role="list">
        {/* 각 카테고리 항목을 순회하며 렌더링 */}
        {items.map((item, index) => {
          /**
           * 카테고리 클릭 이벤트 핸들러
           * onItemClick이 제공된 경우에만 실행됩니다
           */
          const handleClick = (event: React.MouseEvent) => {
            if (onItemClick) {
              event.preventDefault(); // 기본 링크 동작 방지 (외부에서 라우팅 제어)
              onItemClick(item, index, event); // 외부 핸들러 호출
            }
          };

          return (
            <li
              key={item.href + index} // 고유 키 생성 (href + index 조합)
              className={classNames(
                // BEM element 클래스
                'category-nav__item',
                // 조건부 modifier 클래스들
                {
                  'category-nav__item--active': item.active, // 활성 상태
                  'category-nav__item--emphasized': item.emphasized, // 강조 상태
                }
              )}
            >
              {/* TextLink 컴포넌트를 사용하여 링크 렌더링 */}
              <TextLink
                href={item.href} // 링크 URL
                className="category-nav__link" // BEM element 클래스
                active={item.active} // TextLink의 활성 상태 전달
                onClick={onItemClick ? handleClick : undefined} // 클릭 핸들러 조건부 설정
              >
                {item.label} {/* 카테고리 텍스트 표시 */}
              </TextLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
});

// 컴포넌트를 기본 내보내기로 설정
// 다른 파일에서 import CategoryNav from './CategoryNav'으로 사용할 수 있습니다.

export default CategoryNav;
