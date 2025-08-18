/**
 * 🎓 Input 컴포넌트 학습 가이드
 *
 * 이 파일은 React + TypeScript로 만든 재사용 가능한 Input 컴포넌트입니다.
 * 텍스트 입력 필드로, textarea 기반으로 구현되어 여러 줄 입력이 가능합니다.
 * 초보자를 위해 각 부분에 상세한 주석을 추가했습니다.
 */

// React 라이브러리에서 필요한 기능들을 가져옵니다
// useRef: DOM 요소에 직접 접근할 때 사용
// useEffect: 컴포넌트의 생명주기와 관련된 작업을 처리할 때 사용
import React, { useRef, useEffect } from 'react';

// classnames 라이브러리를 가져와서 CSS 클래스를 동적으로 조합할 수 있게 합니다
// bind 함수를 사용하면 CSS Modules와 함께 사용할 때 더 편리합니다
import classNames from 'classnames/bind';

// 이 컴포넌트의 스타일을 가져옵니다
// CSS Modules를 사용하므로 클래스명이 자동으로 고유화됩니다
import styles from './Input.module.scss';

// classnames의 bind 함수를 사용하여 스타일 객체와 바인딩합니다
// 이렇게 하면 cx('input', 'size-md') 같은 방식으로 클래스를 조합할 수 있습니다
const cx = classNames.bind(styles);

/**
 * 🎯 Input 컴포넌트의 Props 인터페이스 정의
 *
 * TypeScript를 사용하여 컴포넌트가 받을 수 있는 속성들을 명확하게 정의합니다.
 * 이렇게 하면 타입 안전성과 자동완성을 보장할 수 있습니다.
 */
export interface InputProps {
  /**
   * 📝 입력 필드의 현재 값입니다
   * 이 값은 부모 컴포넌트에서 관리되며, 제어 컴포넌트(Controlled Component) 패턴을 사용합니다
   */
  value: string;

  /**
   * 🔄 값이 변경될 때 호출되는 콜백 함수입니다
   * 부모 컴포넌트에서 상태를 업데이트하는 데 사용됩니다
   * @param value - 새로운 입력 값
   */
  onChange: (value: string) => void;

  /**
   * 💡 입력 필드가 비어있을 때 표시되는 힌트 텍스트입니다
   * 사용자에게 어떤 내용을 입력해야 하는지 안내합니다
   */
  placeholder?: string;

  /**
   * 📏 입력할 수 있는 최대 문자 수입니다
   * 이 값을 초과하면 더 이상 입력할 수 없습니다
   */
  maxLength?: number;

  /**
   * 📏 입력해야 하는 최소 문자 수입니다
   * 유효성 검사에 사용될 수 있습니다
   */
  minLength?: number;

  /**
   * 🚫 입력 필드를 비활성화할지 결정합니다
   * true일 때 입력할 수 없고 회색으로 표시됩니다
   */
  disabled?: boolean;

  /**
   * 📖 입력 필드를 읽기 전용으로 설정할지 결정합니다
   * true일 때 입력할 수 없지만 복사는 가능합니다
   */
  readOnly?: boolean;

  /**
   * ❌ 입력 필드에 오류가 있는지 표시합니다
   * true일 때 빨간색 테두리와 오류 메시지가 표시됩니다
   */
  error?: boolean;

  /**
   * ❌ 오류 메시지입니다
   * error가 true일 때 표시됩니다
   */
  errorMessage?: string;

  /**
   * 📏 입력 필드의 크기를 결정합니다
   * - 'sm': 작은 크기
   * - 'md': 중간 크기 (기본값)
   * - 'lg': 큰 크기
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * 🎨 입력 필드의 시각적 스타일을 결정합니다
   * - 'default': 기본 스타일 (테두리가 있는 박스)
   * - 'underline': 밑줄 스타일 (테두리 없이 밑줄만)
   */
  variant?: 'default' | 'underline';

  /**
   * 📐 입력 필드의 높이를 내용에 맞게 자동 조정할지 결정합니다
   * true일 때 텍스트가 많아지면 높이가 자동으로 늘어납니다
   */
  autoResize?: boolean;

  /**
   * 🎯 입력 필드가 포커스를 받았을 때 호출되는 콜백 함수입니다
   * 사용자가 입력 필드를 클릭하거나 Tab으로 이동했을 때 실행됩니다
   */
  onFocus?: () => void;

  /**
   * 🎯 입력 필드가 포커스를 잃었을 때 호출되는 콜백 함수입니다
   * 사용자가 다른 곳을 클릭하거나 Tab으로 이동했을 때 실행됩니다
   */
  onBlur?: () => void;

  /**
   * ⌨️ 키보드 이벤트가 발생했을 때 호출되는 콜백 함수입니다
   * Enter 키 감지나 특수 키 조합 처리에 사용됩니다
   */
  onKeyDown?: (e: React.KeyboardEvent) => void;

  /**
   * 🎨 추가적인 CSS 클래스를 적용할 수 있습니다
   * 컴포넌트의 기본 스타일을 유지하면서 추가 스타일링이 가능합니다
   */
  className?: string;
}

/**
 * 🚀 Input 컴포넌트 정의
 *
 * React.FC는 "Function Component"의 줄임말로, 함수형 컴포넌트임을 명시합니다.
 * <InputProps>는 이 컴포넌트가 InputProps 타입의 props를 받는다는 의미입니다.
 */
export const Input: React.FC<InputProps> = ({
  // 🎯 Props 구조 분해 할당 (Destructuring Assignment)
  value, // 현재 값 (필수)
  onChange, // 값 변경 핸들러 (필수)
  placeholder, // 플레이스홀더 (선택적)
  maxLength, // 최대 길이 (선택적)
  minLength, // 최소 길이 (선택적)
  disabled = false, // 비활성화 여부 (기본값: false)
  readOnly = false, // 읽기 전용 여부 (기본값: false)
  error = false, // 오류 여부 (기본값: false)
  errorMessage, // 오류 메시지 (선택적)
  size = 'md', // 크기 (기본값: 'md')
  variant = 'default', // 스타일 변형 (기본값: 'default')
  autoResize = false, // 자동 크기 조정 (기본값: false)
  onFocus, // 포커스 핸들러 (선택적)
  onBlur, // 블러 핸들러 (선택적)
  onKeyDown, // 키보드 이벤트 핸들러 (선택적)
  className, // 추가 CSS 클래스 (선택적)
}) => {
  /**
   * 🎯 textarea DOM 요소에 대한 참조
   *
   * useRef는 DOM 요소에 직접 접근할 때 사용하는 React Hook입니다.
   * 여기서는 autoResize 기능을 위해 textarea의 높이를 조정하는 데 사용됩니다.
   */
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /**
   * 🔄 자동 크기 조정 효과
   *
   * useEffect는 컴포넌트가 렌더링된 후 실행되는 React Hook입니다.
   * 여기서는 value나 autoResize가 변경될 때마다 textarea의 높이를 조정합니다.
   */
  useEffect(() => {
    // 🎯 autoResize가 활성화되어 있고 textarea 요소가 존재할 때만 실행
    if (autoResize && textareaRef.current) {
      // 📐 높이를 'auto'로 설정하여 내용에 맞는 자연스러운 높이 계산
      textareaRef.current.style.height = 'auto';
      // 📐 scrollHeight를 사용하여 실제 내용 높이에 맞게 조정
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, autoResize]); // 🎯 value나 autoResize가 변경될 때마다 실행

  /**
   * 🔄 입력 값 변경 핸들러
   *
   * 사용자가 텍스트를 입력할 때마다 호출되는 함수입니다.
   * maxLength 제한을 확인하고 부모 컴포넌트에 새로운 값을 전달합니다.
   *
   * @param e - React의 ChangeEvent 객체 (textarea의 변경 이벤트)
   */
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;

    // 📏 maxLength 제한 확인
    if (maxLength && newValue.length > maxLength) return;

    // 🔄 부모 컴포넌트에 새로운 값 전달
    onChange(newValue);
  };

  /**
   * 📊 현재 입력된 문자 수 계산
   *
   * 문자 카운터를 표시하기 위해 현재 값의 길이를 계산합니다.
   */
  const characterCount = value.length;

  /**
   * 📊 문자 카운터 표시 여부 결정
   *
   * maxLength가 설정되어 있을 때만 카운터를 표시합니다.
   */
  const showCounter = maxLength !== undefined;

  /**
   * 🎨 JSX 반환
   *
   * React 컴포넌트는 JSX를 반환해야 합니다.
   * 여기서는 입력 필드 컨테이너를 반환하되, 다양한 상태와 기능을 포함합니다.
   */
  return (
    <div className={cx('input-container', className)}>
      {/* 📝 텍스트 입력 필드 */}
      <textarea
        // 🎯 DOM 참조 연결 (autoResize 기능용)
        ref={textareaRef}
        // 📝 입력 필드의 기본 속성들
        value={value} // 현재 값
        onChange={handleChange} // 값 변경 핸들러
        placeholder={placeholder} // 플레이스홀더
        maxLength={maxLength} // 최대 길이
        minLength={minLength} // 최소 길이
        disabled={disabled} // 비활성화 여부
        readOnly={readOnly} // 읽기 전용 여부
        // 🎯 이벤트 핸들러들
        onFocus={onFocus} // 포커스 이벤트
        onBlur={onBlur} // 블러 이벤트
        onKeyDown={onKeyDown} // 키보드 이벤트
        // 🎨 CSS 클래스 조합
        className={cx(
          'input', // 기본 입력 필드 클래스
          `size-${size}`, // 크기에 따른 클래스
          `variant-${variant}`, // 스타일 변형에 따른 클래스
          {
            error, // 오류 상태 클래스
            disabled, // 비활성화 상태 클래스
            readonly: readOnly, // 읽기 전용 상태 클래스
          }
        )}
      />

      {/* 📊 문자 카운터 (maxLength가 설정되어 있을 때만 표시) */}
      {showCounter && (
        <div className={cx('character-counter')}>
          {characterCount}/{maxLength}
        </div>
      )}

      {/* ❌ 오류 메시지 (오류가 있고 메시지가 있을 때만 표시) */}
      {error && errorMessage && (
        <div className={cx('error-message')}>{errorMessage}</div>
      )}
    </div>
  );
};

/**
 * 📝 사용 예시:
 *
 * // 기본 입력 필드
 * <Input
 *   value={text}
 *   onChange={setText}
 *   placeholder="메시지를 입력하세요"
 * />
 *
 * // 최대 길이 제한이 있는 입력 필드
 * <Input
 *   value={text}
 *   onChange={setText}
 *   maxLength={100}
 *   placeholder="100자 이내로 입력하세요"
 * />
 *
 * // 오류 상태의 입력 필드
 * <Input
 *   value={text}
 *   onChange={setText}
 *   error={true}
 *   errorMessage="필수 입력 항목입니다"
 * />
 *
 * // 자동 크기 조정이 가능한 입력 필드
 * <Input
 *   value={text}
 *   onChange={setText}
 *   autoResize={true}
 *   placeholder="여러 줄 입력 가능"
 * />
 *
 * // 밑줄 스타일의 입력 필드
 * <Input
 *   value={text}
 *   onChange={setText}
 *   variant="underline"
 *   placeholder="밑줄 스타일"
 * />
 */
