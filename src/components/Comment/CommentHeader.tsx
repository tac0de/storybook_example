import type React from 'react';

/**
 * CommentHeaderProps
 * @property author - 댓글 작성자 이름
 * @property timestamp - 댓글 작성 시간(문자열)
 */
interface CommentHeaderProps {
  author: string;
  timestamp: string;
}

/**
 * CommentHeader 컴포넌트
 * - 댓글 상단에 작성자와 작성 시간을 표시하는 역할
 */
export const CommentHeader: React.FC<CommentHeaderProps> = ({
  author,
  timestamp,
}) => (
  <div className='comment-header'>
    {/* 작성자 이름 */}
    <span className='author'>{author}</span>
    {/* 작성 시간 */}
    <span className='timestamp'>{timestamp}</span>
  </div>
);
