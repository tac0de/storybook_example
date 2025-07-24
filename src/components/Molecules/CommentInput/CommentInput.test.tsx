import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { CommentInput } from './CommentInput';
import '@testing-library/jest-dom';

describe('CommentInput', () => {
  it('renders input and button', () => {
    render(<CommentInput value='' onChange={() => {}} onSubmit={() => {}} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  it('calls onChange', async () => {
    const handleChange = vi.fn();
    render(
      <CommentInput value='' onChange={handleChange} onSubmit={() => {}} />
    );
    await userEvent.type(screen.getByRole('textbox'), 'hi');
    expect(handleChange).toHaveBeenCalled();
  });
  it('calls onSubmit on button click', async () => {
    const handleSubmit = vi.fn();
    render(
      <CommentInput value='hi' onChange={() => {}} onSubmit={handleSubmit} />
    );
    await userEvent.click(screen.getByRole('button'));
    expect(handleSubmit).toHaveBeenCalled();
  });
});
