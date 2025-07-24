import type React from 'react';

/**
 * ActionBarProps
 * @property onReply - 답글 버튼 클릭 핸들러
 * @property onEdit - 수정 버튼 클릭 핸들러(옵션)
 * @property isEditing - 수정 모드 여부(옵션)
 * @property likeCount - 좋아요 수
 * @property dislikeCount - 싫어요 수
 * @property liked - 좋아요 상태
 * @property disliked - 싫어요 상태
 * @property onLike - 좋아요 버튼 클릭 핸들러
 * @property onDislike - 싫어요 버튼 클릭 핸들러
 * @property onReport - 신고 버튼 클릭 핸들러(옵션)
 */
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

/**
 * ActionBar 컴포넌트
 * - 댓글 하단의 액션 버튼(답글, 좋아요, 싫어요, 수정, 신고)을 렌더링
 * - 각 버튼은 props로 전달된 핸들러를 호출
 */
export const ActionBar: React.FC<ActionBarProps> = ({
  onReply,
  onEdit,
  isEditing,
  likeCount,
  dislikeCount,
  liked,
  disliked,
  onLike,
  onDislike,
  onReport,
}) => {
  return (
    <div className='action-bar'>
      {/* 답글 버튼 */}
      <button className='action-btn' title='답글' onClick={onReply}>
        <span role='img' aria-label='reply'>
          💬
        </span>{' '}
        답글
      </button>
      {/* 좋아요 버튼 */}
      <button
        className={`action-btn${liked ? ' liked' : ''}`}
        title='좋아요'
        onClick={onLike}
        style={liked ? { color: '#1976d2', fontWeight: 'bold' } : {}}
      >
        <span role='img' aria-label='like'>
          👍
        </span>{' '}
        좋아요{' '}
        {likeCount > 0 && <span className='like-count'>{likeCount}</span>}
      </button>
      {/* 싫어요 버튼 */}
      <button
        className={`action-btn${disliked ? ' liked' : ''}`}
        title='싫어요'
        onClick={onDislike}
        style={disliked ? { color: '#e53935', fontWeight: 'bold' } : {}}
      >
        <span role='img' aria-label='dislike'>
          👎
        </span>{' '}
        싫어요{' '}
        {dislikeCount > 0 && <span className='like-count'>{dislikeCount}</span>}
      </button>
      {/* 수정 버튼 (옵션) */}
      {onEdit && (
        <button className='action-btn' title='수정' onClick={onEdit}>
          <span role='img' aria-label='edit'>
            ✏️
          </span>{' '}
          {isEditing ? '취소' : '수정'}
        </button>
      )}
      {/* 신고 버튼 */}
      <button className='action-btn' title='신고' onClick={onReport}>
        <span role='img' aria-label='report'>
          🚩
        </span>{' '}
        신고
      </button>
    </div>
  );
};
