// src/components/Comment.tsx

import React from 'react';
import { Avatar } from './Avatar';
import { CommentHeader } from './CommentHeader';
import { CommentBody } from './CommentBody';
import { ActionBar } from './ActionBar';
import './comment.css';

interface CommentProps {
  author: string;
  avatarUrl?: string | null;
  text: string;
  timestamp: string;
}

export const Comment: React.FC<CommentProps> = ({ author, avatarUrl = null, text, timestamp }) => {
  return (
    <div className="comment-container">
      <div className="avatar-container">
        <Avatar author={author} avatarUrl={avatarUrl} />
      </div>
      <div className="comment-body">
        <CommentHeader author={author} timestamp={timestamp} />
        <CommentBody text={text} />
        <ActionBar />
      </div>
    </div>
  );
};