import { Button } from '../../Atoms/Button';
import { Input } from '../../Atoms/Input';

import styles from './CommentInput.module.scss';

import type React from 'react';

/**
 * CommentInput 컴포넌트의 props를 정의합니다.
 */
export interface CommentInputProps {
  /** 입력값 */
  readonly value: string;
  /** 값 변경 핸들러 */
  readonly onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** 전송 핸들러 */
  readonly onSubmit: () => void;
  /** 키 입력 핸들러 */
  readonly onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  /** placeholder */
  readonly placeholder?: string;
  /** 비활성화 여부 */
  readonly disabled?: boolean;
  /** 추가 클래스 */
  readonly className?: string;
}

/**
 * 댓글 입력을 위한 `Input`과 `Button`을 조합한 분자(Molecule) 컴포넌트입니다.
 * 사용자가 텍스트를 입력하고 '등록' 버튼을 클릭하거나 Enter 키를 눌러 댓글을 제출할 수 있습니다.
 * @param {CommentInputProps} props - 댓글 입력 컴포넌트의 props.
 * @returns {React.ReactElement} - 렌더링된 댓글 입력 컴포넌트.
 */
export const CommentInput: React.FC<CommentInputProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = '댓글을 입력하세요',
  disabled = false,
  className = '',
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !disabled) {
      onSubmit();
    }
  };

  return (
    <div className={[styles.commentInput, className].filter(Boolean).join(' ')}>
      <Input
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        size='medium'
      />
      <Button
        variant='primary'
        size='medium'
        onClick={onSubmit}
        disabled={disabled || !value.trim()}
      >
        등록
      </Button>
    </div>
  );
};
