import { render, screen } from '@testing-library/react';
import { CommentList } from './CommentList';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('CommentList', () => {
  it('renders comments', () => {
    render(
      <CommentList
        comments={[
          { id: '1', author: '홍길동', text: '댓글', timestamp: '방금 전' },
        ]}
      />
    );
    expect(screen.getByText('댓글')).toBeInTheDocument();
  });
  it('shows loading', () => {
    render(<CommentList comments={[]} loading />);
    expect(screen.getByText('로딩 중...')).toBeInTheDocument();
  });
  it('shows empty message', () => {
    render(<CommentList comments={[]} loading={false} emptyMessage='없음' />);
    expect(screen.getByText('없음')).toBeInTheDocument();
  });
});
