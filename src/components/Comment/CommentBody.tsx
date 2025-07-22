import React from 'react';

interface CommentBodyProps {
  text: string;
  isEditing?: boolean;
  editValue?: string;
  onEditChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditSubmit?: (e: React.FormEvent) => void;
}

export const CommentBody: React.FC<CommentBodyProps> = ({ text, isEditing = false, editValue = '', onEditChange, onEditSubmit }) => (
  isEditing ? (
    <form onSubmit={onEditSubmit} style={{ marginBottom: 8 }}>
      <input
        className="edit-input"
        type="text"
        value={editValue}
        onChange={onEditChange}
        style={{ padding: '6px', width: '80%' }}
      />
      <button type="submit" className="action-btn" style={{ marginTop: 8 }}>저장</button>
    </form>
  ) : (
    <p className="text">{text}</p>
  )
); 