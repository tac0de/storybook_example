import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

/**
 * Avatar 컴포넌트에 대한 테스트 스위트입니다.
 * 이 테스트는 Avatar 컴포넌트가 이미지 소스(src)의 유무에 따라
 * 올바르게 이미지 또는 이니셜을 렌더링하는지 확인합니다.
 */
describe('Avatar', () => {
  /**
   * `src` prop이 제공될 경우, Avatar 컴포넌트가 이미지를 렌더링하는지 테스트합니다.
   * `alt` 텍스트도 올바르게 적용되었는지 확인합니다.
   */
  it('renders image when src is provided', () => {
    render(<Avatar src='img.png' alt='User' />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'img.png');
    expect(img).toHaveAttribute('alt', 'User');
  });

  /**
   * `src` prop이 제공되지 않을 경우, Avatar 컴포넌트가 `alt` prop에서 파생된 이니셜을 렌더링하는지 테스트합니다.
   */
  it('renders initials when src is not provided', () => {
    render(<Avatar alt='AB' />);
    expect(screen.getByText('AB')).toBeInTheDocument();
  });
});
