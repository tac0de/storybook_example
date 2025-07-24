import { Avatar } from '../../Atoms/Avatar';
import { Button } from '../../Atoms/Button';

import styles from './CommentItem.module.scss';

import type React from 'react';

export interface CommentItemProps {
  /** 작성자 */
  readonly author: string;
  /** 프로필 이미지 URL */
  readonly avatarUrl?: string;
  /** 댓글 내용 */
  readonly text: string;
  /** 작성 시간 */
  readonly timestamp: string;
  /** 삭제 핸들러 */
  readonly onDelete?: () => void;
  /** 수정 핸들러 */
  readonly onEdit?: () => void;
  /** 추가 클래스 */
  readonly className?: string;
}

export const CommentItem: React.FC<CommentItemProps> = ({
  author,
  avatarUrl = '',
  text,
  timestamp,
  onDelete = () => {},
  onEdit = () => {},
  className = '',
}) => {
  return (
    <div className={[styles.commentItem, className].filter(Boolean).join(' ')}>
      <Avatar src={avatarUrl} alt={author} size={32} />
      <div className={styles.body}>
        <div className={styles.header}>
          <span className={styles.author}>{author}</span>
          <span className={styles.timestamp}>{timestamp}</span>
        </div>
        <div className={styles.text}>{text}</div>
        <div className={styles.actions}>
          {onEdit !== undefined && (
            <Button size='small' variant='secondary' onClick={onEdit}>
              수정
            </Button>
          )}
          {onDelete !== undefined && (
            <Button size='small' variant='danger' onClick={onDelete}>
              삭제
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
