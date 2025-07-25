import { render, screen } from '@testing-library/react';
import { CommentList } from './CommentList';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

/**
 * CommentList 컴포넌트에 대한 테스트 스위트입니다.
 * 이 테스트는 댓글 목록, 로딩 상태, 빈 목록 상태의 렌더링을 검증합니다.
 */
describe('CommentList', () => {
  /**
   * `comments` prop으로 전달된 댓글들이 올바르게 렌더링되는지 테스트합니다.
   */
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

  /**
   * `loading` prop이 true일 때 "로딩 중..." 메시지가 표시되는지 테스트합니다.
   */
  it('shows loading', () => {
    render(<CommentList comments={[]} loading />);
    expect(screen.getByText('로딩 중...')).toBeInTheDocument();
  });

  /**
   * 댓글 목록이 비어있고 로딩 상태가 아닐 때, `emptyMessage`가 표시되는지 테스트합니다.
   */
  it('shows empty message', () => {
    render(<CommentList comments={[]} loading={false} emptyMessage='없음' />);
    expect(screen.getByText('없음')).toBeInTheDocument();
  });
});
