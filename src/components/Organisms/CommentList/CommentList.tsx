import { CommentItem } from '../../Molecules/CommentItem';

import styles from './CommentList.module.scss';

import type React from 'react';

export interface Comment {
  id: string;
  author: string;
  avatarUrl?: string;
  text: string;
  timestamp: string;
}

export interface CommentListProps {
  /** 댓글 목록 */
  readonly comments: Comment[];
  /** 로딩 상태 */
  readonly loading?: boolean;
  /** 삭제 핸들러 */
  readonly onDelete?: (id: string) => void;
  /** 수정 핸들러 */
  readonly onEdit?: (id: string) => void;
  /** 빈 상태 메시지 */
  readonly emptyMessage?: string;
  /** 추가 클래스 */
  readonly className?: string;
}

export const CommentList: React.FC<CommentListProps> = ({
  comments,
  loading = false,
  onDelete = () => {},
  onEdit = () => {},
  emptyMessage = '댓글이 없습니다.',
  className = '',
}) => {
  if (loading) {
    return (
      <div
        className={[styles.commentList, className].filter(Boolean).join(' ')}
      >
        로딩 중...
      </div>
    );
  }
  if (!comments.length) {
    return (
      <div
        className={[styles.commentList, className].filter(Boolean).join(' ')}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={[styles.commentList, className].filter(Boolean).join(' ')}>
      {comments.map(c => (
        <CommentItem
          key={c.id}
          author={c.author}
          avatarUrl={c.avatarUrl}
          text={c.text}
          timestamp={c.timestamp}
          onDelete={onDelete !== undefined ? () => onDelete(c.id) : undefined}
          onEdit={onEdit !== undefined ? () => onEdit(c.id) : undefined}
        />
      ))}
    </div>
  );
};
