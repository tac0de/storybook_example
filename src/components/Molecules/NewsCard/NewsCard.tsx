/**
 * 🗞️ NewsCard 컴포넌트 학습 가이드
 * 
 * 이 파일은 Molecules 레벨의 컴포넌트로, 중앙일보 스타일의 뉴스 카드를 구현합니다.
 * Atoms 컴포넌트들을 조합하여 뉴스 기사의 미리보기를 만듭니다.
 * 
 * 🎯 학습 포인트:
 * - 뉴스 카드 디자인 패턴
 * - 이미지와 텍스트 레이아웃
 * - 카테고리 및 메타 정보 표시
 * - 호버 효과 및 인터랙션
 */

import React from 'react';
import classNames from 'classnames/bind';

// 🧩 Atoms 컴포넌트를 가져옵니다
import { Avatar } from '../../Atoms/Avatar';
import { Button } from '../../Atoms/Button';

// 이 컴포넌트의 스타일을 가져옵니다
import styles from './NewsCard.module.scss';

const cx = classNames.bind(styles);

/**
 * 🎯 NewsCard 컴포넌트의 Props 인터페이스 정의
 * 
 * 뉴스 카드에 필요한 모든 정보를 props로 받습니다.
 * 실제 애플리케이션에서는 API에서 받아온 뉴스 데이터를 전달합니다.
 */
export interface NewsCardProps {
  /**
   * 🆔 뉴스 기사 고유 ID (필수)
   * 각 뉴스 기사를 구분하는 고유한 식별자입니다
   */
  id: string;

  /**
   * 📰 뉴스 제목 (필수)
   * 뉴스 카드에 표시되는 주요 제목입니다
   */
  title: string;

  /**
   * 📄 뉴스 요약 (선택적)
   * 뉴스 내용의 간단한 요약입니다
   */
  summary?: string;

  /**
   * 🖼️ 썸네일 이미지 URL (선택적)
   * 뉴스 카드에 표시되는 이미지입니다
   */
  thumbnail?: string;

  /**
   * 🏷️ 뉴스 카테고리 (선택적)
   * 정치, 경제, 사회 등의 카테고리입니다
   */
  category?: string;

  /**
   * 👤 기자 이름 (선택적)
   * 뉴스를 작성한 기자의 이름입니다
   */
  reporter?: string;

  /**
   * 📅 발행일 (선택적)
   * 뉴스가 발행된 날짜입니다
   */
  publishedAt?: string;

  /**
   * 👁️ 조회수 (선택적)
   * 뉴스의 조회 수입니다
   */
  viewCount?: number;

  /**
   * 💬 댓글 수 (선택적)
   * 뉴스에 달린 댓글 수입니다
   */
  commentCount?: number;

  /**
   * 🔥 인기 여부 (선택적)
   * 인기 뉴스인지 여부를 나타냅니다
   */
  isPopular?: boolean;

  /**
   * ⭐ 주요 뉴스 여부 (선택적)
   * 주요 뉴스인지 여부를 나타냅니다
   */
  isMain?: boolean;

  /**
   * 🎨 추가적인 CSS 클래스를 적용할 수 있습니다
   * 컴포넌트의 기본 스타일을 유지하면서 추가 스타일링이 가능합니다
   */
  className?: string;

  /**
   * 🖱️ 카드 클릭 이벤트 핸들러 (선택적)
   * 사용자가 카드를 클릭했을 때 호출됩니다
   */
  onClick?: (id: string) => void;

  /**
   * 👤 기자 클릭 이벤트 핸들러 (선택적)
   * 사용자가 기자 이름을 클릭했을 때 호출됩니다
   */
  onReporterClick?: (reporter: string) => void;

  /**
   * 🏷️ 카테고리 클릭 이벤트 핸들러 (선택적)
   * 사용자가 카테고리를 클릭했을 때 호출됩니다
   */
  onCategoryClick?: (category: string) => void;
}

/**
 * 🚀 NewsCard 컴포넌트 정의
 * 
 * 이 컴포넌트는 중앙일보 스타일의 뉴스 카드로, 다음과 같은 기능을 제공합니다:
 * - 뉴스 제목과 요약 표시
 * - 썸네일 이미지 표시
 * - 카테고리 및 메타 정보 표시
 * - 호버 효과 및 클릭 인터랙션
 * - 인기 뉴스 및 주요 뉴스 표시
 */
export const NewsCard: React.FC<NewsCardProps> = ({
  // 🎯 Props 구조 분해 할당
  id,                          // 필수 prop (기본값 없음)
  title,                       // 필수 prop (기본값 없음)
  summary,                     // 선택적 prop (기본값 없음)
  thumbnail,                   // 선택적 prop (기본값 없음)
  category,                    // 선택적 prop (기본값 없음)
  reporter,                    // 선택적 prop (기본값 없음)
  publishedAt,                 // 선택적 prop (기본값 없음)
  viewCount,                   // 선택적 prop (기본값 없음)
  commentCount,                // 선택적 prop (기본값 없음)
  isPopular = false,           // 기본값: false
  isMain = false,              // 기본값: false
  className,                   // 선택적 prop (기본값 없음)
  onClick,                     // 선택적 prop (기본값 없음)
  onReporterClick,             // 선택적 prop (기본값 없음)
  onCategoryClick,             // 선택적 prop (기본값 없음)
}) => {
  /**
   * 🎯 카드 클릭 핸들러
   * 
   * 사용자가 카드를 클릭했을 때 호출됩니다.
   * onClick 함수가 전달되었다면 실행하고, 콘솔에 로그를 남깁니다.
   */
  const handleCardClick = () => {
    // 👆 onClick 함수가 전달되었다면 실행
    if (onClick) {
      onClick(id);
    }
    
    // 📝 개발용 로그 (실제 프로젝트에서는 제거)
    console.log('뉴스 카드 클릭:', id);
  };

  /**
   * 🎯 기자 클릭 핸들러
   * 
   * 사용자가 기자 이름을 클릭했을 때 호출됩니다.
   * 이벤트 전파를 막아서 카드 클릭과 구분합니다.
   */
  const handleReporterClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 전파 방지
    
    if (onReporterClick && reporter) {
      onReporterClick(reporter);
    }
    
    console.log('기자 클릭:', reporter);
  };

  /**
   * 🎯 카테고리 클릭 핸들러
   * 
   * 사용자가 카테고리를 클릭했을 때 호출됩니다.
   * 이벤트 전파를 막아서 카드 클릭과 구분합니다.
   */
  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 전파 방지
    
    if (onCategoryClick && category) {
      onCategoryClick(category);
    }
    
    console.log('카테고리 클릭:', category);
  };

  /**
   * 🎨 날짜 포맷팅 함수
   * 
   * publishedAt을 읽기 쉬운 형태로 변환합니다.
   * 예: "2024-01-15T10:30:00Z" → "1시간 전"
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return '방금 전';
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}일 전`;
    }
  };

  /**
   * 🎨 조회수 포맷팅 함수
   * 
   * viewCount를 읽기 쉬운 형태로 변환합니다.
   * 예: 1234 → "1.2K"
   */
  const formatViewCount = (count: number) => {
    if (count < 1000) {
      return count.toString();
    } else if (count < 10000) {
      return `${(count / 1000).toFixed(1)}K`;
    } else {
      return `${(count / 10000).toFixed(1)}만`;
    }
  };

  /**
   * 🎨 JSX 반환
   * 
   * 중앙일보 스타일의 뉴스 카드를 렌더링합니다.
   * 조건부 렌더링을 통해 다양한 상태를 표시합니다.
   */
  return (
    <article 
      className={cx(
        'news-card',
        {
          'news-card--popular': isPopular,
          'news-card--main': isMain,
          'news-card--has-image': thumbnail,
        },
        className
      )}
      onClick={handleCardClick}
    >
      {/* 🏷️ 카테고리 배지 (있는 경우에만 표시) */}
      {category && (
        <div className={cx('news-card__category')}>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCategoryClick}
            className={cx('news-card__category-button')}
          >
            {category}
          </Button>
        </div>
      )}

      {/* 🔥 인기 뉴스 배지 (인기 뉴스인 경우에만 표시) */}
      {isPopular && (
        <div className={cx('news-card__popular-badge')}>
          🔥 인기
        </div>
      )}

      {/* ⭐ 주요 뉴스 배지 (주요 뉴스인 경우에만 표시) */}
      {isMain && (
        <div className={cx('news-card__main-badge')}>
          ⭐ 주요
        </div>
      )}

      {/* 🖼️ 썸네일 이미지 (있는 경우에만 표시) */}
      {thumbnail && (
        <div className={cx('news-card__thumbnail')}>
          <img 
            src={thumbnail} 
            alt={title}
            className={cx('news-card__image')}
          />
        </div>
      )}

      {/* 📰 뉴스 내용 */}
      <div className={cx('news-card__content')}>
        {/* 📝 뉴스 제목 */}
        <h3 className={cx('news-card__title')}>
          {title}
        </h3>

        {/* 📄 뉴스 요약 (있는 경우에만 표시) */}
        {summary && (
          <p className={cx('news-card__summary')}>
            {summary}
          </p>
        )}

        {/* 📊 뉴스 메타 정보 */}
        <div className={cx('news-card__meta')}>
          {/* 👤 기자 정보 (있는 경우에만 표시) */}
          {reporter && (
            <div className={cx('news-card__reporter')}>
              <Avatar
                size="sm"
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(reporter)}&background=007bff&color=ffffff&size=24`}
                alt={reporter}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReporterClick}
                className={cx('news-card__reporter-button')}
              >
                {reporter}
              </Button>
            </div>
          )}

          {/* 📅 발행일 (있는 경우에만 표시) */}
          {publishedAt && (
            <span className={cx('news-card__date')}>
              {formatDate(publishedAt)}
            </span>
          )}

          {/* 👁️ 조회수 (있는 경우에만 표시) */}
          {viewCount !== undefined && (
            <span className={cx('news-card__views')}>
              👁️ {formatViewCount(viewCount)}
            </span>
          )}

          {/* 💬 댓글 수 (있는 경우에만 표시) */}
          {commentCount !== undefined && (
            <span className={cx('news-card__comments')}>
              💬 {commentCount}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

/**
 * 📝 사용 예시:
 * 
 * // 기본 뉴스 카드
 * <NewsCard
 *   id="1"
 *   title="중앙일보, 새로운 뉴스 플랫폼 출시"
 *   summary="독자들에게 더 나은 뉴스 경험을 제공하기 위한 새로운 플랫폼을 출시했습니다."
 *   thumbnail="https://example.com/image.jpg"
 *   category="기술"
 *   reporter="김기자"
 *   publishedAt="2024-01-15T10:30:00Z"
 *   viewCount={1234}
 *   commentCount={56}
 *   onClick={handleNewsClick}
 * />
 * 
 * // 인기 뉴스 카드
 * <NewsCard
 *   id="2"
 *   title="인기 뉴스 제목"
 *   isPopular={true}
 *   onClick={handleNewsClick}
 * />
 * 
 * // 주요 뉴스 카드
 * <NewsCard
 *   id="3"
 *   title="주요 뉴스 제목"
 *   isMain={true}
 *   onClick={handleNewsClick}
 * />
 * 
 * 🎯 이 컴포넌트의 장점:
 * 1. 유연성: 다양한 뉴스 데이터 구조 지원
 * 2. 접근성: 적절한 HTML 구조와 ARIA 속성
 * 3. 반응형: 다양한 화면 크기에 대응
 * 4. 인터랙션: 호버 효과 및 클릭 이벤트
 * 5. 확장성: 새로운 기능 추가가 용이
 * 
 * 🏗️ 컴포넌트 계층 구조:
 * NewsCard (Molecules)
 * ├── Avatar (Atoms)
 * └── Button (Atoms)
 */ 