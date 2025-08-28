/**
 * TextLink 컴포넌트
 *
 * 이 컴포넌트는 텍스트 링크를 표시하는 재사용 가능한 컴포넌트입니다.
 * BEM 컨벤션을 사용하여 CSS 클래스를 구성하고, 접근성을 고려한 설계를 제공합니다.
 *
 * 주요 기능:
 * - 활성/비활성 상태 표시
 * - 구분선 표시 옵션
 * - 호버 효과
 * - 접근성 지원
 */

import React, { memo } from 'react';
import classNames from 'classnames';
import './TextLink.scss';

/**
 * TextLink 컴포넌트의 Props 인터페이스
 * React.AnchorHTMLAttributes를 확장하여 기본 a 태그 속성들도 사용할 수 있습니다.
 */
export interface TextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * 현재 페이지와 일치하는 링크인지 여부
   * true일 경우 강조 표시됩니다 (굵은 글씨, 브랜드 색상)
   */
  active?: boolean;
  /**
   * 비활성 상태 표시 여부
   * true일 경우 회색으로 표시되어 덜 눈에 띄게 됩니다
   */
  muted?: boolean;
  /**
   * 구분선 파이프(|) 표시 여부
   * true일 경우 링크 뒤에 파이프 문자가 표시됩니다
   */
  withSeparator?: boolean;
}

/**
 * TextLink 컴포넌트 구현
 *
 * memo()를 사용하여 성능 최적화를 적용했습니다.
 * props가 변경되지 않으면 리렌더링을 방지합니다.
 */
const TextLink: React.FC<TextLinkProps> = memo(function TextLink({
  active = false, // 기본값: 비활성 상태
  muted = false, // 기본값: 일반 색상
  withSeparator = false, // 기본값: 구분선 없음
  className,
  children, // 링크 텍스트 내용
  ...anchorProps // 나머지 a 태그 속성들을 spread operator로 받음
}) {
  return (
    <a
      {...anchorProps} // 추가 a 태그 속성들을 전달
      className={classNames(
        // BEM 컨벤션에 따른 기본 블록 클래스
        'text-link',
        // 조건부 modifier 클래스들 (BEM: block--modifier)
        {
          'text-link--active': active, // 활성 상태일 때
          'text-link--muted': muted, // 비활성 상태일 때
          'text-link--separator': withSeparator, // 구분선이 필요할 때
        },
        // 외부에서 전달된 추가 클래스
        className
      )}
    >
      {children} {/* 링크 텍스트 내용 렌더링 */}
    </a>
  );
});

// 컴포넌트를 기본 내보내기로 설정
// 다른 파일에서 import TextLink from './TextLink'으로 사용할 수 있습니다.

export default TextLink;
