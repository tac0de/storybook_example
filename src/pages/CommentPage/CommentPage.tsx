import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { PageLayout } from '../../layouts/PageLayout';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Avatar } from '../../components/Avatar';
import styles from './CommentPage.module.scss';

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

export interface CommentPageProps {
  comments: Comment[];
  sortBy?: 'newest' | 'oldest' | 'mostLiked' | 'mostReplied';
  loading?: boolean;
  title?: string;
  subtitle?: string;
  canComment?: boolean;
  maxComments?: number;
  className?: string;
  onSortChange?: (
    sortBy: 'newest' | 'oldest' | 'mostLiked' | 'mostReplied'
  ) => void;
  onSubmitComment?: (content: string) => void;
  onSubmitReply?: (parentId: string, content: string) => void;
  onLikeClick?: (commentId: string) => void;
  onReplyClick?: (commentId: string) => void;
  onReportClick?: (commentId: string) => void;
  onEditClick?: (commentId: string) => void;
  onDeleteClick?: (commentId: string) => void;
  onAuthorClick?: (authorName: string) => void;
}

// Feature-specific components built with atomic components
const CommentHeader: React.FC<{
  authorName: string;
  authorAvatar?: string;
  timestamp: string;
  authorStatus?: 'online' | 'offline' | 'away' | 'busy';
  onAuthorClick?: () => void;
}> = ({ authorName, authorAvatar, timestamp, authorStatus, onAuthorClick }) => (
  <div className={cx('comment-header')}>
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
        <Button
          variant='text'
          size='sm'
          onClick={onAuthorClick}
          className={cx('author-name')}
        >
          {authorName}
        </Button>
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

const CommentActions: React.FC<{
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
}> = ({
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
}) => (
  <div className={cx('comment-actions')}>
    <Button
      variant='ghost'
      size='sm'
      onClick={onLikeClick}
      className={cx('action-button', { liked: isLiked })}
    >
      ♥ {likeCount}
    </Button>
    <Button
      variant='ghost'
      size='sm'
      onClick={onReplyClick}
      className={cx('action-button')}
    >
      💬 {replyCount}
    </Button>
    <Button
      variant='ghost'
      size='sm'
      onClick={onReportClick}
      className={cx('action-button')}
    >
      ⚠️
    </Button>
    {canEdit && (
      <Button
        variant='ghost'
        size='sm'
        onClick={onEditClick}
        className={cx('action-button')}
      >
        ✏️
      </Button>
    )}
    {canDelete && (
      <Button
        variant='ghost'
        size='sm'
        onClick={onDeleteClick}
        className={cx('action-button')}
      >
        🗑️
      </Button>
    )}
  </div>
);

const CommentForm: React.FC<{
  onSubmit?: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}> = ({ onSubmit, placeholder = '댓글을 입력하세요...', maxLength = 500 }) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (value.trim() && onSubmit) {
      onSubmit(value.trim());
      setValue('');
    }
  };

  return (
    <div className={cx('comment-form')}>
      <Input
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        maxLength={maxLength}
        className={cx('comment-input')}
      />
      <Button
        variant='primary'
        size='sm'
        onClick={handleSubmit}
        disabled={!value.trim()}
        className={cx('submit-button')}
      >
        작성
      </Button>
    </div>
  );
};

const CommentItem: React.FC<{
  comment: Comment;
  depth?: number;
  onLikeClick?: (commentId: string) => void;
  onReplyClick?: (commentId: string) => void;
  onReportClick?: (commentId: string) => void;
  onEditClick?: (commentId: string) => void;
  onDeleteClick?: (commentId: string) => void;
  onAuthorClick?: (authorName: string) => void;
  onSubmitReply?: (parentId: string, content: string) => void;
}> = ({
  comment,
  depth = 0,
  onLikeClick,
  onReplyClick,
  onReportClick,
  onEditClick,
  onDeleteClick,
  onAuthorClick,
  onSubmitReply,
}) => {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <article className={cx('comment-item', { [`depth-${depth}`]: depth > 0 })}>
      <CommentHeader
        authorName={comment.authorName}
        authorAvatar={comment.authorAvatar}
        timestamp={comment.timestamp}
        authorStatus={comment.authorStatus}
        onAuthorClick={() => onAuthorClick?.(comment.authorName)}
      />

      <div className={cx('comment-text')}>{comment.content}</div>

      <CommentActions
        likeCount={comment.likeCount}
        isLiked={comment.isLiked}
        replyCount={comment.replyCount}
        onLikeClick={() => onLikeClick?.(comment.id)}
        onReplyClick={() => onReplyClick?.(comment.id)}
        onReportClick={() => onReportClick?.(comment.id)}
        onEditClick={() => onEditClick?.(comment.id)}
        onDeleteClick={() => onDeleteClick?.(comment.id)}
        canEdit={comment.canEdit}
        canDelete={comment.canDelete}
      />

      {comment.replyCount > 0 && (
        <Button
          variant='text'
          size='sm'
          onClick={() => setShowReplies(!showReplies)}
          className={cx('reply-toggle')}
        >
          {showReplies ? '▼' : '▶'} 답글 {comment.replyCount}개
        </Button>
      )}

      {showReplies && comment.replies && (
        <div className={cx('replies')}>
          {comment.replies.map(reply => (
            <CommentItem
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              onLikeClick={onLikeClick}
              onReplyClick={onReplyClick}
              onReportClick={onReportClick}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
              onAuthorClick={onAuthorClick}
              onSubmitReply={onSubmitReply}
            />
          ))}
        </div>
      )}
    </article>
  );
};

const CommentList: React.FC<{
  comments: Comment[];
  sortBy?: 'newest' | 'oldest' | 'mostLiked' | 'mostReplied';
  loading?: boolean;
  onSortChange?: (
    sortBy: 'newest' | 'oldest' | 'mostLiked' | 'mostReplied'
  ) => void;
  onLikeClick?: (commentId: string) => void;
  onReplyClick?: (commentId: string) => void;
  onReportClick?: (commentId: string) => void;
  onEditClick?: (commentId: string) => void;
  onDeleteClick?: (commentId: string) => void;
  onAuthorClick?: (authorName: string) => void;
  onSubmitReply?: (parentId: string, content: string) => void;
}> = ({
  comments,
  sortBy = 'newest',
  loading = false,
  onSortChange,
  onLikeClick,
  onReplyClick,
  onReportClick,
  onEditClick,
  onDeleteClick,
  onAuthorClick,
  onSubmitReply,
}) => {
  if (loading) {
    return <div className={cx('loading')}>로딩 중...</div>;
  }

  if (comments.length === 0) {
    return <div className={cx('empty')}>댓글이 없습니다.</div>;
  }

  return (
    <div className={cx('comment-list')}>
      {onSortChange && (
        <div className={cx('sort-section')}>
          <select
            value={sortBy}
            onChange={e => onSortChange(e.target.value as any)}
            className={cx('sort-select')}
          >
            <option value='newest'>최신순</option>
            <option value='oldest'>오래된순</option>
            <option value='mostLiked'>좋아요순</option>
            <option value='mostReplied'>답글순</option>
          </select>
        </div>
      )}

      {comments.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onLikeClick={onLikeClick}
          onReplyClick={onReplyClick}
          onReportClick={onReportClick}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          onAuthorClick={onAuthorClick}
          onSubmitReply={onSubmitReply}
        />
      ))}
    </div>
  );
};

/**
 * CommentPage - Built entirely with atomic components
 */
export const CommentPage: React.FC<CommentPageProps> = ({
  comments,
  sortBy = 'newest',
  loading = false,
  title = '댓글',
  subtitle = '이 글에 대한 의견을 남겨주세요',
  canComment = true,
  maxComments = 100,
  className,
  onSortChange,
  onSubmitComment,
  onSubmitReply,
  onLikeClick,
  onReplyClick,
  onReportClick,
  onEditClick,
  onDeleteClick,
  onAuthorClick,
}) => {
  const handleSubmitComment = (content: string) => {
    onSubmitComment?.(content);
  };

  const renderHeader = () => (
    <div className={cx('page-header')}>
      <h1 className={cx('page-title')}>{title}</h1>
      {subtitle && <p className={cx('page-subtitle')}>{subtitle}</p>}
      <div className={cx('page-stats')}>
        <span>댓글 {comments.length}개</span>
        {maxComments && <span>최대 {maxComments}개</span>}
      </div>
    </div>
  );

  const renderContent = () => (
    <div className={cx('page-content')}>
      {canComment && (
        <div className={cx('comment-form-section')}>
          <CommentForm
            onSubmit={handleSubmitComment}
            placeholder='댓글을 입력하세요...'
            maxLength={500}
          />
        </div>
      )}

      <div className={cx('comment-list-section')}>
        <CommentList
          comments={comments}
          sortBy={sortBy}
          loading={loading}
          onSortChange={onSortChange}
          onLikeClick={onLikeClick}
          onReplyClick={onReplyClick}
          onReportClick={onReportClick}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          onAuthorClick={onAuthorClick}
          onSubmitReply={onSubmitReply}
        />
      </div>
    </div>
  );

  const renderFooter = () => (
    <div className={cx('page-footer')}>
      <p>댓글은 커뮤니티 가이드라인을 준수해야 합니다.</p>
      <p>부적절한 댓글은 신고할 수 있습니다.</p>
    </div>
  );

  return (
    <PageLayout
      header={renderHeader()}
      footer={renderFooter()}
      className={cx('comment-page', className)}
      maxWidth='xl'
      padding='lg'
    >
      {renderContent()}
    </PageLayout>
  );
};
