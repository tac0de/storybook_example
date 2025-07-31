import React from 'react';
import classNames from 'classnames/bind';
import { Button } from '../../Atoms/Button';
import styles from './ReplyToggle.module.scss';

const cx = classNames.bind(styles);

export interface ReplyToggleProps {
  replyCount: number;
  isExpanded: boolean;
  onToggle: () => void;
  disabled?: boolean;
  className?: string;
}

/**
 * ReplyToggle 분자(Molecule) 컴포넌트입니다.
 * Button을 기반으로 하여 답글 표시/숨김 토글과 답글 수를 표시합니다.
 */
export const ReplyToggle: React.FC<ReplyToggleProps> = ({
  replyCount,
  isExpanded,
  onToggle,
  disabled = false,
  className,
}) => {
  if (replyCount === 0) {
    return null;
  }

  const getToggleText = () => {
    if (isExpanded) {
      return `답글 숨기기 (${replyCount})`;
    }
    return `답글 보기 (${replyCount})`;
  };

  const getToggleIcon = () => {
    return isExpanded ? '▼' : '▶';
  };

  return (
    <div className={cx('reply-toggle-container', className)}>
      <Button
        variant='text'
        size='sm'
        onClick={onToggle}
        disabled={disabled}
        className={cx('reply-toggle-button', {
          expanded: isExpanded,
        })}
      >
        <span className={cx('toggle-icon')}>{getToggleIcon()}</span>
        <span className={cx('toggle-text')}>{getToggleText()}</span>
      </Button>
    </div>
  );
};
