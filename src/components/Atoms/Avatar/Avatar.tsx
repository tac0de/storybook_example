import styles from './Avatar.module.scss';

import type React from 'react';

/**
 * Avatar 컴포넌트의 props를 정의합니다.
 */
export interface AvatarProps {
  /** 프로필 이미지 URL (없으면 이니셜) */
  readonly src?: string;
  /** 대체 텍스트 또는 이니셜 */
  readonly alt: string;
  /** 크기(px) */
  readonly size?: number;
  /** 추가 클래스 */
  readonly className?: string;
}

/**
 * 사용자 프로필 이미지를 표시하는 아바타 컴포넌트입니다.
 * 이미지 URL이 제공되면 이미지를, 그렇지 않으면 대체 텍스트의 첫 두 글자를 이니셜로 표시합니다.
 * @param {AvatarProps} props - 아바타 컴포넌트의 props.
 * @returns {React.ReactElement} - 렌더링된 아바타 컴포넌트.
 */
export const Avatar: React.FC<AvatarProps> = ({
  src = '',
  alt,
  size = 40,
  className = '',
}) => {
  const style = { width: size, height: size };

  return src ? (
    <img
      src={src}
      alt={alt}
      className={[styles.avatar, className].filter(Boolean).join(' ')}
      style={style}
    />
  ) : (
    <span
      className={[styles.avatar, styles.placeholder, className]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {alt.slice(0, 2).toUpperCase()}
    </span>
  );
};
