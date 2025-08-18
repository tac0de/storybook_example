/**
 * 🎓 CommentList 컴포넌트 학습 가이드
 * 
 * 이 파일은 React + TypeScript로 만든 재사용 가능한 CommentList 컴포넌트입니다.
 * 댓글 목록을 표시하는 완전한 컴포넌트로, 정렬 기능, 로딩 상태, 빈 상태 처리를 포함합니다.
 * Organisms 레벨의 CommentItem과 Molecules 레벨의 SortSelector를 조합하여 만든 컴포넌트입니다.
 * 초보자를 위해 각 부분에 상세한 주석을 추가했습니다.
 */

// React 라이브러리에서 필요한 기능들을 가져옵니다
import React from 'react';

// classnames 라이브러리를 가져와서 CSS 클래스를 동적으로 조합할 수 있게 합니다
// bind 함수를 사용하면 CSS Modules와 함께 사용할 때 더 편리합니다
import classNames from 'classnames/bind';

// 🧩 하위 레벨 컴포넌트들을 가져옵니다
// CommentItem과 Comment 타입을 가져옵니다
import { CommentItem, type Comment } from '../CommentItem';
// SortSelector와 SortOption 타입을 가져옵니다
import { SortSelector, type SortOption } from '../../Molecules/SortSelector';

// 이 컴포넌트의 스타일을 가져옵니다
// CSS Modules를 사용하므로 클래스명이 자동으로 고유화됩니다
import styles from './CommentList.module.scss';

// classnames의 bind 함수를 사용하여 스타일 객체와 바인딩합니다
// 이렇게 하면 cx('comment-list') 같은 방식으로 클래스를 조합할 수 있습니다
const cx = classNames.bind(styles);

/**
 * 🎯 CommentList 컴포넌트의 Props 인터페이스 정의
 * 
 * TypeScript를 사용하여 컴포넌트가 받을 수 있는 속성들을 명확하게 정의합니다.
 * 이렇게 하면 타입 안전성과 자동완성을 보장할 수 있습니다.
 */
export interface CommentListProps {
  /**
   * 📋 표시할 댓글들의 배열입니다
   * Comment 인터페이스를 따르는 댓글 객체들의 배열입니다
   */
  comments: Comment[];

  /**
   * 📊 댓글 정렬 기준입니다
   * - 'newest': 최신순 (기본값)
   * - 'oldest': 오래된순
   * - 'mostLiked': 좋아요 많은 순
   * - 'mostReplied': 답글 많은 순
   */
  sortBy?: 'newest' | 'oldest' | 'mostLiked' | 'mostReplied';

  /**
   * 🔄 로딩 상태입니다
   * true일 때 로딩 스피너와 "로딩 중..." 메시지가 표시됩니다
   * 기본값: false
   */
  loading?: boolean;

  /**
   * 🔄 정렬 기준이 변경될 때 호출되는 콜백 함수입니다
   * 사용자가 다른 정렬 옵션을 선택했을 때 부모 컴포넌트에 알리는 데 사용됩니다
   * @param sortBy - 새로 선택된 정렬 기준
   */
  onSortChange?: (
    sortBy: 'newest' | 'oldest' | 'mostLiked' | 'mostReplied'
  ) => void;

  /**
   * ❤️ 좋아요 버튼을 클릭했을 때 호출되는 콜백 함수입니다
   * @param commentId - 좋아요를 누른 댓글의 ID
   */
  onLikeClick?: (commentId: string) => void;

  /**
   * 💬 답글 버튼을 클릭했을 때 호출되는 콜백 함수입니다
   * @param commentId - 답글을 작성할 댓글의 ID
   */
  onReplyClick?: (commentId: string) => void;

  /**
   * ⚠️ 신고 버튼을 클릭했을 때 호출되는 콜백 함수입니다
   * @param commentId - 신고할 댓글의 ID
   */
  onReportClick?: (commentId: string) => void;

  /**
   * ✏️ 수정 버튼을 클릭했을 때 호출되는 콜백 함수입니다
   * @param commentId - 수정할 댓글의 ID
   */
  onEditClick?: (commentId: string) => void;

  /**
   * 🗑️ 삭제 버튼을 클릭했을 때 호출되는 콜백 함수입니다
   * @param commentId - 삭제할 댓글의 ID
   */
  onDeleteClick?: (commentId: string) => void;

  /**
   * 👤 작성자 이름을 클릭했을 때 호출되는 콜백 함수입니다
   * @param authorName - 클릭된 작성자의 이름
   */
  onAuthorClick?: (authorName: string) => void;

  /**
   * 📤 답글을 제출했을 때 호출되는 콜백 함수입니다
   * @param parentId - 답글을 작성할 부모 댓글의 ID
   * @param content - 작성된 답글 내용
   */
  onSubmitReply?: (parentId: string, content: string) => void;

  /**
   * 🎨 추가적인 CSS 클래스를 적용할 수 있습니다
   * 컴포넌트의 기본 스타일을 유지하면서 추가 스타일링이 가능합니다
   */
  className?: string;
}

/**
 * 📋 정렬 옵션들을 정의하는 상수
 * 
 * SortSelector 컴포넌트에서 사용할 정렬 옵션들을 `미리 정의합니다.
 * 각 옵션은 value(실제 값)와 label(표시될 텍스트)을 가집니다.
 */
const sortOptions: SortOption[] = [
  { value: 'newest', label: '최신순' },
  { value: 'oldest', label: '오래된순' },
  { value: 'mostLiked', label: '좋아요순' },
  { value: 'mostReplied', label: '답글순' },
];

/**
 * 🚀 CommentList 컴포넌트 정의
 * 
 * React.FC는 "Function Component"의 줄임말로, 함수형 컴포넌트임을 명시합니다.
 * <CommentListProps>는 이 컴포넌트가 CommentListProps 타입의 props를 받는다는 의미입니다.
 * 
 * 이 컴포넌트는 다양한 상태(로딩, 빈 목록, 정상)에 따라 다른 UI를 렌더링합니다.
 */
export const CommentList: React.FC<CommentListProps> = ({
  // 🎯 Props 구조 분해 할당 (Destructuring Assignment)
  comments,                   // 댓글 배열 (필수)
  sortBy = 'newest',          // 정렬 기준 (기본값: 'newest')
  loading = false,            // 로딩 상태 (기본값: false)
  onSortChange,               // 정렬 변경 핸들러 (선택적)
  onLikeClick,                // 좋아요 핸들러 (선택적)
  onReplyClick,               // 답글 핸들러 (선택적)
  onReportClick,              // 신고 핸들러 (선택적)
  onEditClick,                // 수정 핸들러 (선택적)
  onDeleteClick,              // 삭제 핸들러 (선택적)
  onAuthorClick,              // 작성자 클릭 핸들러 (선택적)
  onSubmitReply,              // 답글 제출 핸들러 (선택적)
  className,                  // 추가 CSS 클래스 (선택적)
}) => {
  /**
   * 🔄 로딩 상태 렌더링
   * 
   * loading이 true일 때 로딩 스피너와 메시지를 표시합니다.
   * 이 상태에서는 댓글 목록 대신 로딩 UI가 표시됩니다.
   */
  if (loading) {
    return (
      <div className={cx('loading', className)}>
        <div className={cx('loading-spinner')}></div>
        로딩 중...
      </div>
    );
  }

  /**
   * 📭 빈 목록 상태 렌더링
   * 
   * comments 배열이 비어있을 때 빈 상태 메시지를 표시합니다.
   * 이 상태에서는 댓글이 없다는 안내 메시지가 표시됩니다.
   */
  if (comments.length === 0) {
    return (
      <div className={cx('empty', className)}>
        <div className={cx('empty-icon')}>💬</div>
        댓글이 없습니다.
      </div>
    );
  }

  /**
   * 🎨 정상 상태 렌더링
   * 
   * 댓글이 있고 로딩 중이 아닐 때 정상적인 댓글 목록을 표시합니다.
   * 정렬 선택기와 댓글 아이템들을 포함합니다.
   */
  return (
    <div className={cx('comment-list', className)}>
      {/* 📊 정렬 선택기 (onSortChange가 있을 때만 표시) */}
      {onSortChange && (
        <SortSelector
          value={sortBy}
          options={sortOptions}
          onChange={onSortChange}
        />
      )}

      {/* 📋 댓글 컨테이너 */}
      <div className={cx('comments-container')}>
        {/* 📝 댓글들을 동적으로 렌더링 */}
        {comments.map(comment => (
          <CommentItem
            key={comment.id}              // React의 key prop (고유 식별자)
            comment={comment}             // 댓글 데이터
            onLikeClick={onLikeClick}     // 좋아요 핸들러
            onReplyClick={onReplyClick}   // 답글 핸들러
            onReportClick={onReportClick} // 신고 핸들러
            onEditClick={onEditClick}     // 수정 핸들러
            onDeleteClick={onDeleteClick} // 삭제 핸들러
            onAuthorClick={onAuthorClick} // 작성자 클릭 핸들러
            onSubmitReply={onSubmitReply} // 답글 제출 핸들러
          />
        ))}
      </div>
    </div>
  );
};

/**
 * 📝 사용 예시:
 * 
 * // 기본 사용법
 * const comments = [
 *   {
 *     id: '1',
 *     content: '정말 좋은 글이네요!',
 *     author: {
 *       name: '김철수',
 *       avatar: '/images/avatar1.jpg',
 *       isVerified: true
 *     },
 *     createdAt: '2024-01-15T10:30:00Z',
 *     likes: 5,
 *     replies: 2,
 *     isLiked: false,
 *     isAuthor: false
 *   },
 *   // ... 더 많은 댓글들
 * ];
 * 
 * <CommentList 
 *   comments={comments}
 *   sortBy="newest"
 *   onSortChange={(sortBy) => handleSortChange(sortBy)}
 *   onLikeClick={(id) => handleLike(id)}
 *   onReplyClick={(id) => handleReply(id)}
 *   onAuthorClick={(name) => navigateToProfile(name)}
 * />
 * 
 * // 로딩 상태
 * <CommentList 
 *   comments={[]}
 *   loading={true}
 * />
 * 
 * // 빈 상태
 * <CommentList 
 *   comments={[]}
 *   loading={false}
 * />
 * 
 * 🎯 이 컴포넌트의 특징:
 * 1. 상태 관리: 로딩, 빈 목록, 정상 상태를 모두 처리
 * 2. 정렬 기능: 다양한 기준으로 댓글을 정렬할 수 있음
 * 3. 이벤트 위임: 모든 댓글 관련 이벤트를 부모 컴포넌트에 전달
 * 4. 재사용성: 다양한 댓글 시스템에서 사용 가능
 * 5. 접근성: 적절한 HTML 구조와 상태 표시
 * 
 * 🏗️ 컴포넌트 계층 구조:
 * CommentList (Organisms)
 * ├── SortSelector (Molecules)
 * │   └── HTML select element
 * └── CommentItem (Organisms) × N
 *     ├── UserHeader (Molecules)
 *     ├── ActionButtons (Molecules)
 *     ├── TextInputForm (Molecules)
 *     └── Button (Atoms)
 * 
 * 💡 팁:
 * - loading 상태일 때는 다른 모든 기능이 비활성화됩니다
 * - 빈 목록일 때는 사용자 친화적인 메시지를 표시합니다
 * - 정렬 기능은 onSortChange가 전달되었을 때만 표시됩니다
 * - 모든 이벤트 핸들러는 옵셔널이므로 필요한 기능만 구현하면 됩니다
 * - comments 배열의 각 댓글은 고유한 id를 가져야 합니다
 */ 