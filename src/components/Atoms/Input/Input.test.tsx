import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

describe('Input', () => {
  it('renders with value and placeholder', () => {
    render(<Input value='' onChange={() => {}} placeholder='입력' />);
    expect(screen.getByPlaceholderText('입력')).toBeInTheDocument();
  });
  it('calls onChange', async () => {
    const handleChange = vi.fn();
    render(<Input value='' onChange={handleChange} />);
    await userEvent.type(screen.getByRole('textbox'), 'hi');
    expect(handleChange).toHaveBeenCalled();
  });
  it('is disabled', () => {
    render(<Input value='' onChange={() => {}} disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
