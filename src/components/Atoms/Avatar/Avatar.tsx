import styles from './Avatar.module.scss';

import type React from 'react';

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
