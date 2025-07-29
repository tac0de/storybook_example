import { CommentTemplate } from '../../Templates/CommentTemplate';
import { CommentList } from '../../Organisms/CommentList';
import { CommentInput } from '../../Molecules/CommentInput';
import type React from 'react';

export interface CommentPageProps {
  /** 댓글 수 */
  readonly commentCount: number;
  /** 댓글 목록 */
  readonly comments: Array<{
    readonly id: string;
    readonly author: string;
    readonly authorAvatar?: string;
    readonly timestamp: string;
    readonly content: string;
    readonly likes: number;
    readonly dislikes: number;
    readonly replies?: number;
    readonly editable?: boolean;
    readonly deletable?: boolean;
  }>;
  /** 로그인 상태 */
  readonly isLoggedIn: boolean;
  /** 정렬 순서 */
  readonly sortOrder: 'latest' | 'popular';
  /** 새로고침 핸들러 */
  readonly onRefresh?: () => void;
  /** 닫기 핸들러 */
  readonly onClose?: () => void;
  /** 구독 핸들러 */
  readonly onSubscribe?: () => void;
  /** 로그인 핸들러 */
  readonly onLogin?: () => void;
  /** 내 댓글 핸들러 */
  readonly onMyComments?: () => void;
  /** 정렬 변경 핸들러 */
  readonly onSortChange?: (order: 'latest' | 'popular') => void;
  /** 답글 작성 핸들러 */
  readonly onReplyClick?: (commentId: string) => void;
  /** 좋아요 핸들러 */
  readonly onLikeClick?: (commentId: string) => void;
  /** 싫어요 핸들러 */
  readonly onDislikeClick?: (commentId: string) => void;
  /** 편집 핸들러 */
  readonly onEditClick?: (commentId: string) => void;
  /** 삭제 핸들러 */
  readonly onDeleteClick?: (commentId: string) => void;
  /** 댓글 입력 관련 */
  readonly commentInput?: {
    readonly value: string;
    readonly onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    readonly onSubmit: () => void;
    readonly placeholder?: string;
    readonly disabled?: boolean;
    readonly loading?: boolean;
    readonly userAvatar?: string;
    readonly userName?: string;
  };
  /** 페이지네이션 관련 */
  readonly pagination?: {
    readonly currentPage: number;
    readonly totalPages: number;
    readonly onPageChange: (page: number) => void;
    readonly hasNextPage: boolean;
    readonly onLoadMore?: () => void;
  };
  /** 추가 클래스 */
  readonly className?: string;
}

export const CommentPage: React.FC<CommentPageProps> = ({
  commentCount,
  comments,
  isLoggedIn,
  sortOrder,
  onRefresh,
  onClose,
  onSubscribe,
  onLogin,
  onMyComments,
  onSortChange,
  onReplyClick,
  onLikeClick,
  onDislikeClick,
  onEditClick,
  onDeleteClick,
  commentInput,
  pagination,
  className = '',
}) => {
  // 헤더 렌더링
  const renderHeader = () => (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-2'>
        <h2 className='text-xl font-bold text-gray-900'>
          댓글 {commentCount}개
        </h2>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className='p-1 rounded-full hover:bg-gray-100 transition-colors'
            aria-label='새로고침'
          >
            <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
              <path d='M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z' />
            </svg>
          </button>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className='p-2 rounded-full hover:bg-gray-200 transition-colors'
          aria-label='닫기'
        >
          <svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
            <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
          </svg>
        </button>
      )}
    </div>
  );

  // 구독 프롬프트 렌더링
  const renderSubscriptionPrompt = () => {
    if (isLoggedIn) return null;
    return (
      <div className='p-4 border border-gray-200 rounded-lg bg-white'>
        <p className='text-sm text-gray-700 mb-3'>
          더중앙플러스 구독하고 자유롭게 의견을 남겨주세요.
        </p>
        <div className='flex items-center gap-4'>
          <button
            onClick={onSubscribe}
            className='flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors'
          >
            <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
              <path d='M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z' />
            </svg>
            지금 바로 시작하기
          </button>
          <button
            onClick={onLogin}
            className='text-sm text-gray-600 hover:text-gray-800 underline'
          >
            이미 더중앙플러스 구독자라면? 로그인
          </button>
        </div>
      </div>
    );
  };

  // 네비게이션 렌더링
  const renderNavigation = () => (
    <div className='flex items-center justify-between'>
      <button
        onClick={onMyComments}
        className='text-sm text-gray-600 hover:text-gray-800 underline'
      >
        내 댓글
      </button>
      <div className='flex items-center gap-2'>
        <span className='text-sm text-gray-600'>PICK ?</span>
        <select
          value={sortOrder}
          onChange={e => onSortChange?.(e.target.value as 'latest' | 'popular')}
          className='text-sm border border-gray-300 rounded px-2 py-1 bg-white'
        >
          <option value='latest'>최신순</option>
          <option value='popular'>인기순</option>
        </select>
      </div>
    </div>
  );

  // 댓글 목록 렌더링
  const renderCommentList = () => (
    <div className='space-y-4'>
      <CommentList
        comments={comments}
        onReplyClick={onReplyClick}
        onLikeClick={onLikeClick}
        onDislikeClick={onDislikeClick}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
      />
    </div>
  );

  // 댓글 입력 렌더링
  const renderCommentInput = () => {
    if (!commentInput) return null;
    return (
      <div className='mb-6'>
        <CommentInput
          value={commentInput.value}
          onChange={commentInput.onChange}
          onSubmit={commentInput.onSubmit}
          placeholder={commentInput.placeholder}
          disabled={commentInput.disabled}
          loading={commentInput.loading}
          userAvatar={commentInput.userAvatar}
          userName={commentInput.userName}
        />
      </div>
    );
  };

  // 페이지네이션 렌더링
  const renderPagination = () => {
    if (!pagination) return null;

    return (
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <span className='text-sm text-gray-600'>
            페이지 {pagination.currentPage} / {pagination.totalPages}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          {pagination.currentPage > 1 && (
            <button
              onClick={() =>
                pagination.onPageChange(pagination.currentPage - 1)
              }
              className='px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50'
            >
              이전
            </button>
          )}
          {pagination.hasNextPage && (
            <button
              onClick={() =>
                pagination.onPageChange(pagination.currentPage + 1)
              }
              className='px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50'
            >
              다음
            </button>
          )}
          {pagination.onLoadMore && pagination.hasNextPage && (
            <button
              onClick={pagination.onLoadMore}
              className='px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700'
            >
              더 보기
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen bg-gray-100 py-10 ${className}`}>
      <CommentTemplate
        header={renderHeader()}
        topSection={renderSubscriptionPrompt()}
        navigation={renderNavigation()}
        bottomSection={renderPagination()}
      >
        {renderCommentInput()}
        {renderCommentList()}
      </CommentTemplate>
    </div>
  );
};
