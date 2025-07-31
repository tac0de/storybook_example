import React from 'react';
import classNames from 'classnames/bind';
import { PageLayout } from '../../Templates/PageLayout';
import { CommentList } from '../../Organisms/CommentList';
import { CommentForm } from '../../Molecules/CommentForm';
import type { Comment } from '../../Organisms/CommentList';
import styles from './CommentPage.module.scss';

const cx = classNames.bind(styles);

export interface CommentPageProps {
  comments: Comment[];
  sortBy?: 'newest' | 'oldest' | 'mostLiked' | 'mostReplied';
  loading?: boolean;
  title?: string;
  subtitle?: string;
  canComment?: boolean;
  maxComments?: number;
  className?: string;
  onSortChange?: (
    sortBy: 'newest' | 'oldest' | 'mostLiked' | 'mostReplied'
  ) => void;
  onSubmitComment?: (content: string) => void;
  onSubmitReply?: (parentId: string, content: string) => void;
  onLikeClick?: (commentId: string) => void;
  onReplyClick?: (commentId: string) => void;
  onReportClick?: (commentId: string) => void;
  onEditClick?: (commentId: string) => void;
  onDeleteClick?: (commentId: string) => void;
  onAuthorClick?: (authorName: string) => void;
}

/**
 * CommentPage 페이지 컴포넌트입니다.
 * CommentPageTemplate과 데이터를 바인딩하여 댓글 페이지의 전체 구조를 관리합니다.
 */
export const CommentPage: React.FC<CommentPageProps> = ({
  comments,
  sortBy = 'newest',
  loading = false,
  title = '댓글',
  subtitle = '이 글에 대한 의견을 남겨주세요',
  canComment = true,
  maxComments = 100,
  className,
  onSortChange,
  onSubmitComment,
  onSubmitReply,
  onLikeClick,
  onReplyClick,
  onReportClick,
  onEditClick,
  onDeleteClick,
  onAuthorClick,
}) => {
  const handleSubmitComment = (content: string) => {
    if (onSubmitComment) {
      onSubmitComment(content);
    }
  };

  const handleSortChange = (
    newSortBy: 'newest' | 'oldest' | 'mostLiked' | 'mostReplied'
  ) => {
    if (onSortChange) {
      onSortChange(newSortBy);
    }
  };

  const renderHeader = () => (
    <div className={cx('page-header-content')}>
      <div className={cx('header-title-section')}>
        <h1 className={cx('page-title')}>{title}</h1>
        {subtitle && <p className={cx('page-subtitle')}>{subtitle}</p>}
      </div>
      <div className={cx('header-stats')}>
        <span className={cx('comment-count')}>댓글 {comments.length}개</span>
        {maxComments && (
          <span className={cx('max-comments')}>최대 {maxComments}개</span>
        )}
      </div>
    </div>
  );

  const renderContent = () => (
    <div className={cx('page-content-wrapper')}>
      {canComment && (
        <div className={cx('comment-form-section')}>
          <CommentForm
            onSubmit={handleSubmitComment}
            placeholder='댓글을 입력하세요...'
            maxLength={500}
            showCancelButton={false}
          />
        </div>
      )}

      <div className={cx('comment-list-section')}>
        <CommentList
          comments={comments}
          sortBy={sortBy}
          loading={loading}
          emptyMessage='아직 댓글이 없습니다. 첫 번째 댓글을 남겨보세요!'
          onSortChange={handleSortChange}
          onLikeClick={onLikeClick}
          onReplyClick={onReplyClick}
          onReportClick={onReportClick}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          onAuthorClick={onAuthorClick}
          onSubmitReply={onSubmitReply}
        />
      </div>
    </div>
  );

  const renderFooter = () => (
    <div className={cx('page-footer-content')}>
      <div className={cx('footer-info')}>
        <p className={cx('footer-text')}>
          댓글은 커뮤니티 가이드라인을 준수해야 합니다.
        </p>
        <p className={cx('footer-text')}>부적절한 댓글은 신고할 수 있습니다.</p>
      </div>
    </div>
  );

  return (
    <PageLayout
      header={renderHeader()}
      footer={renderFooter()}
      className={cx('comment-page', className)}
      maxWidth='xl'
      padding='lg'
    >
      {renderContent()}
    </PageLayout>
  );
};
