import React from 'react';
import classNames from 'classnames/bind';
import { Button } from '../../Atoms/Button';
import styles from './CommentActions.module.scss';

const cx = classNames.bind(styles);

// SVG Icons
const HeartIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
      fill={filled ? 'currentColor' : 'none'}
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const ReplyIcon = () => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const FlagIcon = () => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <line
      x1='4'
      y1='22'
      x2='4'
      y2='15'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const EditIcon = () => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const TrashIcon = () => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <polyline
      points='3,6 5,6 21,6'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export interface CommentActionsProps {
  likeCount: number;
  isLiked: boolean;
  replyCount: number;
  onLikeClick?: () => void;
  onReplyClick?: () => void;
  onReportClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  canEdit?: boolean;
  canDelete?: boolean;
  className?: string;
}

/**
 * CommentActions 분자(Molecule) 컴포넌트입니다.
 * Button 그룹을 조합하여 댓글 액션들을 제공합니다.
 */
export const CommentActions: React.FC<CommentActionsProps> = ({
  likeCount,
  isLiked,
  replyCount,
  onLikeClick,
  onReplyClick,
  onReportClick,
  onEditClick,
  onDeleteClick,
  canEdit = false,
  canDelete = false,
  className,
}) => {
  return (
    <div className={cx('comment-actions', className)}>
      <div className={cx('primary-actions')}>
        <Button
          variant={isLiked ? 'primary' : 'ghost'}
          size='sm'
          icon={<HeartIcon filled={isLiked} />}
          onClick={onLikeClick}
          className={cx('action-button', { liked: isLiked })}
        >
          {likeCount > 0 && likeCount}
        </Button>

        <Button
          variant='ghost'
          size='sm'
          icon={<ReplyIcon />}
          onClick={onReplyClick}
          className={cx('action-button')}
        >
          {replyCount > 0 && replyCount}
        </Button>

        <Button
          variant='ghost'
          size='sm'
          icon={<FlagIcon />}
          onClick={onReportClick}
          className={cx('action-button')}
        >
          신고
        </Button>
      </div>

      {(canEdit || canDelete) && (
        <div className={cx('secondary-actions')}>
          {canEdit && (
            <Button
              variant='ghost'
              size='sm'
              icon={<EditIcon />}
              onClick={onEditClick}
              className={cx('action-button')}
            >
              수정
            </Button>
          )}

          {canDelete && (
            <Button
              variant='ghost'
              size='sm'
              icon={<TrashIcon />}
              onClick={onDeleteClick}
              className={cx('action-button', 'delete-action')}
            >
              삭제
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
