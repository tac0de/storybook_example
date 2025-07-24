import { useState } from 'react';

import { CommentInput } from '../../Molecules/CommentInput';
import { CommentList } from '../../Organisms/CommentList';
import { CommentTemplate } from '../../Templates/CommentTemplate';

import styles from './CommentPage.module.scss';

import type { Comment } from '../../Organisms/CommentList';

const initialComments: Comment[] = [
  { id: '1', author: '홍길동', text: '첫 댓글', timestamp: '방금 전' },
  { id: '2', author: '김철수', text: '두 번째 댓글', timestamp: '1분 전' },
];

export const CommentPage = (): React.ReactNode => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [input, setInput] = useState('');
  const [loading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleAdd = (): void => {
    if (!input.trim()) return;
    setComments([
      ...comments,
      {
        id: String(Date.now()),
        author: '나',
        text: input,
        timestamp: '방금 전',
      },
    ]);
    setInput('');
  };
  const handleDelete = (id: string): void => {
    setComments(comments.filter(c => c.id !== id));
  };
  // 수정 기능은 예시로만 제공
  const handleEdit = (id: string, currentText: string): void => {
    setEditingId(id);
    setEditValue(currentText);
  };

  const handleEditSave = (): void => {
    if (editingId !== null && editValue !== '') {
      setComments(
        comments.map(c => (c.id === editingId ? { ...c, text: editValue } : c))
      );
      setEditingId(null);
      setEditValue('');
    }
  };
  const handleEditCancel = (): void => {
    setEditingId(null);
    setEditValue('');
  };

  return (
    <CommentTemplate
      header={<span>댓글 ({comments.length})</span>}
      footer={<span>Copyright 2024</span>}
      className={styles.commentPage}
    >
      <CommentInput
        value={input}
        onChange={e => setInput(e.target.value)}
        onSubmit={handleAdd}
        placeholder='댓글을 입력하세요'
        disabled={loading}
      />
      <div style={{ height: 16 }} />
      <CommentList
        comments={comments}
        loading={loading}
        onDelete={handleDelete}
        onEdit={id => {
          const comment = comments.find(c => c.id === id);

          if (comment) handleEdit(id, comment.text);
        }}
        emptyMessage='아직 댓글이 없습니다.'
      />
      {editingId !== null && (
        <div>
          <input
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
          />
          <button onClick={handleEditSave}>저장</button>
          <button onClick={handleEditCancel}>취소</button>
        </div>
      )}
    </CommentTemplate>
  );
};
