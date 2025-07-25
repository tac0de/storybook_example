import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { CommentInput } from './CommentInput';
import '@testing-library/jest-dom';

/**
 * CommentInput 컴포넌트에 대한 테스트 스위트입니다.
 * 이 테스트는 컴포넌트의 렌더링과 사용자 상호작용(입력, 제출)을 검증합니다.
 */
describe('CommentInput', () => {
  /**
   * 입력 필드(textbox)와 제출 버튼(button)이 올바르게 렌더링되는지 테스트합니다.
   */
  it('renders input and button', () => {
    render(<CommentInput value='' onChange={() => {}} onSubmit={() => {}} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  /**
   * 사용자가 텍스트를 입력할 때 `onChange` 핸들러가 호출되는지 테스트합니다.
   */
  it('calls onChange', async () => {
    const handleChange = vi.fn();
    render(
      <CommentInput value='' onChange={handleChange} onSubmit={() => {}} />
    );
    await userEvent.type(screen.getByRole('textbox'), 'hi');
    expect(handleChange).toHaveBeenCalled();
  });

  /**
   * 사용자가 제출 버튼을 클릭할 때 `onSubmit` 핸들러가 호출되는지 테스트합니다.
   */
  it('calls onSubmit on button click', async () => {
    const handleSubmit = vi.fn();
    render(
      <CommentInput value='hi' onChange={() => {}} onSubmit={handleSubmit} />
    );
    await userEvent.click(screen.getByRole('button'));
    expect(handleSubmit).toHaveBeenCalled();
  });
});
