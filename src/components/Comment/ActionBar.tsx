import React from 'react';

interface ActionBarProps {
  onReply: () => void;
  onEdit?: () => void;
  isEditing?: boolean;
  likeCount: number;
  dislikeCount: number;
  liked: boolean;
  disliked: boolean;
  onLike: () => void;
  onDislike: () => void;
  onReport?: () => void;
}

export const ActionBar: React.FC<ActionBarProps> = ({ onReply, onEdit, isEditing, likeCount, dislikeCount, liked, disliked, onLike, onDislike, onReport }) => {
  return (
    <div className="action-bar">
      <button className="action-btn" title="답글" onClick={onReply}>
        <span role="img" aria-label="reply">💬</span> 답글
      </button>
      <button
        className={`action-btn${liked ? ' liked' : ''}`}
        title="좋아요"
        onClick={onLike}
        style={liked ? { color: '#1976d2', fontWeight: 'bold' } : {}}
      >
        <span role="img" aria-label="like">👍</span> 좋아요 {likeCount > 0 && <span className="like-count">{likeCount}</span>}
      </button>
      <button
        className={`action-btn${disliked ? ' liked' : ''}`}
        title="싫어요"
        onClick={onDislike}
        style={disliked ? { color: '#e53935', fontWeight: 'bold' } : {}}
      >
        <span role="img" aria-label="dislike">👎</span> 싫어요 {dislikeCount > 0 && <span className="like-count">{dislikeCount}</span>}
      </button>
      {onEdit && (
        <button className="action-btn" title="수정" onClick={onEdit}>
          <span role="img" aria-label="edit">✏️</span> {isEditing ? '취소' : '수정'}
        </button>
      )}
      <button className="action-btn" title="신고" onClick={onReport}>
        <span role="img" aria-label="report">🚩</span> 신고
      </button>
    </div>
  );
} 