import { Button } from '../../Atoms/Button';
import { Input } from '../../Atoms/Input';
import { Avatar } from '../../Atoms/Avatar';

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
  /** 로딩 상태 */
  readonly loading?: boolean;
  /** 최대 글자 수 */
  readonly maxLength?: number;
  /** 최소 글자 수 */
  readonly minLength?: number;
  /** 사용자 아바타 URL */
  readonly userAvatar?: string;
  /** 사용자 이름 */
  readonly userName?: string;
  /** 입력 크기 */
  readonly size?: 'sm' | 'md' | 'lg';
  /** 버튼 텍스트 */
  readonly submitText?: string;
  /** 에러 메시지 */
  readonly error?: string;
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
  loading = false,
  maxLength,
  minLength,
  userAvatar,
  userName,
  size = 'md',
  submitText = '등록',
  error,
  className = '',
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !disabled && !loading) {
      onSubmit();
    }
  };

  const isSubmitDisabled =
    disabled ||
    loading ||
    !value.trim() ||
    (minLength ? value.trim().length < minLength : false);

  const inputSize = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md';
  const buttonSize = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md';

  return (
    <div className={`space-y-3 ${className}`}>
      {/* 사용자 정보가 있는 경우 */}
      {userName && (
        <div className='flex items-center gap-2'>
          <Avatar src={userAvatar} alt={userName} size='sm' status='online' />
          <span className='text-sm font-medium text-gray-700'>{userName}</span>
        </div>
      )}

      {/* 입력 영역 */}
      <div className='flex gap-2 items-start'>
        <div className='flex-1'>
          <Input
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            size={inputSize}
            maxLength={maxLength}
            minLength={minLength}
            error={error}
            variant='outline'
            rightIcon={
              maxLength && (
                <span className='text-xs text-gray-400'>
                  {value.length}/{maxLength}
                </span>
              )
            }
          />
        </div>
        <Button
          onClick={onSubmit}
          disabled={isSubmitDisabled}
          loading={loading}
          size={buttonSize}
          variant='primary'
          borderRadius='md'
        >
          {submitText}
        </Button>
      </div>

      {/* 추가 정보 */}
      {minLength && (
        <p className='text-xs text-gray-500'>
          최소 {minLength}자 이상 입력해주세요
        </p>
      )}
    </div>
  );
};
