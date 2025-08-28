/**
 * BrandBlock 컴포넌트
 *
 * 이 컴포넌트는 브랜드 로고와 워드마크를 표시하는 재사용 가능한 컴포넌트입니다.
 * BEM 컨벤션을 사용하여 CSS 클래스를 구성하고, 접근성을 고려한 설계를 제공합니다.
 *
 * 주요 기능:
 * - 분리형/통합형 로고 표시 모드
 * - 크기 조절 가능
 * - 링크 기능 지원
 * - 컴팩트 모드 지원
 * - 접근성 지원
 */

import React, { memo } from 'react';
import classNames from 'classnames';
import './BrandBlock.scss';
import Logo from '../../Atoms/Logo/Logo';

/**
 * 브랜드 블록 표시 모드 타입
 * - 'separate': 60주년 마크와 워드마크를 분리해서 표시
 * - 'full': 통합된 하나의 로고로 표시
 */
export type BrandBlockMode = 'separate' | 'full';

/**
 * BrandBlock 컴포넌트의 Props 인터페이스
 * React.HTMLAttributes를 확장하여 기본 div 태그 속성들도 사용할 수 있습니다.
 */
export interface BrandBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 로고 표시 모드
   * 'separate': 60주년 마크 + 워드마크 각각 표시
   * 'full': 합쳐진 한 장의 로고 표시
   */
  mode?: BrandBlockMode;
  /**
   * separate 모드에서 워드마크의 가로 크기 (픽셀)
   * wordHeight와 둘 중 하나만 지정해도 비율에 맞게 조정됩니다
   */
  wordWidth?: number;
  /**
   * separate 모드에서 워드마크의 세로 크기 (픽셀)
   * wordWidth와 둘 중 하나만 지정해도 비율에 맞게 조정됩니다
   */
  wordHeight?: number;
  /**
   * separate 모드에서 60주년 마크의 가로 크기 (픽셀)
   */
  markWidth?: number;
  /**
   * separate 모드에서 60주년 마크의 세로 크기 (픽셀)
   */
  markHeight?: number;
  /**
   * 로고와 워드마크 사이의 간격 (픽셀)
   * 기본값: 8px
   */
  gap?: number;
  /**
   * 컴팩트 모드 활성화 여부
   * true일 경우 간격과 여백이 축소됩니다
   */
  compact?: boolean;
  /**
   * 클릭 시 이동할 URL
   * 지정하면 전체 브랜드 블록이 링크로 감싸집니다
   */
  href?: string;
  /**
   * 링크의 접근성 라벨
   * 스크린 리더 사용자를 위한 설명
   */
  ariaLabel?: string;
}

/**
 * BrandBlock 컴포넌트 구현
 *
 * memo()를 사용하여 성능 최적화를 적용했습니다.
 * props가 변경되지 않으면 리렌더링을 방지합니다.
 */
const BrandBlock: React.FC<BrandBlockProps> = memo(function BrandBlock({
  mode = 'separate', // 기본값: 분리형 모드
  markWidth, // 60주년 마크 가로 크기
  markHeight, // 60주년 마크 세로 크기
  wordWidth, // 워드마크 가로 크기
  wordHeight, // 워드마크 세로 크기
  gap = 8, // 기본값: 8px 간격
  compact = false, // 기본값: 일반 모드
  href, // 링크 URL (선택사항)
  ariaLabel, // 접근성 라벨 (선택사항)
  className, // 외부에서 전달된 추가 클래스
  ...rest // 나머지 div 태그 속성들을 spread operator로 받음
}) {
  // CSS 변수를 사용하여 동적으로 간격 설정
  const style: React.CSSProperties = {
    ['--brand-gap' as any]: `${gap}px`, // CSS 변수로 간격 전달
  };

  // 브랜드 블록의 메인 콘텐츠
  const content = (
    <div
      {...rest} // 추가 div 속성들을 전달
      className={classNames(
        // BEM 컨벤션에 따른 기본 블록 클래스
        'brand-block',
        // 모드별 modifier 클래스 (BEM: block--modifier)
        `brand-block--mode-${mode}`,
        // 조건부 modifier 클래스들
        {
          'brand-block--compact': compact, // 컴팩트 모드일 때
        },
        // 외부에서 전달된 추가 클래스
        className
      )}
      style={style} // CSS 변수가 포함된 스타일 적용
    >
      {/* Fragment를 사용하여 불필요한 래퍼 요소 방지 */}
      <>
        {/* 60주년 기념 마크 로고 */}
        <Logo
          variant="mark"
          alt="JoongAng 60th"
          className="brand-block__mark" // BEM element 클래스
          width={markWidth}
          height={markHeight}
        />
        {/* 워드마크 (텍스트 로고) */}
        <Logo
          variant="word"
          alt="The JoongAng"
          width={wordWidth}
          height={wordHeight}
          className="brand-block__word" // BEM element 클래스
        />
      </>
    </div>
  );

  // href가 제공된 경우 링크로 감싸기
  if (href) {
    return (
      <a
        href={href}
        className="brand-block-link" // BEM 블록 클래스
        aria-label={ariaLabel ?? 'Go to home'} // 기본 접근성 라벨 제공
      >
        {content} {/* 브랜드 블록 콘텐츠를 링크 안에 포함 */}
      </a>
    );
  }

  // href가 없으면 일반 div로 반환
  return content;
});

// 컴포넌트를 기본 내보내기로 설정
// 다른 파일에서 import BrandBlock from './BrandBlock'으로 사용할 수 있습니다.

export default BrandBlock;
