import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { CommentHeader } from '../../Molecules/CommentHeader';
import { CommentActions } from '../../Molecules/CommentActions';
import { ReplyForm } from '../../Molecules/ReplyForm';
import { ReplyToggle } from '../../Molecules/ReplyToggle';
import { Button } from '../../Atoms/Button';
import type { Comment } from '../CommentList';
import styles from './CommentItem.module.scss';

const cx = classNames.bind(styles);

export interface CommentItemProps {
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
  depth?: number;
  onLikeClick?: () => void;
  onReplyClick?: () => void;
  onReportClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  onAuthorClick?: () => void;
  onSubmitReply?: (content: string) => void;
  className?: string;
}

/**
 * CommentItem 유기체(Organism) 컴포넌트입니다.
 * CommentHeader와 CommentActions를 조합하여 개별 댓글을 표시합니다.
 */
export const CommentItem: React.FC<CommentItemProps> = ({
  content,
  authorName,
  authorAvatar,
  timestamp,
  authorStatus,
  likeCount,
  isLiked,
  replyCount,
  canEdit = false,
  canDelete = false,
  replies = [],
  depth = 0,
  onLikeClick,
  onReplyClick,
  onReportClick,
  onEditClick,
  onDeleteClick,
  onAuthorClick,
  onSubmitReply,
  className,
}) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleToggleReplies = () => {
    setShowReplies(!showReplies);
    // 답글을 숨길 때 답글 작성 폼도 함께 숨김
    if (showReplies) {
      setShowReplyForm(false);
    }
  };

  const handleShowReplyForm = () => {
    setShowReplyForm(true);
    setShowReplies(true);
  };

  const handleSubmitReply = (replyContent: string) => {
    onSubmitReply?.(replyContent);
    setShowReplyForm(false);
  };

  const handleCancelReply = () => {
    setShowReplyForm(false);
  };

  const renderReplies = () => {
    if (!showReplies || !replies.length) return null;

    return (
      <div className={cx('replies-container')}>
        {replies.map(reply => (
          <CommentItem
            key={reply.id}
            {...reply}
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
    );
  };

  return (
    <article
      className={cx('comment-item', className, {
        [`depth-${depth}`]: depth > 0,
      })}
    >
      <div className={cx('comment-content')}>
        <CommentHeader
          authorName={authorName}
          authorAvatar={authorAvatar}
          timestamp={timestamp}
          authorStatus={authorStatus}
          onAuthorClick={onAuthorClick}
        />

        <div className={cx('comment-text')}>{content}</div>
      </div>

      <CommentActions
        likeCount={likeCount}
        isLiked={isLiked}
        replyCount={replyCount}
        onLikeClick={onLikeClick}
        onReplyClick={handleShowReplyForm}
        onReportClick={onReportClick}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
        canEdit={canEdit}
        canDelete={canDelete}
      />

      {/* 답글이 있으면 토글 버튼, 없으면 답글 작성 버튼 */}
      {replyCount > 0 ? (
        <ReplyToggle
          replyCount={replyCount}
          isExpanded={showReplies}
          onToggle={handleToggleReplies}
        />
      ) : (
        <div className={cx('reply-toggle-container')}>
          <Button
            variant='text'
            size='sm'
            onClick={handleShowReplyForm}
            className={cx('reply-toggle-button')}
          >
            답글 작성
          </Button>
        </div>
      )}

      {showReplies && (
        <>
          {showReplyForm && (
            <ReplyForm
              onSubmit={handleSubmitReply}
              onCancel={handleCancelReply}
            />
          )}
          {renderReplies()}
        </>
      )}
    </article>
  );
};
