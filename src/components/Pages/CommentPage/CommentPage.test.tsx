import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CommentPage } from './CommentPage';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

/**
 * CommentPage 컴포넌트에 대한 테스트 스위트입니다.
 * 이 테스트는 페이지의 초기 렌더링 상태와 핵심 기능(댓글 추가 및 삭제)을 검증합니다.
 */
describe('CommentPage', () => {
  /**
   * 페이지가 처음 렌더링될 때 헤더와 입력 필드가 올바르게 표시되는지 테스트합니다.
   */
  it('renders header and input', () => {
    render(<CommentPage />);
    // 헤더의 텍스트가 "댓글 (숫자)" 형식인지 정규식으로 확인합니다.
    expect(screen.getByText(/댓글 \(\d+\)/)).toBeInTheDocument();
    // placeholder 텍스트로 입력 필드가 존재하는지 확인합니다.
    expect(
      screen.getByPlaceholderText('댓글을 입력하세요')
    ).toBeInTheDocument();
  });

  /**
   * 사용자가 댓글을 성공적으로 추가하고 삭제할 수 있는지 테스트하는 E2E 시나리오입니다.
   */
  it('can add and delete a comment', async () => {
    render(<CommentPage />);
    const input = screen.getByPlaceholderText('댓글을 입력하세요');

    // 1. 입력 필드에 "테스트 댓글"을 입력합니다.
    await userEvent.type(input, '테스트 댓글');
    // 2. "등록" 버튼을 클릭합니다.
    await userEvent.click(screen.getByRole('button', { name: '등록' }));

    // 3. 새로 추가된 댓글이 화면에 표시되는지 확인합니다.
    expect(screen.getByText('테스트 댓글')).toBeInTheDocument();

    // 4. 새로 추가된 댓글(마지막 댓글)의 "삭제" 버튼을 클릭합니다.
    const deleteButtons = screen.getAllByRole('button', { name: '삭제' });
    const lastDeleteButton = deleteButtons[deleteButtons.length - 1];
    await userEvent.click(lastDeleteButton);

    // 5. 댓글이 화면에서 사라졌는지 확인합니다.
    expect(screen.queryByText('테스트 댓글')).not.toBeInTheDocument();
  });
});
