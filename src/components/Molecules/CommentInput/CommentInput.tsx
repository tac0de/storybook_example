import { Button } from '../../Atoms/Button';
import { Input } from '../../Atoms/Input';

import styles from './CommentInput.module.scss';

import type React from 'react';

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
