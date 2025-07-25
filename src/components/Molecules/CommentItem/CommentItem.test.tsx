import { render, screen } from '@testing-library/react';
import { CommentItem } from './CommentItem';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

/**
 * CommentItem 컴포넌트에 대한 테스트 스위트입니다.
 * 이 테스트는 댓글 내용의 렌더링과 수정/삭제 버튼의 상호작용을 검증합니다.
 */
describe('CommentItem', () => {
  /**
   * 작성자, 댓글 내용, 타임스탬프가 올바르게 렌더링되는지 테스트합니다.
   */
  it('renders author, text, timestamp', () => {
    render(<CommentItem author='홍길동' text='댓글' timestamp='방금 전' />);
    expect(screen.getByText('홍길동')).toBeInTheDocument();
    expect(screen.getByText('댓글')).toBeInTheDocument();
    expect(screen.getByText('방금 전')).toBeInTheDocument();
  });

  /**
   * 수정 및 삭제 버튼이 존재할 때, 각 버튼을 클릭하면 `onEdit`과 `onDelete` 핸들러가 호출되는지 테스트합니다.
   */
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
