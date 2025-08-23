import React, { memo } from 'react';
import classNamesBind from 'classnames/bind';
import styles from './BrandBlock.module.scss';
import Logo from '../../Atoms/Logo/Logo';

const cx = classNamesBind.bind(styles);

export type BrandBlockMode = 'separate' | 'full';

export interface BrandBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 'separate' = 60 + 워드마크 각각, 'full' = 합쳐진 한 장 */
  mode?: BrandBlockMode;
  /** separate 모드: 워드마크 가로/세로 (둘 중 하나만 줘도 됨) */
  wordWidth?: number;
  wordHeight?: number;
  markWidth?: number;
  markHeight?: number;
  /** 전체 갭(px). 기본 8 */
  gap?: number;
  /** 간격/여백 축약 */
  compact?: boolean;
  /** 클릭 시 홈 등으로 이동하게 a 태그로 감쌈 */
  href?: string;
  /** 링크 접근성 라벨 */
  ariaLabel?: string;
}

const BrandBlock: React.FC<BrandBlockProps> = memo(function BrandBlock({
  mode = 'separate',
  markWidth,
  markHeight,
  wordWidth,
  wordHeight,
  gap = 8,
  compact = false,
  href,
  ariaLabel,
  className,
  ...rest
}) {
  const style: React.CSSProperties = {
    ['--brand-gap' as any]: `${gap}px`,
  };

  const content = (
    <div {...rest} className={cx('root', `mode-${mode}`, { compact }, className)} style={style}>
      <>
        {/* 60 마크 */}
        <Logo variant="mark" alt="JoongAng 60th" className={cx('mark')} width={markWidth} height={markHeight} />
        {/* 워드마크 */}
        <Logo variant="word" alt="The JoongAng" width={wordWidth} height={wordHeight} className={cx('word')} />
      </>
    </div>
  );

  if (href) {
    return (
      <a href={href} className={cx('linkWrap')} aria-label={ariaLabel ?? 'Go to home'}>
        {content}
      </a>
    );
  }

  return content;
});

export default BrandBlock;
