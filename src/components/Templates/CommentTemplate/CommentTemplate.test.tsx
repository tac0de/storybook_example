import { render, screen } from '@testing-library/react';
import { CommentTemplate } from './CommentTemplate';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('CommentTemplate', () => {
  it('renders header, body, footer', () => {
    render(
      <CommentTemplate header='헤더' footer='푸터'>
        본문
      </CommentTemplate>
    );
    expect(screen.getByText('헤더')).toBeInTheDocument();
    expect(screen.getByText('본문')).toBeInTheDocument();
    expect(screen.getByText('푸터')).toBeInTheDocument();
  });
});
