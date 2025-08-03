/**
 * 🗞️ NewsNavigation 컴포넌트
 * 중앙일보 스타일의 뉴스 카테고리 네비게이션
 */

import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Button } from '../../Atoms/Button';
import styles from './NewsNavigation.module.scss';

const cx = classNames.bind(styles);

export type NewsCategory = 
  | '전체'
  | '정치'
  | '경제'
  | '사회'
  | '문화'
  | '스포츠'
  | '기술'
  | '국제'
  | '연예'
  | '건강'
  | '교육'
  | '환경';

export interface NewsNavigationProps {
  activeCategory: NewsCategory;
  categories?: NewsCategory[];
  useMobileDropdown?: boolean;
  variant?: 'default' | 'compact' | 'minimal';
  className?: string;
  onCategoryChange?: (category: NewsCategory) => void;
  onMobileMenuToggle?: (isOpen: boolean) => void;
}

export const NewsNavigation: React.FC<NewsNavigationProps> = ({
  activeCategory,
  categories = [
    '전체', '정치', '경제', '사회', '문화', '스포츠',
    '기술', '국제', '연예', '건강', '교육', '환경'
  ],
  useMobileDropdown = true,
  variant = 'default',
  className,
  onCategoryChange,
  onMobileMenuToggle,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCategoryClick = (category: NewsCategory) => {
    if (onCategoryChange) {
      onCategoryChange(category);
    }
    
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      if (onMobileMenuToggle) {
        onMobileMenuToggle(false);
      }
    }
    
    console.log('카테고리 변경:', category);
  };

  const handleMobileMenuToggle = () => {
    const newIsOpen = !isMobileMenuOpen;
    setIsMobileMenuOpen(newIsOpen);
    
    if (onMobileMenuToggle) {
      onMobileMenuToggle(newIsOpen);
    }
  };

  const renderCategoryButton = (category: NewsCategory) => {
    const isActive = category === activeCategory;
    
    return (
      <Button
        key={category}
        variant={isActive ? 'primary' : 'ghost'}
        size={variant === 'compact' ? 'sm' : 'md'}
        onClick={() => handleCategoryClick(category)}
        className={cx(
          'news-navigation__category-button',
          {
            'news-navigation__category-button--active': isActive,
          }
        )}
      >
        {category}
      </Button>
    );
  };

  const renderDesktopNavigation = () => (
    <nav className={cx('news-navigation__desktop')}>
      <ul className={cx('news-navigation__list')}>
        {categories.map(category => (
          <li key={category} className={cx('news-navigation__item')}>
            {renderCategoryButton(category)}
          </li>
        ))}
      </ul>
    </nav>
  );

  const renderMobileNavigation = () => (
    <div className={cx('news-navigation__mobile')}>
      <Button
        variant="ghost"
        size="md"
        onClick={handleMobileMenuToggle}
        className={cx('news-navigation__mobile-toggle')}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
      >
        <span className={cx('news-navigation__mobile-toggle-text')}>
          {activeCategory}
        </span>
        <span className={cx('news-navigation__mobile-toggle-icon', {
          'news-navigation__mobile-toggle-icon--open': isMobileMenuOpen,
        })}>
          ▼
        </span>
      </Button>

      {isMobileMenuOpen && (
        <div 
          id="mobile-menu"
          className={cx('news-navigation__mobile-dropdown')}
          role="menu"
        >
          {categories.map(category => (
            <div key={category} className={cx('news-navigation__mobile-item')}>
              {renderCategoryButton(category)}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div 
      className={cx(
        'news-navigation',
        `news-navigation--${variant}`,
        className
      )}
      role="navigation"
      aria-label="뉴스 카테고리 네비게이션"
    >
      <div className={cx('news-navigation__desktop-wrapper')}>
        {renderDesktopNavigation()}
      </div>

      {useMobileDropdown && (
        <div className={cx('news-navigation__mobile-wrapper')}>
          {renderMobileNavigation()}
        </div>
      )}
    </div>
  );
}; 