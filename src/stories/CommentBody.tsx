import React from 'react';

interface CommentBodyProps {
  text: string;
}

export const CommentBody: React.FC<CommentBodyProps> = ({ text }) => (
  <p className="text">{text}</p>
); 