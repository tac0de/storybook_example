import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('Avatar', () => {
  it('renders image when src is provided', () => {
    render(<Avatar src='img.png' alt='User' />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'img.png');
    expect(img).toHaveAttribute('alt', 'User');
  });
  it('renders initials when src is not provided', () => {
    render(<Avatar alt='AB' />);
    expect(screen.getByText('AB')).toBeInTheDocument();
  });
});
