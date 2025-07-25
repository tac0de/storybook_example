import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

/**
 * Input 컴포넌트에 대한 테스트 스위트입니다.
 * 이 테스트는 Input 컴포넌트의 렌더링, 값 변경, 비활성화 상태를 검증합니다.
 */
describe('Input', () => {
  /**
   * `value`와 `placeholder` prop이 올바르게 렌더링되는지 테스트합니다.
   */
  it('renders with value and placeholder', () => {
    render(<Input value='' onChange={() => {}} placeholder='입력' />);
    expect(screen.getByPlaceholderText('입력')).toBeInTheDocument();
  });

  /**
   * 사용자가 텍스트를 입력했을 때 `onChange` 핸들러가 호출되는지 테스트합니다.
   */
  it('calls onChange', async () => {
    const handleChange = vi.fn();
    render(<Input value='' onChange={handleChange} />);
    await userEvent.type(screen.getByRole('textbox'), 'hi');
    expect(handleChange).toHaveBeenCalled();
  });

  /**
   * `disabled` prop이 설정되었을 때 입력 필드가 비활성화되는지 테스트합니다.
   */
  it('is disabled', () => {
    render(<Input value='' onChange={() => {}} disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
