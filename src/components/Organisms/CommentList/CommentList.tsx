import { CommentItem } from '../../Molecules/CommentItem';
import type React from 'react';

export interface Comment {
  readonly id: string;
  readonly author: string;
  readonly authorAvatar?: string;
  readonly timestamp: string;
  readonly content: string;
  readonly likes: number;
  readonly dislikes: number;
  readonly replies?: number;
  readonly editable?: boolean;
  readonly deletable?: boolean;
}

export interface CommentListProps {
  /** 댓글 목록 */
  readonly comments: Comment[];
  /** 답글 작성 핸들러 */
  readonly onReplyClick?: (commentId: string) => void;
  /** 좋아요 핸들러 */
  readonly onLikeClick?: (commentId: string) => void;
  /** 싫어요 핸들러 */
  readonly onDislikeClick?: (commentId: string) => void;
  /** 편집 핸들러 */
  readonly onEditClick?: (commentId: string) => void;
  /** 삭제 핸들러 */
  readonly onDeleteClick?: (commentId: string) => void;
  /** 추가 클래스 */
  readonly className?: string;
}

export const CommentList: React.FC<CommentListProps> = ({
  comments,
  onReplyClick,
  onLikeClick,
  onDislikeClick,
  onEditClick,
  onDeleteClick,
  className = '',
}) => {
  if (comments.length === 0) {
    return (
      <div className={`text-center py-8 text-gray-500 ${className}`}>
        <p>아직 댓글이 없습니다.</p>
        <p className='text-sm mt-1'>첫 번째 댓글을 남겨보세요!</p>
      </div>
    );
  }

  return (
    <div
      className={`w-full max-w-2xl mx-auto bg-white rounded-lg shadow-sm ${className}`}
    >
      {comments.map(comment => (
        <CommentItem
          key={comment.id}
          author={comment.author}
          authorAvatar={comment.authorAvatar}
          timestamp={comment.timestamp}
          content={comment.content}
          likes={comment.likes}
          dislikes={comment.dislikes}
          replies={comment.replies}
          editable={comment.editable}
          deletable={comment.deletable}
          onReplyClick={() => onReplyClick?.(comment.id)}
          onLikeClick={() => onLikeClick?.(comment.id)}
          onDislikeClick={() => onDislikeClick?.(comment.id)}
          onEditClick={() => onEditClick?.(comment.id)}
          onDeleteClick={() => onDeleteClick?.(comment.id)}
        />
      ))}
    </div>
  );
};
