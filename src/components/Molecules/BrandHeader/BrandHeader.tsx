/**
 * BrandHeader 컴포넌트
 *
 * 브랜드 로고와 관련 요소들을 포함하는 헤더 영역의 분자 컴포넌트입니다.
 * 로고, 엠블럼, 브랜드명 등을 조합하여 일관된 브랜드 아이덴티티를 제공합니다.
 *
 * 주요 기능:
 * - 로고 이미지 표시
 * - 엠블럼 이미지 지원
 * - 브랜드명 텍스트
 * - 링크 기능
 * - 반응형 크기 조절
 * - 접근성 지원
 */

import React, { memo } from 'react';
import classNames from 'classnames';
import './BrandHeader.scss';

/**
 * BrandHeader 컴포넌트의 Props 인터페이스
 */
export interface BrandHeaderProps {
  /** 로고 이미지 URL */
  logoUrl: string;
  /** 로고 이미지 alt 텍스트 */
  logoAlt: string;
  /** 엠블럼 이미지 URL (선택사항) */
  emblemUrl?: string;
  /** 엠블럼 이미지 alt 텍스트 */
  emblemAlt?: string;
  /** 브랜드명 텍스트 */
  brandName?: string;
  /** 링크 URL */
  href?: string;
  /** 외부 링크 여부 */
  external?: boolean;
  /** 크기 변형 */
  size?: 'sm' | 'md' | 'lg';
  /** 레이아웃 방향 */
  direction?: 'horizontal' | 'vertical';
  /** 엠블럼 표시 위치 */
  emblemPosition?: 'left' | 'right' | 'top' | 'bottom';
  /** 클릭 핸들러 */
  onClick?: (e: React.MouseEvent) => void;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * BrandHeader 컴포넌트
 */
const BrandHeader: React.FC<BrandHeaderProps> = memo(function BrandHeader({
  logoUrl,
  logoAlt,
  emblemUrl,
  emblemAlt,
  brandName,
  href,
  external = false,
  size = 'md',
  direction = 'horizontal',
  emblemPosition = 'left',
  onClick,
  className,
}) {
  const classes = classNames(
    'brand-header',
    `brand-header--${size}`,
    `brand-header--${direction}`,
    {
      [`brand-header--emblem-${emblemPosition}`]: emblemUrl,
      'brand-header--clickable': href || onClick,
    },
    className
  );

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e);
    }
  };

  const renderContent = () => (
    <>
      {emblemUrl && (emblemPosition === 'left' || emblemPosition === 'top') && (
        <img src={emblemUrl} alt={emblemAlt || ''} className="brand-header__emblem brand-header__emblem--before" />
      )}

      <div className="brand-header__main">
        <img src={logoUrl} alt={logoAlt} className="brand-header__logo" />
        {brandName && <span className="brand-header__name">{brandName}</span>}
      </div>

      {emblemUrl && (emblemPosition === 'right' || emblemPosition === 'bottom') && (
        <img src={emblemUrl} alt={emblemAlt || ''} className="brand-header__emblem brand-header__emblem--after" />
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={handleClick}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {renderContent()}
      </a>
    );
  }

  if (onClick) {
    return (
      <button type="button" className={classes} onClick={handleClick}>
        {renderContent()}
      </button>
    );
  }

  return <div className={classes}>{renderContent()}</div>;
});

export default BrandHeader;
