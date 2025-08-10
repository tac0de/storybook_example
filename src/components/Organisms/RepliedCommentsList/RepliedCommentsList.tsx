import React, { useState } from 'react';
import styles from './RepliedCommentsList.module.scss';
import classNames from 'classnames/bind';

/**
 * Bind the imported SCSS module to classnames/bind. This allows us to
 * dynamically apply class names based on the SCSS definitions while
 * retaining the benefits of CSS modules (locally scoped class names).
 */
const cx = classNames.bind(styles);

/**
 * A single reply attached to a comment. Replies contain basic metadata
 * (author, content, timestamp) and a unique identifier.
 */
export interface Reply {
  id: string | number;
  author: string;
  content: string;
  timestamp: string;
}

/**
 * A comment may contain nested replies. Each comment has an id, author,
 * content, timestamp and optionally an array of replies. In a real
 * application, additional fields such as avatar URLs or user IDs could be
 * included.
 */
export interface RepliedComment {
  id: string | number;
  author: string;
  content: string;
  timestamp: string;
  replies?: Reply[];
}

/**
 * Props for the CommentsList component. Accepts an array of comments and
 * an optional callback for handling the addition of a reply. The
 * onAddReply function allows the parent to synchronize state when the user
 * submits a reply.
 */
export interface RepliedCommentsListProps {
  comments: RepliedComment[];
  onAddReply?: (commentId: RepliedComment['id'], reply: Reply) => void;
}

/**
 * CommentsList renders a list of comments with nested replies. Users can
 * trigger a reply form beneath each comment to write a new reply. The
 * component manages local state for which comment is being replied to and
 * for the content of the reply text area. When a reply is submitted, it
 * invokes the onAddReply callback (if provided) with the new reply data.
 */
const RepliedCommentsList: React.FC<RepliedCommentsListProps> = ({ comments, onAddReply }) => {
  // Track which comment ID currently has an active reply form, or null
  const [replyTargetId, setReplyTargetId] = useState<null | RepliedComment['id']>(null);
  // Controlled state for the reply textarea content
  const [replyText, setReplyText] = useState('');

  /**
   * Show the reply form for a particular comment. Resets any existing
   * reply text so that each reply starts with a clean slate.
   */
  const handleStartReply = (commentId: RepliedComment['id']) => {
    setReplyTargetId(commentId);
    setReplyText('');
  };

  /**
   * Submit a reply. Creates a new Reply object using a timestamp and
   * invokes the optional onAddReply callback. Afterwards, the reply form
   * is closed and the textarea is cleared.
   */
  const handleSubmitReply = (commentId: RepliedComment['id']) => {
    const trimmed = replyText.trim();
    if (!trimmed) {
      return;
    }
    const newReply: Reply = {
      id: Date.now(),
      author: 'Current User',
      content: trimmed,
      timestamp: new Date().toISOString(),
    };
    if (onAddReply) {
      onAddReply(commentId, newReply);
    }
    setReplyTargetId(null);
    setReplyText('');
  };

  return (
    <div className={cx('commentsList')} data-testid="comments-list">
      {comments.map((comment) => (
        <div key={comment.id} className={cx('commentItem')} data-testid="comment-item">
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
            <button
              className={cx('replyButton')}
              type="button"
              onClick={() => handleStartReply(comment.id)}
              data-testid="reply-button"
            >
              Reply
            </button>
          </div>
          {/* Render replies if present */}
          {comment.replies && comment.replies.length > 0 && (
            <div className={cx('repliesList')} data-testid="replies-list">
              {comment.replies.map((reply) => (
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
          {/* Inline reply form appears when replyTargetId matches the comment's id */}
          {replyTargetId === comment.id && (
            <div className={cx('replyForm')} data-testid="reply-form">
              <textarea
                className={cx('replyTextarea')}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write your reply…"
                data-testid="reply-textarea"
              />
              <div className={cx('replyFormActions')} data-testid="reply-form-actions">
                <button
                  type="button"
                  className={cx('cancelButton')}
                  onClick={() => setReplyTargetId(null)}
                  data-testid="cancel-reply-button"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={cx('submitButton')}
                  onClick={() => handleSubmitReply(comment.id)}
                  data-testid="submit-reply-button"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RepliedCommentsList;