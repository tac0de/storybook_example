import { CommentItem } from '../../Molecules/CommentItem';

import styles from './CommentList.module.scss';

import type React from 'react';

/**
 * @interface Comment
 * @property {string} id - 댓글의 고유 ID입니다.
 * @property {string} author - 댓글 작성자의 이름입니다.
 * @property {string} [avatarUrl] - 작성자의 프로필 이미지 URL입니다. (선택 사항)
 * @property {string} text - 댓글의 내용입니다.
 * @property {string} timestamp - 댓글이 작성된 시간입니다.
 */
export interface Comment {
  id: string;
  author: string;
  avatarUrl?: string;
  text: string;
  timestamp: string;
}

/**
 * @interface CommentListProps
 * @property {Comment[]} comments - 표시할 댓글 객체의 배열입니다.
 * @property {boolean} [loading] - 데이터 로딩 중인지 여부를 나타냅니다. (선택 사항)
 * @property {(id: string) => void} [onDelete] - 특정 ID의 댓글을 삭제할 때 호출되는 함수입니다. (선택 사항)
 * @property {(id: string) => void} [onEdit] - 특정 ID의 댓글을 수정할 때 호출되는 함수입니다. (선택 사항)
 * @property {string} [emptyMessage] - 댓글이 없을 때 표시될 메시지입니다. (선택 사항)
 * @property {string} [className] - 추가적인 CSS 클래스를 지정할 수 있습니다. (선택 사항)
 */
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

/**
 * `CommentList` 컴포넌트는 여러 개의 `CommentItem`을 목록 형태로 렌더링합니다.
 * 로딩 상태나 빈 목록 상태에 따라 다른 UI를 표시할 수 있습니다.
 *
 * @param {CommentListProps} props - CommentList 컴포넌트에 전달되는 props입니다.
 * @returns {React.ReactElement} - 렌더링된 CommentList 컴포넌트입니다.
 */
export const CommentList: React.FC<CommentListProps> = ({
  comments,
  loading = false,
  onDelete = () => {},
  onEdit = () => {},
  emptyMessage = '댓글이 없습니다.',
  className = '',
}) => {
  // 기본 스타일과 추가적인 className을 결합하여 동적인 클래스 문자열을 생성합니다.
  const combinedClassName = [styles.commentList, className]
    .filter(Boolean)
    .join(' ');

  // 로딩 중일 때 표시할 UI
  if (loading) {
    return <div className={combinedClassName}>로딩 중...</div>;
  }

  // 댓글 목록이 비어있을 때 표시할 UI
  if (!comments.length) {
    return <div className={combinedClassName}>{emptyMessage}</div>;
  }

  // 댓글 목록을 렌더링
  return (
    <div className={combinedClassName}>
      {comments.map(c => (
        <CommentItem
          key={c.id}
          author={c.author}
          avatarUrl={c.avatarUrl}
          text={c.text}
          timestamp={c.timestamp}
          // onDelete 함수가 제공된 경우, 댓글 ID와 함께 호출하는 새로운 함수를 생성하여 전달합니다.
          onDelete={onDelete !== undefined ? () => onDelete(c.id) : undefined}
          // onEdit 함수가 제공된 경우, 댓글 ID와 함께 호출하는 새로운 함수를 생성하여 전달합니다.
          onEdit={onEdit !== undefined ? () => onEdit(c.id) : undefined}
        />
      ))}
    </div>
  );
};
