import type React from 'react';

/**
 * CommentBodyProps
 * @property text - 댓글 본문 텍스트
 * @property isEditing - 수정 모드 여부
 * @property editValue - 수정 입력값
 * @property onEditChange - 수정 입력값 변경 핸들러
 * @property onEditSubmit - 수정 저장 핸들러
 */
interface CommentBodyProps {
  text: string;
  isEditing?: boolean;
  editValue?: string;
  onEditChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditSubmit?: (e: React.FormEvent) => void;
}

/**
 * CommentBody 컴포넌트
 * - 댓글 본문을 표시하거나, 수정 모드일 때 입력폼을 렌더링
 */
export const CommentBody: React.FC<CommentBodyProps> = ({
  text,
  isEditing = false,
  editValue = '',
  onEditChange,
  onEditSubmit,
}) =>
  isEditing ? (
    // 수정 모드: 입력폼 렌더링
    <form onSubmit={onEditSubmit} style={{ marginBottom: 8 }}>
      <input
        className='edit-input'
        type='text'
        value={editValue}
        onChange={onEditChange}
        style={{ padding: '6px', width: '80%' }}
      />
      <button type='submit' className='action-btn' style={{ marginTop: 8 }}>
        저장
      </button>
    </form>
  ) : (
    // 일반 모드: 본문 텍스트 렌더링
    <p className='text'>{text}</p>
  );
