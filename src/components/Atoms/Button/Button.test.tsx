import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';
import '@testing-library/jest-dom';

/**
 * Button 컴포넌트에 대한 테스트 스위트입니다.
 * 이 테스트는 버튼의 렌더링, 스타일 적용, 클릭 이벤트, 비활성화 상태를 검증합니다.
 */
describe('Button', () => {
  /**
   * 버튼 내에 자식 요소(children)가 올바르게 렌더링되는지 테스트합니다.
   */
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  /**
   * `variant`와 `size` prop에 따라 적절한 CSS 클래스가 적용되는지 테스트합니다.
   */
  it('applies variant and size classes', () => {
    render(
      <Button variant='danger' size='large'>
        Danger
      </Button>
    );
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('danger');
    expect(btn.className).toContain('large');
  });

  /**
   * 버튼 클릭 시 `onClick` 핸들러가 호출되는지 테스트합니다.
   */
  it('calls onClick', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  /**
   * `disabled` prop이 설정되었을 때 버튼이 비활성화되는지 테스트합니다.
   */
  it('is disabled', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
