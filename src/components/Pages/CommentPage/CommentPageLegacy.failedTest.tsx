// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { describe, it, expect } from 'vitest';

// import { CommentPage } from './CommentPage';
// import '@testing-library/jest-dom';

// describe('CommentPage', () => {
//   it('renders header and input', () => {
//     render(<CommentPage />);
//     expect(screen.getByText(/댓글/)).toBeInTheDocument();
//     expect(
//       screen.getByPlaceholderText('댓글을 입력하세요')
//     ).toBeInTheDocument();
//   });
//   it('can add and delete a comment', async () => {
//     render(<CommentPage />);
//     const input = screen.getByPlaceholderText('댓글을 입력하세요');

//     await userEvent.type(input, '테스트 댓글');
//     await userEvent.click(screen.getByRole('button', { name: '등록' }));
//     expect(screen.getByText('테스트 댓글')).toBeInTheDocument();
//     await userEvent.click(screen.getAllByText('삭제')[0]);
//     expect(screen.queryByText('테스트 댓글')).not.toBeInTheDocument();
//   });
// });
