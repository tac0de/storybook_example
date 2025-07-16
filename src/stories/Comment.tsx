// src/components/Comment.tsx

import React from 'react';
import './comment.css'; // 스타일 파일은 동일하게 사용합니다.

// 컴포넌트가 받을 props의 타입을 정의합니다.
interface CommentProps {
  /**
   * 댓글 작성자의 이름
   */
  author: string;
  /**
   * 작성자의 프로필 이미지 URL (선택 사항)
   */
  avatarUrl?: string | null;
  /**
   * 댓글 내용
   */
  text: string;
  /**
   * 댓글 작성 시간 또는 날짜
   */
  timestamp: string;
}

/**
 * 사용자 댓글을 표시하는 기본 컴포넌트 (TypeScript 버전)
 */
export const Comment: React.FC<CommentProps> = ({
  author,
  avatarUrl = null, // 기본값을 함수 매개변수에서 직접 설정
  text,
  timestamp,
}) => {
  return (
    <div className="comment-container">
      <div className="avatar-container">
        {avatarUrl ? (
          <img src={avatarUrl} alt={`${author}의 프로필 사진`} className="avatar" />
        ) : (
          <div className="avatar-placeholder" />
        )}
      </div>
      <div className="comment-body">
        <div className="comment-header">
          <span className="author">{author}</span>
          <span className="timestamp">{timestamp}</span>
        </div>
        <p className="text">{text}</p>
      </div>
    </div>
  );
};