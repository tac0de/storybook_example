import { Avatar } from '../../Atoms/Avatar';
import { Button } from '../../Atoms/Button';

import styles from './CommentItem.module.scss';

import type React from 'react';

/**
 * @interface CommentItemProps
 * @property {string} author - 댓글 작성자의 이름입니다.
 * @property {string} [avatarUrl] - 작성자의 프로필 이미지 URL입니다. (선택 사항)
 * @property {string} text - 댓글의 내용입니다.
 * @property {string} timestamp - 댓글이 작성된 시간입니다.
 * @property {() => void} [onDelete] - 댓글 삭제 시 호출될 함수입니다. (선택 사항)
 * @property {() => void} [onEdit] - 댓글 수정 시 호출될 함수입니다. (선택 사항)
 * @property {string} [className] - 추가적인 CSS 클래스를 지정할 수 있습니다. (선택 사항)
 */
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

/**
 * `CommentItem` 컴포넌트는 개별 댓글을 표시합니다.
 * 이 컴포넌트는 작성자, 프로필 이미지, 댓글 내용, 작성 시간을 포함하며,
 * 수정 및 삭제와 같은 상호작용을 위한 버튼을 제공합니다.
 *
 * @param {CommentItemProps} props - CommentItem 컴포넌트에 전달되는 props입니다.
 * @returns {React.ReactElement} - 렌더링된 CommentItem 컴포넌트입니다.
 */
export const CommentItem: React.FC<CommentItemProps> = ({
  author,
  avatarUrl = '',
  text,
  timestamp,
  onDelete = () => {},
  onEdit = () => {},
  className = '',
}) => {
  // 기본 스타일과 추가적인 className을 결합하여 동적인 클래스 문자열을 생성합니다.
  // filter(Boolean)은 빈 문자열이나 null/undefined 값을 배열에서 제거합니다.
  const combinedClassName = [styles.commentItem, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={combinedClassName}>
      {/* 작성자의 프로필 이미지를 표시하는 Avatar 컴포넌트 */}
      <Avatar src={avatarUrl} alt={author} size={32} />
      <div className={styles.body}>
        <div className={styles.header}>
          {/* 작성자 이름 */}
          <span className={styles.author}>{author}</span>
          {/* 작성 시간 */}
          <span className={styles.timestamp}>{timestamp}</span>
        </div>
        {/* 댓글 내용 */}
        <div className={styles.text}>{text}</div>
        <div className={styles.actions}>
          {/* onEdit 함수가 제공된 경우 '수정' 버튼을 렌더링합니다. */}
          {onEdit !== undefined && (
            <Button size='small' variant='secondary' onClick={onEdit}>
              수정
            </Button>
          )}
          {/* onDelete 함수가 제공된 경우 '삭제' 버튼을 렌더링합니다. */}
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
