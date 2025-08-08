/**
 * 🎓 CommentItem 컴포넌트 학습 가이드
 * 
 * 이 파일은 React + TypeScript로 만든 재사용 가능한 CommentItem 컴포넌트입니다.
 * 댓글을 표시하는 완전한 컴포넌트로, 사용자 정보, 댓글 내용, 액션 버튼, 답글 기능을 포함합니다.
 * Atoms와 Molecules 레벨의 컴포넌트들을 조합하여 만든 Organisms 레벨 컴포넌트입니다.
 * 초보자를 위해 각 부분에 상세한 주석을 추가했습니다.
 */

// React 라이브러리에서 필요한 기능들을 가져옵니다
// useState: 컴포넌트 내부 상태를 관리할 때 사용하는 React Hook
import React, { useState, useCallback } from 'react';

// classnames 라이브러리를 가져와서 CSS 클래스를 동적으로 조합할 수 있게 합니다
// bind 함수를 사용하면 CSS Modules와 함께 사용할 때 더 편리합니다
import classNames from 'classnames/bind';

// 🧩 하위 레벨 컴포넌트들을 가져옵니다
// Organisms는 Atoms와 Molecules를 조합하여 만들어집니다
import { Button } from '../../Atoms/Button';
import { UserHeader } from '../../Molecules/UserHeader';
import { ActionButtons } from '../../Molecules/ActionButtons';
import { TextInputForm } from '../../Molecules/TextInputForm';

// 유틸리티 함수들을 가져옵니다
import {
  MAX_COMMENT_DEPTH,
  validateCommentDepth,
  sortReplies
} from './commentUtils';

// 이 컴포넌트의 스타일을 가져옵니다
// CSS Modules를 사용하므로 클래스명이 자동으로 고유화됩니다
import styles from './CommentItemConsolidated.module.scss';

// classnames의 bind 함수를 사용하여 스타일 객체와 바인딩합니다
// 이렇게 하면 cx('comment-item') 같은 방식으로 클래스를 조합할 수 있습니다
const cx = classNames.bind(styles);

/**
 * 🎯 댓글 데이터를 정의하는 인터페이스
 * 
 * 댓글의 모든 정보를 포함하는 구조체입니다.
 * 이 인터페이스를 통해 댓글 데이터의 구조를 명확하게 정의합니다.
 */
export interface Comment extends EnhancedComment {
}

/**
 * 🎯 Enhanced Comment 데이터를 정의하는 인터페이스
 *
 * 댓글의 모든 정보를 포함하는 구조체로, parentId와 replyTo 필드를 추가로 포함합니다.
 * 이 인터페이스를 통해 댓글 데이터의 구조를 명확하게 정의합니다.
 */
export interface EnhancedComment {
  /**
   * 🔑 댓글의 고유 식별자입니다
   * 데이터베이스에서 가져온 ID이거나 생성된 UUID입니다
   */
  id: string;

  /**
   * 📝 댓글의 실제 내용입니다
   * 사용자가 작성한 텍스트 내용을 포함합니다
   */
  content: string;

  /**
   * 👤 댓글 작성자 정보를 포함하는 객체입니다
   * 작성자의 이름, 아바타, 인증 여부 등을 포함합니다
   */
  author: {
    name: string;        // 작성자 이름
    avatar?: string;     // 프로필 이미지 URL (선택적)
    isVerified?: boolean; // 인증된 사용자 여부 (선택적)
  };

  /**
   * ⏰ 댓글이 생성된 시간입니다
   * ISO 8601 형식의 문자열로 저장됩니다 (예: "2024-01-15T10:30:00Z")
   */
  createdAt: string;

  /**
   * ❤️ 댓글에 달린 좋아요 개수입니다
   * 다른 사용자들이 이 댓글에 좋아요를 누른 총 개수입니다
   */
  likes: number;

  /**
   * 💬 댓글에 달린 답글 개수입니다
   * 이 댓글에 대한 답글의 총 개수입니다
   */
  replies: number;

  /**
   * 💬 답글 목록입니다
   * 이 댓글에 대한 실제 답글 데이터 배열입니다
   */
  replyComments?: EnhancedComment[];

  /**
   * ❤️ 현재 사용자가 이 댓글에 좋아요를 눌렀는지 여부입니다
   * true일 때 좋아요 버튼이 활성화된 상태로 표시됩니다
   */
  isLiked: boolean;

  /**
   * 👤 현재 사용자가 이 댓글의 작성자인지 여부입니다
   * true일 때 수정/삭제 버튼이 표시됩니다
   */
  isAuthor: boolean;

  /**
   * 🔗 부모 댓글의 ID입니다 (답글인 경우)
   * 계층 구조에서 상위 댓글을 가리킵니다
   */
  parentId?: string;

  /**
   * 🔗 답글 대상 사용자의 이름입니다 (멘션 스타일 답글인 경우)
   * 직접 답글을 보내는 사용자를 가리킬 수 있습니다 (parentId와 다를 수 있음)
   */
  replyTo?: string;
}

/**
 * 🎯 CommentItem 컴포넌트의 Props 인터페이스 정의
 * 
 * TypeScript를 사용하여 컴포넌트가 받을 수 있는 속성들을 명확하게 정의합니다.
 * 이렇게 하면 타입 안전성과 자동완성을 보장할 수 있습니다.
 */
export interface CommentItemProps {
  /**
   * 📝 표시할 댓글 데이터입니다
   * EnhancedComment 인터페이스를 따르는 댓글 객체입니다
   */
  comment: Comment;

  /**
   * 📊 댓글의 중첩 깊이입니다
   * 답글의 답글(답답글)을 표시할 때 사용됩니다
   * 0: 최상위 댓글, 1: 답글, 2: 답답글, ...
   * 기본값: 0
   */
  depth?: number;

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
   * 📤 답글 삭제를 처리하는 콜백 함수입니다
   * @param commentId - 삭제할 답글의 ID
   */
  onReplyDelete?: (commentId: string) => void;

  /**
   * 🔄 답글 제출 후 호출되는 콜백 함수입니다
   * @param replyComment - 새로 추가된 답글 객체
   */
  onReplySubmit?: (replyComment: EnhancedComment) => void;

  /**
   * 🔄 댓글이 업데이트되었을 때 호출되는 콜백 함수입니다
   * @param updatedComment - 업데이트된 댓글 객체
   */
  onCommentUpdate?: (updatedComment: Comment) => void;

  /**
   * 🗑️ 댓글이 삭제되었을 때 호출되는 콜백 함수입니다
   * @param commentId - 삭제할 댓글의 ID
   */
  onCommentDelete?: (commentId: string) => void;

  /**
   * 🎨 추가적인 CSS 클래스를 적용할 수 있습니다
   * 컴포넌트의 기본 스타일을 유지하면서 추가 스타일링이 가능합니다
   */
  className?: string;
}

/**
 * 🚀 CommentItem 컴포넌트 정의
 * 
 * React.FC는 "Function Component"의 줄임말로, 함수형 컴포넌트임을 명시합니다.
 * <CommentItemProps>는 이 컴포넌트가 CommentItemProps 타입의 props를 받는다는 의미입니다.
 * 
 * 이 컴포넌트는 내부 상태를 가지고 있어서 답글 표시/숨김과 답글 작성 폼을 관리합니다.
 */
export const CommentItem: React.FC<CommentItemProps> = ({
  // 🎯 Props 구조 분해 할당 (Destructuring Assignment)
  comment,                   // 댓글 데이터 (필수)
  depth = 0,                 // 중첩 깊이 (기본값: 0)
  onLikeClick,               // 좋아요 핸들러 (선택적)
  onReplyClick,              // 답글 핸들러 (선택적)
  onReportClick,             // 신고 핸들러 (선택적)
  onEditClick,               // 수정 핸들러 (선택적)
  onDeleteClick,             // 삭제 핸들러 (선택적)
  onAuthorClick,             // 작성자 클릭 핸들러 (선택적)
  onSubmitReply,             // 답글 제출 핸들러 (선택적)
  onReplyDelete,
  onReplySubmit,
  onCommentUpdate,
  onCommentDelete,
  className,                 // 추가 CSS 클래스 (선택적)
}) => {
  /**
   * 📊 답글 목록 표시 여부를 관리하는 상태
   *
   * useState는 React Hook으로, 컴포넌트 내부에서 상태를 관리할 때 사용합니다.
   * [현재값, 값을 변경하는 함수] 형태로 반환됩니다.
   * 초기값은 false로 설정되어 답글이 숨겨진 상태로 시작합니다.
   */
  const [showReplies, setShowReplies] = useState(false);

  /**
   * 📝 답글 작성 폼 표시 여부를 관리하는 상태
   *
   * 답글 작성 폼이 열려있는지 닫혀있는지를 관리합니다.
   * 초기값은 false로 설정되어 폼이 숨겨진 상태로 시작합니다.
   */
  const [showReplyForm, setShowReplyForm] = useState(false);

  /**
   * 📊 답글 정렬 기준을 관리하는 상태
   *
   * 답글을 정렬하는 기준을 관리합니다.
   * 기본값은 'newest'로 설정되어 최신순으로 정렬합니다.
   */
  const [replySortBy, setReplySortBy] = useState<'newest' | 'oldest' | 'mostLiked'>('newest');

  /**
   * 📤 답글 제출 핸들러
   *
   * 사용자가 답글을 작성하고 제출했을 때 실행되는 함수입니다.
   * 부모 컴포넌트에 답글 데이터를 전달하고 답글 작성 폼을 닫습니다.
   *
   * @param content - 작성된 답글 내용
   */
  const handleReplySubmit = useCallback((content: string) => {
    // 📤 부모 컴포넌트에 답글 데이터 전달
    onSubmitReply?.(comment.id, content);
    // 🔄 답글 작성 폼 닫기
    setShowReplyForm(false);
  }, [comment.id, onSubmitReply]);

  /**
   * 📅 날짜 포맷팅 함수
   * 
   * ISO 8601 형식의 날짜 문자열을 사용자 친화적인 형태로 변환합니다.
   * "방금 전", "5분 전", "2시간 전", "3일 전" 등의 형태로 표시됩니다.
   * 
   * @param dateString - ISO 8601 형식의 날짜 문자열
   * @returns 사용자 친화적인 날짜 문자열
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    
    // 🕐 현재 시간과의 차이를 분 단위로 계산
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    // 🎯 시간 차이에 따른 포맷팅
    if (diffInMinutes < 1) return '방금 전';
    if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}시간 전`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}일 전`;
    
    // 📅 7일 이상 지난 경우 한국어 날짜 형식으로 표시
    return date.toLocaleDateString('ko-KR');
  };

  /**
   * 🎨 JSX 반환
   * 
   * React 컴포넌트는 JSX를 반환해야 합니다.
   * 여기서는 댓글 아이템을 포함하는 article 요소를 반환합니다.
   */
  return (
    <article className={cx(
      'comment-item',                    // 기본 댓글 아이템 클래스
      { [`depth-${depth}`]: depth > 0 }, // 중첩 깊이에 따른 클래스
      className                          // 사용자가 전달한 추가 클래스
    )}>
      {/* 👤 사용자 헤더 (이름, 아바타, 시간, 인증 여부) */}
      <UserHeader
        authorName={comment.author?.name || '알 수 없는 사용자'}
        authorAvatar={comment.author?.avatar}
        timestamp={formatDate(comment.createdAt)}
        isVerified={comment.author?.isVerified || false}
        onAuthorClick={() => onAuthorClick?.(comment.author?.name || '알 수 없는 사용자')}
      />

      {/* 📝 댓글 내용 */}
      <div className={cx('comment-text')}>{comment.content}</div>

      {/* 🎯 액션 버튼들 (좋아요, 답글, 신고, 수정, 삭제) */}
      <ActionButtons
        likeCount={comment.likes}
        isLiked={comment.isLiked}
        replyCount={comment.replies}
        onLikeClick={() => onLikeClick?.(comment.id)}
        onReplyClick={() => {
          onReplyClick?.(comment.id);
          setShowReplyForm(!showReplyForm);
        }}
        onReportClick={() => onReportClick?.(comment.id)}
        onEditClick={() => onEditClick?.(comment.id)}
        onDeleteClick={() => onDeleteClick?.(comment.id)}
        canEdit={comment.isAuthor}
        canDelete={comment.isAuthor}
      />

      {/* 📝 답글 작성 폼 (답글 버튼을 클릭했을 때만 표시) */}
      {showReplyForm && (
        <div className={cx('reply-form')}>
          <TextInputForm
            onSubmit={handleReplySubmit}
            placeholder="답글을 입력하세요..."
            submitText="답글 작성"
          />
        </div>
      )}

      {/* 💬 답글 토글 버튼 (답글이 있을 때만 표시) */}
      {comment.replies > 0 && (
        <Button
          variant='text'
          size='sm'
          onClick={() => setShowReplies(!showReplies)}
          className={cx('reply-toggle')}
        >
          {showReplies ? '▼' : '▶'} 답글 {comment.replies}개
        </Button>
      )}

      {/* 📋 답글 목록 (답글이 있고, 사용자가 답글 보기 버튼을 클릭했을 때 표시) */}
      {showReplies && comment.replyComments && comment.replyComments.length > 0 && (
        <div className={cx('replies')}>
          <RepliedCommentList
            comments={comment.replyComments}
            onCommentUpdate={onCommentUpdate}
            onCommentDelete={onCommentDelete}
          />
        </div>
      )}
    </article>
  );
};

/**
 * 📝 사용 예시:
 * 
 * // 기본 댓글 아이템
 * const comment = {
 *   id: '1',
 *   content: '정말 좋은 글이네요!',
 *   author: {
 *     name: '김철수',
 *     avatar: '/images/avatar1.jpg',
 *     isVerified: true
 *   },
 *   createdAt: '2024-01-15T10:30:00Z',
 *   likes: 5,
 *   replies: 2,
 *   isLiked: false,
 *   isAuthor: false
 * };
 * 
 * <CommentItem 
 *   comment={comment}
 *   onLikeClick={(id) => handleLike(id)}
 *   onReplyClick={(id) => handleReply(id)}
 *   onAuthorClick={(name) => navigateToProfile(name)}
 * />
 * 
 * 🎯 이 컴포넌트의 특징:
 * 1. 완전성: 댓글 표시에 필요한 모든 기능을 포함
 * 2. 재사용성: 다양한 댓글 시스템에서 사용 가능
 * 3. 확장성: 답글 기능을 쉽게 추가할 수 있음
 * 4. 접근성: 적절한 HTML 구조와 ARIA 속성
 * 5. 상태 관리: 내부 상태로 UI 상태를 관리
 * 
 * 🏗️ 컴포넌트 계층 구조:
 * CommentItem (Organisms)
 * ├── UserHeader (Molecules)
 * │   ├── Avatar (Atoms)
 * │   └── Button (Atoms)
 * ├── ActionButtons (Molecules)
 * │   └── Button (Atoms)
 * ├── TextInputForm (Molecules)
 * │   ├── Input (Atoms)
 * │   └── Button (Atoms)
 * └── Button (Atoms)
 * 
 * 💡 팁:
 * - depth prop을 사용하여 답글의 중첩 레벨을 시각적으로 표현할 수 있습니다
 * - 모든 이벤트 핸들러는 옵셔널이므로 필요한 기능만 구현하면 됩니다
 * - 답글 목록은 현재 주석 처리되어 있지만, 필요에 따라 구현할 수 있습니다
 */ 
