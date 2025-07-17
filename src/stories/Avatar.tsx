import React from 'react';
import './comment.css';

interface AvatarProps {
  author: string;
  avatarUrl?: string | null;
}

// author 문자열을 해시하여 고정된 색상 반환
function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 60%, 60%)`;
  return color;
}

export const Avatar: React.FC<AvatarProps> = ({ author, avatarUrl }) => (
  avatarUrl ? (
    <img src={avatarUrl} alt={`${author}의 프로필 사진`} className="avatar" />
  ) : (
    <div
      className="avatar-placeholder"
      aria-label={`${author}의 프로필 이미지 없음`}
      style={{ backgroundColor: stringToColor(author) }}
    >
      {author && author.length > 0 ? author[0] : '?'}
    </div>
  )
); 