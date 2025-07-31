import React from 'react';
import classNames from 'classnames/bind';
import { Avatar } from '../../Atoms/Avatar';
import styles from './CommentHeader.module.scss';

const cx = classNames.bind(styles);

export interface CommentHeaderProps {
  authorName: string;
  authorAvatar?: string;
  timestamp: string;
  authorStatus?: 'online' | 'offline' | 'away' | 'busy';
  onAuthorClick?: () => void;
  className?: string;
}

/**
 * CommentHeader 분자(Molecule) 컴포넌트입니다.
 * Avatar와 텍스트를 조합하여 댓글 작성자 정보를 표시합니다.
 */
export const CommentHeader: React.FC<CommentHeaderProps> = ({
  authorName,
  authorAvatar,
  timestamp,
  authorStatus,
  onAuthorClick,
  className,
}) => {
  const handleAuthorClick = () => {
    onAuthorClick?.();
  };

  return (
    <div className={cx('comment-header', className)}>
      <div className={cx('avatar-section')}>
        <Avatar
          src={authorAvatar}
          alt={authorName}
          size='sm'
          status={authorStatus}
        />
      </div>
      <div className={cx('content-section')}>
        <div className={cx('author-info')}>
          <button
            className={cx('author-name')}
            onClick={handleAuthorClick}
            type='button'
          >
            {authorName}
          </button>
          {authorStatus && (
            <span className={cx('author-status', `status-${authorStatus}`)}>
              {authorStatus}
            </span>
          )}
        </div>
        <div className={cx('timestamp')}>{timestamp}</div>
      </div>
    </div>
  );
};
