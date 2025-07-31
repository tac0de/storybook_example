import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Input } from '../../Atoms/Input';
import { Button } from '../../Atoms/Button';
import styles from './ReplyForm.module.scss';

const cx = classNames.bind(styles);

export interface ReplyFormProps {
  onSubmit?: (value: string) => void;
  onCancel?: () => void;
  initialValue?: string;
  placeholder?: string;
  maxLength?: number;
  loading?: boolean;
  disabled?: boolean;
  showCancelButton?: boolean;
  className?: string;
}

/**
 * ReplyForm 분자(Molecule) 컴포넌트입니다.
 * Input과 Button을 조합하여 답글 작성 폼을 제공합니다.
 * CommentForm보다 작은 크기로 설계되었습니다.
 */
export const ReplyForm: React.FC<ReplyFormProps> = ({
  onSubmit,
  onCancel,
  initialValue = '',
  placeholder = '답글을 입력하세요...',
  maxLength = 300,
  loading = false,
  disabled = false,
  showCancelButton = true,
  className,
}) => {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    setIsValid(value.trim().length > 0 && value.trim().length <= maxLength);
  }, [value, maxLength]);

  const handleSubmit = () => {
    if (isValid && onSubmit) {
      onSubmit(value.trim());
      setValue('');
    }
  };

  const handleCancel = () => {
    setValue('');
    onCancel?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const remainingChars = maxLength - value.length;
  const isOverLimit = remainingChars < 0;

  return (
    <div className={cx('reply-form', className)}>
      <div className={cx('input-section')}>
        <Input
          value={value}
          onChange={setValue}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled || loading}
          autoResize={true}
          onKeyDown={handleKeyDown}
          className={cx('reply-input')}
        />
        {maxLength && (
          <div className={cx('character-limit', { 'over-limit': isOverLimit })}>
            {remainingChars}
          </div>
        )}
      </div>

      <div className={cx('button-section')}>
        {showCancelButton && (
          <Button
            variant='ghost'
            size='sm'
            onClick={handleCancel}
            disabled={disabled || loading}
            className={cx('cancel-button')}
          >
            취소
          </Button>
        )}

        <Button
          variant='primary'
          size='sm'
          onClick={handleSubmit}
          disabled={disabled || loading || !isValid}
          className={cx('submit-button')}
        >
          {loading ? '등록 중...' : '답글'}
        </Button>
      </div>
    </div>
  );
};
