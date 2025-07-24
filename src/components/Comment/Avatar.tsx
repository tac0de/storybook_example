import type React from 'react';
import './comment.css';

/**
 * AvatarProps
 * @property author - 댓글 작성자 이름
 * @property avatarUrl - 프로필 이미지 URL (없으면 null)
 */
interface AvatarProps {
  author: string;
  avatarUrl?: string | null;
}

/**
 * stringToColor
 * - 문자열(작성자 이름)로부터 고유한 색상을 생성
 * - 프로필 이미지가 없을 때 플레이스홀더 배경색으로 사용
 */
function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 60%, 60%)`;
  return color;
}

/**
 * Avatar 컴포넌트
 * - 프로필 이미지가 있으면 이미지를, 없으면 플레이스홀더(이니셜+색상)를 렌더링
 */
export const Avatar: React.FC<AvatarProps> = ({ author, avatarUrl }) =>
  avatarUrl ? (
    // 프로필 이미지 렌더링
    <img src={avatarUrl} alt={`${author}의 프로필 사진`} className='avatar' />
  ) : (
    // 프로필 이미지가 없을 때 플레이스홀더 렌더링
    <div
      className='avatar-placeholder'
      aria-label={`${author}의 프로필 이미지 없음`}
      style={{ backgroundColor: stringToColor(author) }}
    >
      {author && author.length > 0 ? author[0] : '?'}
    </div>
  );
