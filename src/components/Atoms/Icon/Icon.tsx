/**
 * Icon 컴포넌트
 *
 * 이 컴포넌트는 다양한 아이콘을 표시하는 재사용 가능한 컴포넌트입니다.
 * BEM 컨벤션을 사용하여 CSS 클래스를 구성하고, 접근성을 고려한 설계를 제공합니다.
 *
 * 주요 기능:
 * - 다양한 아이콘 타입 지원
 * - 반응형 크기 조절
 * - 접근성 지원 (aria-label, aria-hidden)
 * - CSS 변수를 통한 동적 크기 조절
 */

import React, { memo } from 'react';
import classNames from 'classnames';
import './Icon.scss';

/**
 * 지원하는 아이콘 이름들의 타입 정의
 * 새로운 아이콘을 추가할 때는 이 타입에 추가해야 합니다.
 */
export type IconName =
  | 'search' // 기본 검색 아이콘
  | 'search-gra' // 그라데이션 검색 아이콘
  | 'search-ai' // AI 검색 아이콘
  | 'navbar' // 네비게이션 햄버거 메뉴
  | 'shortcut-plus' // 단축키 플러스 아이콘
  | 'newspaper-black' // 신문 아이콘
  | 'chevron-right' // 오른쪽 화살표
  | 'logo-plus'; // 로고 플러스

/**
 * 아이콘 크기 타입 정의
 * 미리 정의된 크기(sm, md, lg, xl) 또는 픽셀 단위의 숫자값을 사용할 수 있습니다.
 */
type Size = 'sm' | 'md' | 'lg' | 'xl' | number;

/**
 * Icon 컴포넌트의 Props 인터페이스
 * React.HTMLAttributes를 확장하여 기본 HTML 속성들도 사용할 수 있습니다.
 */
export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  /** 표시할 아이콘의 종류 */
  name: IconName;
  /**
   * 아이콘의 크기
   * - 'sm': 16px
   * - 'md': 20px (기본값)
   * - 'lg': 24px
   * - 'xl': 42px
   * - number: 픽셀 단위의 커스텀 크기
   */
  size?: Size;
  /**
   * 커스텀 가로 크기 (픽셀 단위)
   * 지정하면 height는 size를 따르고, width는 이 값을 사용합니다.
   */
  customWidth?: number;
  /**
   * 접근성을 위한 레이블
   * 제공하면 스크린 리더가 읽을 수 있고, 없으면 aria-hidden이 적용됩니다.
   */
  ariaLabel?: string;
}

/**
 * Icon 컴포넌트 구현
 *
 * memo()를 사용하여 성능 최적화를 적용했습니다.
 * props가 변경되지 않으면 리렌더링을 방지합니다.
 */
const Icon: React.FC<IconProps> = memo(function Icon({
  name,
  size = 'md', // 기본 크기는 'md' (20px)
  customWidth,
  ariaLabel,
  className,
  ...rest // 나머지 HTML 속성들을 spread operator로 받음
}) {
  // CSS 커스텀 속성(CSS Variables)을 위한 스타일 객체
  let style: React.CSSProperties = {};

  // 숫자 크기가 지정된 경우 CSS 변수로 설정
  if (typeof size === 'number') {
    style = {
      // CSS 변수를 사용하여 동적 크기 설정
      ['--icon-size' as any]: `${size}px`,
      // 커스텀 너비가 있으면 함께 설정
      ...(customWidth ? { ['--icon-width' as any]: `${customWidth}px` } : {}),
    };
  } else if (customWidth) {
    // 미리 정의된 크기를 사용하지만 커스텀 너비가 있는 경우
    style = { ['--icon-width' as any]: `${customWidth}px` };
  }

  return (
    <i
      {...rest} // 추가 HTML 속성들을 전달
      className={classNames(
        // BEM 컨벤션에 따른 기본 블록 클래스
        'icon',
        // 아이콘 이름에 따른 modifier 클래스 (BEM: block--modifier)
        `icon--${name}`,
        // 크기에 따른 modifier 클래스
        `icon--${typeof size === 'string' ? size : 'custom'}`,
        // 커스텀 너비가 있을 때의 modifier 클래스
        { 'icon--custom-width': Boolean(customWidth) },
        // 외부에서 전달된 추가 클래스
        className
      )}
      style={style}
      // 접근성: 레이블이 없으면 스크린 리더에서 숨김
      aria-hidden={!ariaLabel}
      // 접근성: 레이블이 있으면 스크린 리더가 읽을 수 있도록 설정
      aria-label={ariaLabel}
    />
  );
});

// 컴포넌트를 기본 내보내기로 설정
// 다른 파일에서 import Icon from './Icon'으로 사용할 수 있습니다.

export default Icon;
