import React from 'react';

interface CommentHeaderProps {
  author: string;
  timestamp: string;
}

export const CommentHeader: React.FC<CommentHeaderProps> = ({ author, timestamp }) => (
  <div className="comment-header">
    <span className="author">{author}</span>
    <span className="timestamp">{timestamp}</span>
  </div>
); 