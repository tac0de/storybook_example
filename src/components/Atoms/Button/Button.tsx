/**
 * 🎓 Button 컴포넌트 학습 가이드
 *
 * 이 파일은 React + TypeScript로 만든 재사용 가능한 Button 컴포넌트입니다.
 * 초보자를 위해 각 부분에 상세한 주석을 추가했습니다.
 */

// React 라이브러리에서 필요한 기능들을 가져옵니다
import React from 'react';

// classnames 라이브러리를 가져와서 CSS 클래스를 동적으로 조합할 수 있게 합니다
// bind 함수를 사용하면 CSS Modules와 함께 사용할 때 더 편리합니다
import classNames from 'classnames/bind';

// 이 컴포넌트의 스타일을 가져옵니다
// CSS Modules를 사용하므로 클래스명이 자동으로 고유화됩니다
import styles from './Button.module.scss';

import commentItemStyles from '../../Organisms/CommentItem/CommentItemConsolidated.module.scss';

// classnames의 bind 함수를 사용하여 스타일 객체와 바인딩합니다
// 이렇게 하면 cx('button', 'primary') 같은 방식으로 클래스를 조합할 수 있습니다

const combinedStyles = {
  ...styles,
 ...commentItemStyles,
}


const cx = classNames.bind(combinedStyles);

/**
 * 🎯 Button 컴포넌트의 Props 인터페이스 정의
 *
 * TypeScript를 사용하여 컴포넌트가 받을 수 있는 속성들을 명확하게 정의합니다.
 * 이렇게 하면:
 * 1. 타입 안전성 보장 (잘못된 타입의 props 전달 방지)
 * 2. 자동완성 지원 (IDE에서 props 자동완성)
 * 3. 문서화 효과 (코드를 보는 것만으로도 사용법 이해)
 */
export interface ButtonProps {
  /**
   * 🎨 버튼의 시각적 스타일을 결정합니다
   * - 'primary': 주요 액션용 (파란색 배경)
   * - 'secondary': 보조 액션용 (회색 배경)
   * - 'success': 성공 액션용 (초록색 배경)
   * - 'warning': 경고 액션용 (주황색 배경)
   * - 'danger': 위험 액션용 (빨간색 배경)
   * - 'outline': 아웃라인 스타일 (테두리만 있는 스타일)
   * - 'ghost': 투명 배경 (호버 시 배경색 변경)
   * - 'text': 텍스트만 있는 스타일 (링크처럼 보임)
   * - 'link': 링크 스타일 (밑줄 있는 텍스트)
   * - 'soft': 부드러운 배경색 스타일
   */
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'outline'
    | 'ghost'
    | 'text'
    | 'link'
    | 'soft';

  /**
   * 📏 버튼의 크기를 결정합니다
   * - 'xs': 매우 작은 크기 (20px 높이)
   * - 'sm': 작은 크기 (24px 높이)
   * - 'md': 중간 크기 (32px 높이) - 기본값
   * - 'lg': 큰 크기 (40px 높이)
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';

  /**
   * 🔄 버튼의 모서리 둥글기를 결정합니다
   * - 'none': 모서리 둥글기 없음
   * - 'sm': 약간 둥근 모서리
   * - 'md': 중간 둥근 모서리 - 기본값
   * - 'lg': 많이 둥근 모서리
   * - 'xl': 매우 둥근 모서리
   * - 'full': 완전히 둥근 모서리 (원형)
   */
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

  /**
   * 🏷️ HTML button 요소의 type 속성입니다
   * - 'button': 일반 버튼 (기본값)
   * - 'submit': 폼 제출 버튼
   * - 'reset': 폼 초기화 버튼
   */
  type?: 'button' | 'submit' | 'reset';

  /**
   * 🚫 버튼을 비활성화할지 결정합니다
   * true일 때 버튼이 회색으로 변하고 클릭할 수 없게 됩니다
   */
  disabled?: boolean;

  /**
   * 📐 버튼이 부모 요소의 전체 너비를 차지할지 결정합니다
   * true일 때 width: 100%가 적용됩니다
   */
  fullWidth?: boolean;

  /**
   * 👆 버튼을 클릭했을 때 실행될 함수입니다
   * React에서는 이벤트 핸들러를 props로 전달하는 것이 일반적입니다
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * 🔗 버튼 내부에 표시될 내용입니다
   * React에서는 children prop을 통해 컴포넌트 내부에 다른 요소들을 넣을 수 있습니다
   * icon prop이 있을 때는 선택적입니다
   */
  children?: React.ReactNode;

  /**
   * 🎨 추가적인 CSS 클래스를 적용할 수 있습니다
   * 컴포넌트의 기본 스타일을 유지하면서 추가 스타일링이 가능합니다
   */
  className?: string;

  /**
   * 🎯 버튼 왼쪽에 표시될 아이콘입니다
   * React 컴포넌트나 JSX 요소를 전달할 수 있습니다
   */
  leftIcon?: React.ReactNode;

  /**
   * 🎯 버튼 오른쪽에 표시될 아이콘입니다
   * React 컴포넌트나 JSX 요소를 전달할 수 있습니다
   */
  rightIcon?: React.ReactNode;

  /**
   * 🎯 버튼에 표시될 아이콘입니다 (leftIcon, rightIcon과 별개)
   * 아이콘만 있는 버튼을 만들 때 사용합니다
   */
  icon?: React.ReactNode;
}

/**
 * 🚀 Button 컴포넌트 정의
 *
 * React.FC는 "Function Component"의 줄임말로, 함수형 컴포넌트임을 명시합니다.
 * <ButtonProps>는 이 컴포넌트가 ButtonProps 타입의 props를 받는다는 의미입니다.
 */
export const Button: React.FC<ButtonProps> = ({
  // 🎯 Props 구조 분해 할당 (Destructuring Assignment)
  // 이렇게 하면 props.variant 대신 variant로 직접 사용할 수 있습니다
  variant = 'primary', // 기본값: 'primary'
  size = 'md', // 기본값: 'md'
  borderRadius = 'md', // 기본값: 'md'
  type = 'button', // 기본값: 'button'
  disabled = false, // 기본값: false
  fullWidth = false, // 기본값: false
  onClick, // 기본값 없음 (선택적 prop)
  children, // 필수 prop (기본값 없음)
  className, // 기본값 없음 (선택적 prop)
  leftIcon, // 기본값 없음 (선택적 prop)
  rightIcon, // 기본값 없음 (선택적 prop)
  icon, // 기본값 없음 (선택적 prop)
}) => {

  /**
   * 🎨 CSS 클래스 조합 로직
   *
   * cx() 함수를 사용하여 여러 클래스를 조건부로 조합합니다.
   * 이렇게 하면 props에 따라 동적으로 스타일이 적용됩니다.
   */
  const buttonClasses =
    cx(
    // 🎯 기본 클래스 (항상 적용)
    'button',
    
    // 🎨 variant에 따른 클래스 (조건부 적용)
    `variant-${variant}`,
    
    // 📏 size에 따른 클래스 (조건부 적용)
    `size-${size}`,
    
    // 🔄 borderRadius에 따른 클래스 (조건부 적용)
    `border-radius-${borderRadius}`,
    
    // 📐 fullWidth가 true일 때 적용되는 클래스
    {
      'full-width': fullWidth,
    },
    
    // 🎨 사용자가 전달한 추가 클래스
    className
  );

  /**
   * 🎯 클릭 이벤트 핸들러
   *
   * 버튼이 비활성화되어 있거나 onClick 함수가 없으면 아무것도 하지 않습니다.
   * 이렇게 하면 불필요한 함수 호출을 방지할 수 있습니다.
   */
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // 🚫 비활성화된 버튼은 클릭해도 아무것도 하지 않음
    if (disabled) {
      return;
    }

    // 👆 onClick 함수가 전달되었다면 실행
    if (onClick) {
      onClick(event);
    }
  };

  /**
   * 🎨 버튼 내용 렌더링 로직
   *
   * icon prop이 있으면 아이콘만 표시하고,
   * 그렇지 않으면 leftIcon + children + rightIcon 순서로 표시합니다.
   */
  const renderContent = () => {
    // 🎯 icon prop이 있으면 아이콘만 표시
    if (icon) {
      return <span className={cx('icon', 'icon-only')}>{icon}</span>;
    }


    // 🎯 일반적인 경우: leftIcon + children + rightIcon
    return (
      <>
        {/* 왼쪽 아이콘이 있으면 표시 */}
        {leftIcon && (
          <span className={cx('icon', 'left-icon')}>{leftIcon}</span>
        )}

        {/* 버튼의 주요 내용 (텍스트 등) */}
        <span className={cx('content')}>{children}</span>

        {/* 오른쪽 아이콘이 있으면 표시 */}
        {rightIcon && (
          <span className={cx('icon', 'right-icon')}>{rightIcon}</span>
        )}
      </>
    );
  };

  /**
   * 🎨 JSX 반환
   *
   * React 컴포넌트는 JSX를 반환해야 합니다.
   * 여기서는 HTML button 요소를 반환하되, React의 이벤트 핸들링과 props를 적용합니다.
   */
  return (
    <button
      // 🏷️ HTML button 요소의 기본 속성들
      type={type}
      disabled={disabled}
      // 🎨 CSS 클래스 적용
      className={buttonClasses}
      // 👆 클릭 이벤트 핸들러 연결
      onClick={handleClick}
      // 🎯 접근성을 위한 속성들
      aria-disabled={disabled}
      role='button'
    >
      {/* 🎨 버튼 내용 렌더링 */}
      {renderContent()}
    </button>
  );
};

/**
 * 📝 사용 예시:
 *
 * // 기본 버튼
 * <Button onClick={() => alert('클릭!')}>
 *   클릭하세요
 * </Button>
 *
 * // 주요 액션 버튼 (큰 크기)
 * <Button variant="primary" size="lg" onClick={handleSubmit}>
 *   제출하기
 * </Button>
 *
 * // 아이콘이 있는 버튼
 * <Button leftIcon={<Icon />} onClick={handleSave}>
 *   저장하기
 * </Button>
 *
 * // 비활성화된 버튼
 * <Button disabled>
 *   로딩 중...
 * </Button>
 */
