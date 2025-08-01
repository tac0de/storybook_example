import React, { useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Input.module.scss';

const cx = classNames.bind(styles);

export interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  errorMessage?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'underline';
  autoResize?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  maxLength,
  minLength,
  disabled = false,
  readOnly = false,
  error = false,
  errorMessage,
  size = 'md',
  variant = 'default',
  autoResize = false,
  onFocus,
  onBlur,
  onKeyDown,
  className,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoResize && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, autoResize]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (maxLength && newValue.length > maxLength) return;
    onChange(newValue);
  };

  const characterCount = value.length;
  const showCounter = maxLength !== undefined;

  return (
    <div className={cx('input-container', className)}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
        disabled={disabled}
        readOnly={readOnly}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        className={cx('input', `size-${size}`, `variant-${variant}`, {
          error: error,
          disabled: disabled,
          readonly: readOnly,
        })}
      />
      {showCounter && (
        <div className={cx('character-counter')}>
          {characterCount}/{maxLength}
        </div>
      )}
      {error && errorMessage && (
        <div className={cx('error-message')}>{errorMessage}</div>
      )}
    </div>
  );
};
