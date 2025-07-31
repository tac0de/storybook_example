import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './TestComponent.module.scss';

const cx = classNames.bind(styles);

/**
 * TestComponent Props 인터페이스
 *
 * TypeScript에서 컴포넌트의 props를 정의하는 방법입니다.
 * 각 prop의 타입과 설명을 명확히 작성합니다.
 */
export interface TestComponentProps {
  /** 컴포넌트에 표시할 텍스트 */
  text: string;
  /** 컴포넌트의 크기 (sm, md, lg) */
  size?: 'sm' | 'md' | 'lg';
  /** 컴포넌트의 색상 변형 */
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  /** 컴포넌트가 비활성화되었는지 여부 */
  disabled?: boolean;
  /** 클릭 이벤트 핸들러 */
  onClick?: () => void;
  /** 추가 CSS 클래스명 */
  className?: string;
}

/**
 * TestComponent - React + TypeScript + Storybook 튜토리얼 컴포넌트
 *
 * 이 컴포넌트는 다음 개념들을 보여줍니다:
 * 1. TypeScript를 사용한 타입 안전성
 * 2. React Hooks (useState, useEffect, useRef)를 사용한 상태 관리
 * 3. CSS Modules와 classnames/bind를 사용한 스타일링
 * 4. Props를 통한 컴포넌트 커스터마이징
 * 5. 이벤트 핸들링
 * 6. 조건부 렌더링
 * 7. 사이드 이펙트 관리 (useEffect)
 * 8. DOM 요소 직접 접근 (useRef)
 */
export const TestComponent: React.FC<TestComponentProps> = ({
  text,
  size = 'md',
  variant = 'primary',
  disabled = false,
  onClick,
  className,
}) => {
  // React Hooks를 사용한 상태 관리
  // useState는 컴포넌트 내부에서 상태를 관리할 때 사용합니다.
  const [isHovered, setIsHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);

  // useRef를 사용한 DOM 요소 참조
  // useRef는 DOM 요소에 직접 접근하거나 값을 저장할 때 사용합니다.
  const componentRef = useRef<HTMLDivElement>(null);
  const previousClickCountRef = useRef<number>(0);

  // useEffect를 사용한 사이드 이펙트 관리
  // useEffect는 컴포넌트의 생명주기와 관련된 작업을 처리합니다.
  useEffect(() => {
    // 컴포넌트가 마운트될 때 실행
    console.log('TestComponent mounted');
    setRenderCount(prev => prev + 1);

    // 클린업 함수 (컴포넌트가 언마운트될 때 실행)
    return () => {
      console.log('TestComponent unmounted');
    };
  }, []); // 빈 배열: 마운트/언마운트 시에만 실행

  useEffect(() => {
    // clickCount가 변경될 때마다 실행
    console.log(
      `Click count changed from ${previousClickCountRef.current} to ${clickCount}`
    );
    previousClickCountRef.current = clickCount;

    // DOM 요소에 직접 접근 예시
    if (componentRef.current) {
      componentRef.current.style.transform = `scale(${1 + clickCount * 0.1})`;
    }
  }, [clickCount]); // clickCount가 변경될 때마다 실행

  /**
   * 클릭 이벤트 핸들러
   *
   * 이 함수는 다음을 수행합니다:
   * 1. 클릭 카운트 증가
   * 2. 부모 컴포넌트로부터 전달받은 onClick 함수 호출
   * 3. 콘솔에 로그 출력 (디버깅용)
   */
  const handleClick = () => {
    if (disabled) return; // 비활성화된 경우 클릭 무시

    setClickCount(prev => prev + 1);
    onClick?.(); // optional chaining을 사용한 안전한 함수 호출

    console.log(`TestComponent clicked! Count: ${clickCount + 1}`);
  };

  /**
   * 마우스 이벤트 핸들러
   *
   * hover 상태를 관리하여 시각적 피드백을 제공합니다.
   */
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // CSS Modules와 classnames/bind를 사용한 조건부 클래스 적용
  const componentClasses = cx(
    'test-component',
    `size-${size}`,
    `variant-${variant}`,
    {
      disabled: disabled,
      hovered: isHovered,
    },
    className
  );

  // 조건부 렌더링 예제
  // 클릭 카운트가 5 이상일 때 특별한 메시지 표시
  const renderClickMessage = () => {
    if (clickCount >= 5) {
      return (
        <span className={cx('special-message')}>
          🎉 축하합니다! 많이 클릭하셨네요!
        </span>
      );
    }
    return null;
  };

  return (
    <div
      ref={componentRef}
      className={componentClasses}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role='button'
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      {/* 기본 텍스트 표시 */}
      <span className={cx('text')}>{text}</span>

      {/* 클릭 카운트 표시 */}
      <span className={cx('click-count')}>클릭: {clickCount}회</span>

      {/* 조건부 렌더링된 특별 메시지 */}
      {renderClickMessage()}

      {/* 상태 표시 (개발용) */}
      <div className={cx('status-indicators')}>
        <span className={cx('status', { active: isHovered })}>
          {isHovered ? '🟢 Hovered' : '⚪ Not Hovered'}
        </span>
        <span className={cx('status', { active: disabled })}>
          {disabled ? '🔴 Disabled' : '🟢 Enabled'}
        </span>
        <span className={cx('status')}>🔄 렌더: {renderCount}회</span>
      </div>
    </div>
  );
};
