import React from 'react';
import classNames from 'classnames/bind';
import { CommentItem } from '../CommentItem';
import styles from './CommentList.module.scss';

const cx = classNames.bind(styles);

export interface Comment {
  id: string;
  content: string;
  authorName: string;
  authorAvatar?: string;
  timestamp: string;
  authorStatus?: 'online' | 'offline' | 'away' | 'busy';
  likeCount: number;
  isLiked: boolean;
  replyCount: number;
  canEdit?: boolean;
  canDelete?: boolean;
  replies?: Comment[];
  parentId?: string;
}

export interface CommentListProps {
  comments: Comment[];
  sortBy?: 'newest' | 'oldest' | 'mostLiked' | 'mostReplied';
  loading?: boolean;
  emptyMessage?: string;
  onSortChange?: (
    sortBy: 'newest' | 'oldest' | 'mostLiked' | 'mostReplied'
  ) => void;
  onLikeClick?: (commentId: string) => void;
  onReplyClick?: (commentId: string) => void;
  onReportClick?: (commentId: string) => void;
  onEditClick?: (commentId: string) => void;
  onDeleteClick?: (commentId: string) => void;
  onAuthorClick?: (commentId: string) => void;
  onSubmitReply?: (parentId: string, content: string) => void;
  className?: string;
}

/**
 * CommentList 유기체(Organism) 컴포넌트입니다.
 * CommentItem 배열을 관리하고 정렬 옵션을 제공합니다.
 */
export const CommentList: React.FC<CommentListProps> = ({
  comments,
  sortBy = 'newest',
  loading = false,
  emptyMessage = '댓글이 없습니다.',
  onSortChange,
  onLikeClick,
  onReplyClick,
  onReportClick,
  onEditClick,
  onDeleteClick,
  onAuthorClick,
  onSubmitReply,
  className,
}) => {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = e.target.value as
      | 'newest'
      | 'oldest'
      | 'mostLiked'
      | 'mostReplied';
    onSortChange?.(newSortBy);
  };

  const renderSortOptions = () => {
    if (!onSortChange) return null;

    return (
      <div className={cx('sort-section')}>
        <label htmlFor='sort-select' className={cx('sort-label')}>
          정렬:
        </label>
        <select
          id='sort-select'
          value={sortBy}
          onChange={handleSortChange}
          className={cx('sort-select')}
        >
          <option value='newest'>최신순</option>
          <option value='oldest'>오래된순</option>
          <option value='mostLiked'>좋아요순</option>
          <option value='mostReplied'>답글순</option>
        </select>
      </div>
    );
  };

  const renderLoadingState = () => (
    <div className={cx('loading-state')}>
      <div className={cx('loading-spinner')}></div>
      <p className={cx('loading-text')}>댓글을 불러오는 중...</p>
    </div>
  );

  const renderEmptyState = () => (
    <div className={cx('empty-state')}>
      <div className={cx('empty-icon')}>💬</div>
      <p className={cx('empty-text')}>{emptyMessage}</p>
    </div>
  );

  const renderCommentList = () => (
    <div className={cx('comment-list')}>
      {comments.map(comment => (
        <CommentItem
          key={comment.id}
          {...comment}
          onLikeClick={() => onLikeClick?.(comment.id)}
          onReplyClick={() => onReplyClick?.(comment.id)}
          onReportClick={() => onReportClick?.(comment.id)}
          onEditClick={() => onEditClick?.(comment.id)}
          onDeleteClick={() => onDeleteClick?.(comment.id)}
          onAuthorClick={() => onAuthorClick?.(comment.id)}
          onSubmitReply={
            onSubmitReply
              ? (content: string) => onSubmitReply(comment.id, content)
              : undefined
          }
        />
      ))}
    </div>
  );

  return (
    <section className={cx('comment-list-container', className)}>
      {renderSortOptions()}

      {loading
        ? renderLoadingState()
        : comments.length === 0
          ? renderEmptyState()
          : renderCommentList()}
    </section>
  );
};
