import { render, screen } from '@testing-library/react';
import { CommentItem } from './CommentItem';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

describe('CommentItem', () => {
  it('renders author, text, timestamp', () => {
    render(<CommentItem author='홍길동' text='댓글' timestamp='방금 전' />);
    expect(screen.getByText('홍길동')).toBeInTheDocument();
    expect(screen.getByText('댓글')).toBeInTheDocument();
    expect(screen.getByText('방금 전')).toBeInTheDocument();
  });
  it('calls onEdit and onDelete', () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    render(
      <CommentItem
        author='홍길동'
        text='댓글'
        timestamp='방금 전'
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );
    screen.getByText('수정').click();
    screen.getByText('삭제').click();
    expect(onEdit).toHaveBeenCalled();
    expect(onDelete).toHaveBeenCalled();
  });
});
