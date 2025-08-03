/**
 * 🗞️ NewsPage 컴포넌트
 * 중앙일보 스타일의 뉴스 메인 페이지
 */

import React, { useState } from 'react';
import classNames from 'classnames/bind';

// 🏗️ Layout 컴포넌트를 가져옵니다
import { PageLayout } from '../../layouts/PageLayout';

// 🧩 Molecules 컴포넌트를 가져옵니다
import { NewsNavigation } from '../../components/Molecules/NewsNavigation';
import { NewsCard } from '../../components/Molecules/NewsCard';

// 타입 정의를 가져옵니다
import type { NewsCategory } from '../../components/Molecules/NewsNavigation';

// 이 컴포넌트의 스타일을 가져옵니다
import styles from './NewsPage.module.scss';

const cx = classNames.bind(styles);

/**
 * 🎯 뉴스 데이터 인터페이스
 */
export interface NewsData {
  id: string;
  title: string;
  summary?: string;
  thumbnail?: string;
  category: NewsCategory;
  reporter?: string;
  publishedAt: string;
  viewCount?: number;
  commentCount?: number;
  isPopular?: boolean;
  isMain?: boolean;
}

/**
 * 🎯 NewsPage 컴포넌트의 Props 인터페이스 정의
 */
export interface NewsPageProps {
  /**
   * 📰 표시할 뉴스 목록
   */
  news: NewsData[];

  /**
   * 🏷️ 현재 선택된 카테고리
   */
  activeCategory?: NewsCategory;

  /**
   * 📱 로딩 상태
   */
  loading?: boolean;

  /**
   * 📝 페이지 제목
   */
  title?: string;

  /**
   * 📄 페이지 부제목
   */
  subtitle?: string;

  /**
   * 🎨 추가적인 CSS 클래스를 적용할 수 있습니다
   */
  className?: string;

  /**
   * 🏷️ 카테고리 변경 이벤트 핸들러
   */
  onCategoryChange?: (category: NewsCategory) => void;

  /**
   * 🖱️ 뉴스 클릭 이벤트 핸들러
   */
  onNewsClick?: (newsId: string) => void;

  /**
   * 👤 기자 클릭 이벤트 핸들러
   */
  onReporterClick?: (reporter: string) => void;

  /**
   * 🏷️ 카테고리 클릭 이벤트 핸들러
   */
  onCategoryClick?: (category: string) => void;
}

/**
 * 🚀 NewsPage 컴포넌트 정의
 */
export const NewsPage: React.FC<NewsPageProps> = ({
  news,
  activeCategory = '전체',
  loading = false,
  title = '중앙일보',
  subtitle = '정확하고 신뢰할 수 있는 뉴스를 제공합니다',
  className,
  onCategoryChange,
  onNewsClick,
  onReporterClick,
  onCategoryClick,
}) => {
  /**
   * 🎯 카테고리별 뉴스 필터링
   */
  const filteredNews = activeCategory === '전체' 
    ? news 
    : news.filter(item => item.category === activeCategory);

  /**
   * 🎯 주요 뉴스와 일반 뉴스 분리
   */
  const mainNews = filteredNews.filter(item => item.isMain);
  const regularNews = filteredNews.filter(item => !item.isMain);

  /**
   * 🎨 페이지 헤더 렌더링 함수
   */
  const renderHeader = () => (
    <div className={cx('news-page__header')}>
      <h1 className={cx('news-page__title')}>{title}</h1>
      {subtitle && <p className={cx('news-page__subtitle')}>{subtitle}</p>}
      
      {/* 🗞️ 뉴스 네비게이션 */}
      <NewsNavigation
        activeCategory={activeCategory}
        onCategoryChange={onCategoryChange}
        variant="default"
      />
    </div>
  );

  /**
   * 🎨 로딩 상태 렌더링 함수
   */
  const renderLoading = () => (
    <div className={cx('news-page__loading')}>
      <div className={cx('news-page__loading-spinner')}></div>
      <p>뉴스를 불러오는 중...</p>
    </div>
  );

  /**
   * 🎨 주요 뉴스 섹션 렌더링 함수
   */
  const renderMainNews = () => {
    if (mainNews.length === 0) return null;

    return (
      <section className={cx('news-page__main-section')}>
        <h2 className={cx('news-page__section-title')}>⭐ 주요 뉴스</h2>
        <div className={cx('news-page__main-grid')}>
          {mainNews.map(item => (
            <NewsCard
              key={item.id}
              {...item}
              onClick={onNewsClick}
              onReporterClick={onReporterClick}
              onCategoryClick={onCategoryClick}
            />
          ))}
        </div>
      </section>
    );
  };

  /**
   * 🎨 일반 뉴스 섹션 렌더링 함수
   */
  const renderRegularNews = () => {
    if (regularNews.length === 0) return null;

    return (
      <section className={cx('news-page__regular-section')}>
        <h2 className={cx('news-page__section-title')}>
          {activeCategory === '전체' ? '📰 최신 뉴스' : `${activeCategory} 뉴스`}
        </h2>
        <div className={cx('news-page__regular-grid')}>
          {regularNews.map(item => (
            <NewsCard
              key={item.id}
              {...item}
              onClick={onNewsClick}
              onReporterClick={onReporterClick}
              onCategoryClick={onCategoryClick}
            />
          ))}
        </div>
      </section>
    );
  };

  /**
   * 🎨 빈 상태 렌더링 함수
   */
  const renderEmpty = () => (
    <div className={cx('news-page__empty')}>
      <p>해당 카테고리의 뉴스가 없습니다.</p>
    </div>
  );

  /**
   * 🎨 페이지 내용 렌더링 함수
   */
  const renderContent = () => {
    if (loading) {
      return renderLoading();
    }

    if (filteredNews.length === 0) {
      return renderEmpty();
    }

    return (
      <div className={cx('news-page__content')}>
        {renderMainNews()}
        {renderRegularNews()}
      </div>
    );
  };

  /**
   * 🎨 페이지 푸터 렌더링 함수
   */
  const renderFooter = () => (
    <div className={cx('news-page__footer')}>
      <p>© 2024 중앙일보. 모든 권리 보유.</p>
      <p>정확하고 신뢰할 수 있는 뉴스를 제공합니다.</p>
    </div>
  );

  /**
   * 🎨 JSX 반환
   */
  return (
    <PageLayout
      header={renderHeader()}
      footer={renderFooter()}
      className={cx('news-page', className)}
      maxWidth="xl"
      padding="lg"
    >
      {renderContent()}
    </PageLayout>
  );
}; 