import React, { useState } from 'react';
import './App.css';

// 🧩 Pages 컴포넌트를 가져옵니다
import { CommentPage } from './pages/CommentPage';
import { NewsPage } from './pages/NewsPage';

// 🧬 Organisms에서 타입을 가져옵니다
import type { Comment } from './components/Organisms/CommentItem';
import type { NewsData } from './pages/NewsPage';

/**
 * 🎓 App 컴포넌트 학습 가이드
 * 
 * 이 파일은 애플리케이션의 최상위 컴포넌트로, 실제 사용 예시를 보여줍니다.
 * NewsPage를 사용하여 중앙일보 스타일의 뉴스 사이트를 구현합니다.
 */

// 📊 샘플 뉴스 데이터
const sampleNews: NewsData[] = [
  {
    id: '1',
    title: '중앙일보, 새로운 뉴스 플랫폼 출시',
    summary: '독자들에게 더 나은 뉴스 경험을 제공하기 위한 새로운 플랫폼을 출시했습니다. 이번 플랫폼은 AI 기술을 활용한 개인화된 뉴스 추천 시스템을 도입하여 사용자 맞춤형 콘텐츠를 제공할 예정입니다.',
    thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=200&fit=crop',
    category: '기술',
    reporter: '김기자',
    publishedAt: '2024-01-15T10:30:00Z',
    viewCount: 1234,
    commentCount: 56,
    isMain: true,
  },
  {
    id: '2',
    title: '정부, 새로운 경제 정책 발표 예정',
    summary: '정부가 내일 새로운 경제 정책을 발표할 예정입니다. 이번 정책은 소득 불평등 해소와 경제 활성화를 동시에 추구하는 혁신적인 방안으로 평가받고 있습니다.',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop',
    category: '경제',
    reporter: '이기자',
    publishedAt: '2024-01-15T09:15:00Z',
    viewCount: 5678,
    commentCount: 234,
    isPopular: true,
  },
  {
    id: '3',
    title: '대통령, 국정감사에서 주요 정책 방향 제시',
    summary: '대통령이 오늘 국정감사에서 향후 3년간의 주요 정책 방향을 제시했습니다. 교육 개혁, 의료 시스템 개선, 환경 보호 등 다양한 분야에서의 정책 계획을 발표했습니다.',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=200&fit=crop',
    category: '정치',
    reporter: '박기자',
    publishedAt: '2024-01-15T08:00:00Z',
    viewCount: 8901,
    commentCount: 456,
    isMain: true,
  },
  {
    id: '4',
    title: '코로나19 신규 확진자 수 감소세 지속',
    summary: '전국 코로나19 신규 확진자 수가 지속적으로 감소하고 있습니다. 전문가들은 방역 정책의 효과와 백신 접종률 향상이 주요 원인으로 분석하고 있습니다.',
    category: '사회',
    reporter: '최기자',
    publishedAt: '2024-01-15T07:45:00Z',
    viewCount: 3456,
    commentCount: 123,
  },
  {
    id: '5',
    title: '스마트폰 시장, 새로운 기술 혁신 예고',
    summary: '주요 스마트폰 제조사들이 올해 하반기 새로운 기술 혁신을 예고했습니다. 접이식 화면, AI 카메라, 초고속 충전 등 다양한 혁신 기술이 적용될 예정입니다.',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=150&fit=crop',
    category: '기술',
    reporter: '정기자',
    publishedAt: '2024-01-15T06:30:00Z',
    viewCount: 2345,
    commentCount: 89,
  },
  {
    id: '6',
    title: '문화재청, 새로운 문화재 발굴 성과 발표',
    summary: '문화재청이 최근 발굴한 새로운 문화재의 성과를 발표했습니다. 이번 발굴로 고대 문화에 대한 새로운 사실들이 밝혀졌습니다.',
    thumbnail: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=150&fit=crop',
    category: '문화',
    reporter: '한기자',
    publishedAt: '2024-01-15T05:15:00Z',
    viewCount: 1234,
    commentCount: 45,
  },
  {
    id: '7',
    title: '올림픽 선수단, 새로운 기록 달성',
    summary: '국가 대표 선수단이 최근 대회에서 새로운 기록을 달성했습니다. 이번 성과는 향후 올림픽 준비에 큰 도움이 될 것으로 기대됩니다.',
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=150&fit=crop',
    category: '스포츠',
    reporter: '송기자',
    publishedAt: '2024-01-15T04:00:00Z',
    viewCount: 3456,
    commentCount: 123,
  },
  {
    id: '8',
    title: '국제 정상회담, 새로운 협력 방안 논의',
    summary: '주요 국가 정상들이 모여 새로운 국제 협력 방안을 논의했습니다. 이번 회담은 글로벌 문제 해결을 위한 중요한 진전을 이루었습니다.',
    thumbnail: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=300&h=150&fit=crop',
    category: '국제',
    reporter: '임기자',
    publishedAt: '2024-01-15T03:30:00Z',
    viewCount: 2345,
    commentCount: 67,
  },
];

// 📊 샘플 댓글 데이터 (실제 이미지 사용)
const sampleComments: Comment[] = [
  {
    id: '1',
    content: '정말 유용한 정보네요! 감사합니다.',
    author: {
      name: '김철수',
      avatar: 'https://ui-avatars.com/api/?name=김철수&background=007bff&color=ffffff&size=40',
      isVerified: true,
    },
    createdAt: '2024-01-15T10:30:00Z',
    likes: 12,
    replies: 3,
    isLiked: false,
    isAuthor: false,
  },
  {
    id: '2',
    content: '이런 방식으로 구현하는 것이 좋겠네요. 실제로 적용해보겠습니다.',
    author: {
      name: '이영희',
      avatar: 'https://ui-avatars.com/api/?name=이영희&background=28a745&color=ffffff&size=40',
      isVerified: false,
    },
    createdAt: '2024-01-15T11:15:00Z',
    likes: 8,
    replies: 1,
    isLiked: true,
    isAuthor: false,
  },
  {
    id: '3',
    content: '혹시 더 자세한 설명이 가능할까요? 특히 성능 최적화 부분이 궁금합니다.',
    author: {
      name: '박민수',
      avatar: 'https://ui-avatars.com/api/?name=박민수&background=dc3545&color=ffffff&size=40',
      isVerified: true,
    },
    createdAt: '2024-01-15T12:00:00Z',
    likes: 15,
    replies: 5,
    isLiked: false,
    isAuthor: false,
  },
];

function App() {
  // 🎯 상태 관리
  const [news] = useState<NewsData[]>(sampleNews);
  const [comments, setComments] = useState<Comment[]>(sampleComments);
  const [activeCategory, setActiveCategory] = useState<'전체' | '정치' | '경제' | '사회' | '문화' | '스포츠' | '기술' | '국제' | '연예' | '건강' | '교육' | '환경'>('전체');
  const [currentPage, setCurrentPage] = useState<'news' | 'comments'>('news');

  /**
   * 🎯 뉴스 관련 핸들러들
   */
  const handleNewsClick = (newsId: string) => {
    console.log('뉴스 클릭:', newsId);
    alert(`뉴스 ID ${newsId}의 상세 페이지로 이동합니다.`);
  };

  const handleReporterClick = (reporter: string) => {
    console.log('기자 클릭:', reporter);
    alert(`${reporter} 기자의 프로필 페이지로 이동합니다.`);
  };

  const handleCategoryClick = (category: string) => {
    console.log('카테고리 클릭:', category);
    alert(`${category} 카테고리 페이지로 이동합니다.`);
  };

  const handleCategoryChange = (category: typeof activeCategory) => {
    setActiveCategory(category);
    console.log('카테고리 변경:', category);
  };

  /**
   * 🎯 댓글 관련 핸들러들 (기존 유지)
   */
  const handleSubmitComment = (content: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      content,
      author: {
        name: '현재 사용자',
        avatar: 'https://ui-avatars.com/api/?name=현재사용자&background=6c757d&color=ffffff&size=40',
        isVerified: true,
      },
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: 0,
      isLiked: false,
      isAuthor: true,
    };

    setComments(prev => [newComment, ...prev]);
    console.log('새 댓글 추가:', newComment);
  };

  const handleLikeClick = (commentId: string) => {
    setComments(prev =>
      prev.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              isLiked: !comment.isLiked,
            }
          : comment
      )
    );
    console.log('좋아요 토글:', commentId);
  };

  const handleDeleteClick = (commentId: string) => {
    if (window.confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      setComments(prev => prev.filter(comment => comment.id !== commentId));
      console.log('댓글 삭제:', commentId);
    }
  };

  const handleAuthorClick = (authorName: string) => {
    console.log('작성자 클릭:', authorName);
    alert(`${authorName}의 프로필 페이지로 이동합니다.`);
  };

  /**
   * 🎯 페이지 전환 핸들러
   */
  const handlePageChange = (page: typeof currentPage) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      {/* 🎓 학습용 헤더 */}
      <header className="app-header">
        <h1>🗞️ 중앙일보 클로닝 프로젝트</h1>
        <p>Atomic Design 패턴으로 구현된 뉴스 사이트</p>
        
        {/* 🎯 페이지 전환 버튼 */}
        <div className="app-navigation">
          <button 
            className={`nav-button ${currentPage === 'news' ? 'active' : ''}`}
            onClick={() => handlePageChange('news')}
          >
            📰 뉴스 페이지
          </button>
          <button 
            className={`nav-button ${currentPage === 'comments' ? 'active' : ''}`}
            onClick={() => handlePageChange('comments')}
          >
            💬 댓글 시스템
          </button>
        </div>
      </header>

      {/* 🧩 페이지 컴포넌트 렌더링 */}
      {currentPage === 'news' ? (
        <NewsPage
          news={news}
          activeCategory={activeCategory}
          title="중앙일보"
          subtitle="정확하고 신뢰할 수 있는 뉴스를 제공합니다"
          onCategoryChange={handleCategoryChange}
          onNewsClick={handleNewsClick}
          onReporterClick={handleReporterClick}
          onCategoryClick={handleCategoryClick}
        />
      ) : (
        <CommentPage
          comments={comments}
          title="댓글 시스템 데모"
          subtitle="Atomic Design 패턴으로 구현된 댓글 시스템입니다. 각 컴포넌트의 기능을 테스트해보세요!"
          canComment={true}
          maxComments={100}
          onSubmitComment={handleSubmitComment}
          onLikeClick={handleLikeClick}
          onDeleteClick={handleDeleteClick}
          onAuthorClick={handleAuthorClick}
        />
      )}

      {/* 🎓 학습용 푸터 */}
      <footer className="app-footer">
        <p>
          💡 <strong>테스트 방법:</strong> 뉴스 카드 클릭, 카테고리 변경, 댓글 작성 등을 시도해보세요!
        </p>
        <p>
          🔍 <strong>개발자 도구:</strong> 콘솔을 열어서 이벤트 로그를 확인해보세요!
        </p>
      </footer>
    </div>
  );
}

export default App;
