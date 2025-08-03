/**
 * 🎓 TextInputForm 컴포넌트 학습 가이드
 * 
 * 이 파일은 React + TypeScript로 만든 재사용 가능한 TextInputForm 컴포넌트입니다.
 * 텍스트 입력과 제출 버튼을 포함한 폼 컴포넌트로, 댓글 작성이나 메시지 전송에 사용됩니다.
 * Atoms 레벨의 Input과 Button 컴포넌트를 조합하여 만든 Molecules 레벨 컴포넌트입니다.
 * 초보자를 위해 각 부분에 상세한 주석을 추가했습니다.
 */

// React 라이브러리에서 필요한 기능들을 가져옵니다
// useState: 컴포넌트 내부 상태를 관리할 때 사용하는 React Hook
import React, { useState } from 'react';

// classnames 라이브러리를 가져와서 CSS 클래스를 동적으로 조합할 수 있게 합니다
// bind 함수를 사용하면 CSS Modules와 함께 사용할 때 더 편리합니다
import classNames from 'classnames/bind';

// Atoms 레벨의 컴포넌트들을 가져옵니다
// 이 컴포넌트는 Input과 Button 컴포넌트를 조합하여 더 복잡한 기능을 제공합니다
import { Button } from '../../Atoms/Button';
import { Input } from '../../Atoms/Input';

// 이 컴포넌트의 스타일을 가져옵니다
// CSS Modules를 사용하므로 클래스명이 자동으로 고유화됩니다
import styles from './TextInputForm.module.scss';

// classnames의 bind 함수를 사용하여 스타일 객체와 바인딩합니다
// 이렇게 하면 cx('text-input-form') 같은 방식으로 클래스를 조합할 수 있습니다
const cx = classNames.bind(styles);

/**
 * 🎯 TextInputForm 컴포넌트의 Props 인터페이스 정의
 * 
 * TypeScript를 사용하여 컴포넌트가 받을 수 있는 속성들을 명확하게 정의합니다.
 * 이렇게 하면 타입 안전성과 자동완성을 보장할 수 있습니다.
 */
export interface TextInputFormProps {
  /**
   * 📤 폼 제출 시 호출되는 콜백 함수입니다
   * 사용자가 텍스트를 입력하고 제출 버튼을 클릭했을 때 실행됩니다
   * @param value - 입력된 텍스트 (앞뒤 공백 제거됨)
   */
  onSubmit?: (value: string) => void;

  /**
   * 💡 입력 필드에 표시될 플레이스홀더 텍스트입니다
   * 사용자에게 어떤 내용을 입력해야 하는지 안내합니다
   * 기본값: '내용을 입력하세요...'
   */
  placeholder?: string;

  /**
   * 📏 입력할 수 있는 최대 문자 수입니다
   * 이 값을 초과하면 더 이상 입력할 수 없습니다
   * 기본값: 500
   */
  maxLength?: number;

  /**
   * 📝 제출 버튼에 표시될 텍스트입니다
   * "작성", "전송", "댓글" 등 상황에 맞는 텍스트를 설정할 수 있습니다
   * 기본값: '작성'
   */
  submitText?: string;

  /**
   * 🎨 추가적인 CSS 클래스를 적용할 수 있습니다
   * 컴포넌트의 기본 스타일을 유지하면서 추가 스타일링이 가능합니다
   */
  className?: string;
}

/**
 * 🚀 TextInputForm 컴포넌트 정의
 * 
 * React.FC는 "Function Component"의 줄임말로, 함수형 컴포넌트임을 명시합니다.
 * <TextInputFormProps>는 이 컴포넌트가 TextInputFormProps 타입의 props를 받는다는 의미입니다.
 * 
 * 이 컴포넌트는 내부 상태를 가지고 있어서 제어 컴포넌트(Controlled Component) 패턴을 사용합니다.
 */
export const TextInputForm: React.FC<TextInputFormProps> = ({
  // 🎯 Props 구조 분해 할당 (Destructuring Assignment)
  onSubmit,                    // 제출 핸들러 (선택적)
  placeholder = '내용을 입력하세요...',  // 플레이스홀더 (기본값 설정)
  maxLength = 500,             // 최대 길이 (기본값: 500)
  submitText = '작성',         // 제출 버튼 텍스트 (기본값: '작성')
  className,                   // 추가 CSS 클래스 (선택적)
}) => {
  /**
   * 📝 입력 필드의 현재 값을 관리하는 상태
   * 
   * useState는 React Hook으로, 컴포넌트 내부에서 상태를 관리할 때 사용합니다.
   * [현재값, 값을 변경하는 함수] 형태로 반환됩니다.
   * 초기값은 빈 문자열('')로 설정됩니다.
   */
  const [value, setValue] = useState('');

  /**
   * 📤 폼 제출 핸들러
   * 
   * 사용자가 제출 버튼을 클릭했을 때 실행되는 함수입니다.
   * 입력된 텍스트가 유효한지 확인하고, 부모 컴포넌트에 전달한 후 입력 필드를 초기화합니다.
   */
  const handleSubmit = () => {
    // 🎯 입력된 텍스트가 있고(공백 제거 후), onSubmit 함수가 전달되었을 때만 실행
    if (value.trim() && onSubmit) {
      // 📤 부모 컴포넌트에 공백이 제거된 텍스트 전달
      onSubmit(value.trim());
      // 🔄 입력 필드 초기화 (빈 문자열로 설정)
      setValue('');
    }
  };

  /**
   * 🎨 JSX 반환
   * 
   * React 컴포넌트는 JSX를 반환해야 합니다.
   * 여기서는 입력 필드와 제출 버튼을 포함한 폼 컨테이너를 반환합니다.
   */
  return (
    <div className={cx('text-input-form', className)}>
      {/* 📝 텍스트 입력 필드 */}
      <Input
        value={value}                    // 현재 입력 값
        onChange={setValue}              // 값 변경 핸들러 (setValue 함수 직접 전달)
        placeholder={placeholder}        // 플레이스홀더 텍스트
        maxLength={maxLength}            // 최대 입력 길이
        className={cx('text-input')}     // 입력 필드 전용 CSS 클래스
      />
      
      {/* 📤 제출 버튼 */}
      <Button
        variant='primary'                // 주요 액션 스타일 (파란색 배경)
        size='sm'                        // 작은 크기
        onClick={handleSubmit}           // 클릭 핸들러
        disabled={!value.trim()}         // 텍스트가 없으면 비활성화
        className={cx('submit-button')}  // 제출 버튼 전용 CSS 클래스
      >
        {submitText}                     {/* 버튼에 표시될 텍스트 */}
      </Button>
    </div>
  );
};

/**
 * 📝 사용 예시:
 * 
 * // 기본 사용법 (댓글 작성)
 * <TextInputForm 
 *   onSubmit={(text) => console.log('댓글:', text)} 
 *   placeholder="댓글을 입력하세요..." 
 *   submitText="댓글 작성" 
 * />
 * 
 * // 메시지 전송용
 * <TextInputForm 
 *   onSubmit={(text) => sendMessage(text)} 
 *   placeholder="메시지를 입력하세요..." 
 *   submitText="전송" 
 *   maxLength={1000} 
 * />
 * 
 * // 간단한 노트 작성용
 * <TextInputForm 
 *   onSubmit={(text) => saveNote(text)} 
 *   placeholder="메모를 입력하세요..." 
 *   submitText="저장" 
 *   maxLength={200} 
 * />
 * 
 * 🎯 이 컴포넌트의 특징:
 * 1. 자동 상태 관리: 입력값을 내부에서 관리하여 사용하기 편리
 * 2. 유효성 검사: 빈 텍스트나 공백만 있는 경우 제출 방지
 * 3. 자동 초기화: 제출 후 입력 필드가 자동으로 비워짐
 * 4. 유연한 설정: placeholder, maxLength, submitText 등을 props로 커스터마이징 가능
 * 5. 접근성: 적절한 HTML 구조와 버튼 상태 관리
 * 
 * 🏗️ 컴포넌트 계층 구조:
 * TextInputForm (Molecules)
 * ├── Input (Atoms)
 * └── Button (Atoms)
 */ 