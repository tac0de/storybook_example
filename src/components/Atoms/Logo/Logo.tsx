/**
 * Logo 컴포넌트
 *
 * 이 컴포넌트는 The JoongAng의 로고를 표시하는 재사용 가능한 컴포넌트입니다.
 * BEM 컨벤션을 사용하여 CSS 클래스를 구성하고, 접근성을 고려한 설계를 제공합니다.
 *
 * 주요 기능:
 * - 마크(심볼)와 워드마크 타입 지원
 * - 반응형 이미지 처리
 * - 접근성 지원 (alt 텍스트)
 * - 커스텀 크기 조절
 */

import React, { memo } from 'react';
import classNames from 'classnames';
import './Logo.scss';

/**
 * 로고 변형 타입 정의
 * - mark: 60주년 심볼 로고만
 * - word: The JoongAng 워드마크만
 */
export type LogoVariant = 'mark' | 'word';

/**
 * Logo 컴포넌트의 Props 인터페이스
 * React.HTMLAttributes를 확장하여 기본 img 태그 속성들도 사용할 수 있습니다.
 */
export interface LogoProps extends React.HTMLAttributes<HTMLImageElement> {
  /**
   * 로고 변형 타입
   * - 'mark': 60주년 심볼 로고
   * - 'word': The JoongAng 워드마크
   */
  variant?: LogoVariant;
  /**
   * 접근성을 위한 대체 텍스트
   * 스크린 리더가 이미지를 설명할 때 사용됩니다.
   */
  alt?: string;
  /**
   * 이미지 가로 크기 (픽셀 단위)
   * 지정하지 않으면 원본 크기 또는 CSS에 의해 결정됩니다.
   */
  width?: number;
  /**
   * 이미지 세로 크기 (픽셀 단위)
   * 지정하지 않으면 원본 크기 또는 CSS에 의해 결정됩니다.
   */
  height?: number;
}

/**
 * Logo 컴포넌트 구현
 *
 * memo()를 사용하여 성능 최적화를 적용했습니다.
 * props가 변경되지 않으면 리렌더링을 방지합니다.
 */
const Logo: React.FC<LogoProps> = memo(function Logo({
  variant = 'mark', // 기본값은 마크 타입
  alt = 'The JoongAng', // 기본 대체 텍스트
  width,
  height,
  className,
  ...imgProps // 나머지 img 태그 속성들을 spread operator로 받음
}) {
  /**
   * 로고 변형에 따른 이미지 경로 매핑
   * Record<LogoVariant, string> 타입으로 타입 안정성을 보장합니다.
   *
   * 경로 설명:
   * - /public/images/ 폴더의 파일들은 /images/로 접근 가능
   * - Next.js와 Vite 모두에서 동작하는 표준 방식
   */
  const srcMap: Record<LogoVariant, string> = {
    mark: '/images/logo-mark.svg', // 60주년 심볼 로고 (SVG 형식)
    word: '/images/logo-word.png', // The JoongAng 워드마크 (PNG 형식)
  };

  return (
    <img
      {...imgProps} // 추가 img 태그 속성들을 전달
      src={srcMap[variant]} // 변형에 따른 이미지 소스 설정
      alt={alt} // 접근성을 위한 대체 텍스트
      width={width} // 가로 크기 (선택적)
      height={height} // 세로 크기 (선택적)
      className={classNames(
        // BEM 컨벤션에 따른 기본 블록 클래스
        'logo',
        // 변형에 따른 modifier 클래스 (BEM: block--modifier)
        `logo--${variant}`,
        // 외부에서 전달된 추가 클래스
        className
      )}
    />
  );
});

// 컴포넌트를 기본 내보내기로 설정
// 다른 파일에서 import Logo from './Logo'으로 사용할 수 있습니다.

export default Logo;
