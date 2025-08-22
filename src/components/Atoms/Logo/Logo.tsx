import React, { memo } from 'react';
import classNamesBind from 'classnames/bind';
import styles from './Logo.module.scss';

const cx = classNamesBind.bind(styles);

export type LogoVariant = 'mark' | 'word';

export interface LogoProps extends React.HTMLAttributes<HTMLImageElement> {
  /** full = 마크 + 워드, mark = 60 로고, word = The JoongAng 워드마크 */
  variant?: LogoVariant;
  /** alt 텍스트. 없으면 장식용 */
  alt?: string;
  /** 이미지 크기(px). 기본 auto */
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = memo(function Logo({
  variant = 'mark',
  alt = 'The JoongAng',
  width,
  height,
  className,
  ...imgProps
}) {
  // 👉 실제 경로는 /public/images/... 으로 넣으면 Next.js, Vite 둘 다 가능
  const srcMap: Record<LogoVariant, string> = {
    mark: '/images/logo-mark.svg', // 60 마크만
    word: '/images/logo-word.png', // The JoongAng 워드마크만
  };

  return (
    <img
      {...imgProps}
      src={srcMap[variant]}
      alt={alt}
      width={width}
      height={height}
      className={cx('root', className)}
    />
  );
});

export default Logo;
