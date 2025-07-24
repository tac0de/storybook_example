import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';
import '@testing-library/jest-dom';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });
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
  it('calls onClick', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  it('is disabled', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
