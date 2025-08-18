import React, { useState } from 'react';
import styles from './RepliedCommentsList.module.scss';
import classNames from 'classnames/bind';

/**
 * classnames/bind 유틸리티에 SCSS 모듈을 바인딩합니다.
 * 이를 통해 CSS 모듈의 장점(로컬 스코프 클래스 이름)을 유지하면서
 * SCSS 정의에 기반하여 동적으로 클래스 이름을 적용할 수 있습니다.
 */
const cx = classNames.bind(styles);

/**
 * 댓글에 첨부된 단일 답글입니다. 답글은 기본 메타데이터(작성자, 내용, 타임스탬프)와
 * 고유 식별자를 포함합니다.
 */
export interface Reply {
  id: string | number;
  author: string;
  content: string;
  timestamp: string;
}

/**
 * 댓글은 중첩된 답글을 포함할 수 있습니다. 각 댓글은 ID, 작성자, 내용, 타임스탬프를 가지며,
 * 선택적으로 답글 배열을 가질 수 있습니다. 실제 애플리케이션에서는 아바타 URL이나
 * 사용자 ID와 같은 추가 필드가 포함될 수 있습니다.
 */
export interface RepliedComment {
  id: string | number;
  author: string;
  content: string;
  timestamp: string;
  replies?: Reply[];
}

/**
 * RepliedCommentsList 컴포넌트의 props입니다. 댓글 배열과 답글 추가를
 * 처리하기 위한 선택적 콜백 함수를 받습니다. onAddReply 함수를 통해
 * 부모 컴포넌트는 사용자가 답글을 제출했을 때 상태를 동기화할 수 있습니다.
 */
export interface RepliedCommentsListProps {
  comments: RepliedComment[];
  onAddReply?: (commentId: RepliedComment['id'], reply: Reply) => void;
}

interface ReplyFormProps {
  onSubmit: (reply: Reply) => void;
  onCancel: () => void;
}

/**
 * ReplyForm은 새로운 답글을 작성하기 위한 폼을 렌더링합니다.
 * 사용자가 답글을 작성하고 제출 또는 취소할 수 있는 UI를 제공합니다.
 */
const ReplyForm: React.FC<ReplyFormProps> = ({ onSubmit, onCancel }) => {
  const [replyText, setReplyText] = useState('');

  /**
   * 답글 제출을 처리합니다. 새로운 답글 객체를 생성하고 onSubmit 콜백을 호출합니다.
   */
  const handleSubmit = () => {
    const trimmed = replyText.trim();
    if (!trimmed) {
      return;
    }
    const newReply: Reply = {
      id: Date.now(),
      author: 'Current User', // 실제 앱에서는 로그인된 사용자여야 합니다.
      content: trimmed,
      timestamp: new Date().toISOString(),
    };
    onSubmit(newReply);
  };

  return (
    <div className={cx('replyForm')} data-testid="reply-form">
      <textarea
        className={cx('replyTextarea')}
        value={replyText}
        onChange={e => setReplyText(e.target.value)}
        placeholder="답글을 작성하세요…"
        data-testid="reply-textarea"
      />
      <div className={cx('replyFormActions')} data-testid="reply-form-actions">
        <button type="button" className={cx('cancelButton')} onClick={onCancel} data-testid="cancel-reply-button">
          취소
        </button>
        <button type="button" className={cx('submitButton')} onClick={handleSubmit} data-testid="submit-reply-button">
          등록
        </button>
      </div>
    </div>
  );
};

interface CommentItemProps {
  comment: RepliedComment;
  onAddReply?: (commentId: RepliedComment['id'], reply: Reply) => void;
}

/**
 * CommentItem은 단일 댓글과 그에 달린 답글 목록을 렌더링합니다.
 * 또한 답글 달기 폼을 토글하는 기능도 담당합니다.
 */
const CommentItem: React.FC<CommentItemProps> = ({ comment, onAddReply }) => {
  const [isReplying, setIsReplying] = useState(false);

  /**
   * 답글 추가를 처리합니다. onAddReply 콜백이 제공되면 호출하고
   * 답글 폼을 닫습니다.
   */
  const handleAddReply = (reply: Reply) => {
    if (onAddReply) {
      onAddReply(comment.id, reply);
    }
    setIsReplying(false);
  };

  return (
    <div className={cx('commentItem')} data-testid="comment-item">
      <div className={cx('commentContent')} data-testid="comment-content">
        <div className={cx('commentHeader')} data-testid="comment-header">
          <span className={cx('commentAuthor')} data-testid="comment-author">
            {comment.author}
          </span>
          <span className={cx('commentTimestamp')} data-testid="comment-timestamp">
            {comment.timestamp}
          </span>
        </div>
        <div className={cx('commentText')} data-testid="comment-text">
          {comment.content}
        </div>
        {!isReplying && (
          <button
            className={cx('replyButton')}
            type="button"
            onClick={() => setIsReplying(true)}
            data-testid="reply-button"
          >
            답글 달기
          </button>
        )}
      </div>
      {/* 답글이 있는 경우 렌더링 */}
      {comment.replies && comment.replies.length > 0 && (
        <div className={cx('repliesList')} data-testid="replies-list">
          {comment.replies.map(reply => (
            <div key={reply.id} className={cx('replyItem')} data-testid="reply-item">
              <div className={cx('replyHeader')} data-testid="reply-header">
                <span className={cx('replyAuthor')} data-testid="reply-author">
                  {reply.author}
                </span>
                <span className={cx('replyTimestamp')} data-testid="reply-timestamp">
                  {reply.timestamp}
                </span>
              </div>
              <div className={cx('replyText')} data-testid="reply-text">
                {reply.content}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* 답글 달기 폼 */}
      {isReplying && <ReplyForm onSubmit={handleAddReply} onCancel={() => setIsReplying(false)} />}
    </div>
  );
};

/**
 * RepliedCommentsList는 중첩된 답글이 있는 댓글 목록을 렌더링합니다.
 * 이 컴포넌트는 댓글 목록을 순회하며 각 댓글에 대해 CommentItem을 렌더링하는
 * 역할만 담당하여 구조를 단순화합니다.
 */
const RepliedCommentsList: React.FC<RepliedCommentsListProps> = ({ comments, onAddReply }) => {
  return (
    <div className={cx('commentsList')} data-testid="comments-list">
      {comments.map(comment => (
        <CommentItem key={comment.id} comment={comment} onAddReply={onAddReply} />
      ))}
    </div>
  );
};

export default RepliedCommentsList;
