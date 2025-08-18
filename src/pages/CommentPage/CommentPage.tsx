/**
 * 🎓 CommentPage 컴포넌트 학습 가이드
 *
 * 이 파일은 Pages 레벨의 컴포넌트로, 완전한 댓글 페이지를 구현합니다.
 * Atoms, Molecules, Organisms를 모두 조합하여 실제 사용 가능한 페이지를 만듭니다.
 *
 * 🎯 학습 포인트:
 * - 페이지 컴포넌트 설계 방법
 * - 여러 레벨의 컴포넌트 조합
 * - 복잡한 상태 관리
 * - 사용자 인터랙션 처리
 */

// React 라이브러리에서 필요한 기능들을 가져옵니다
import React from 'react';

// classnames 라이브러리를 가져와서 CSS 클래스를 동적으로 조합할 수 있게 합니다
import classNames from 'classnames/bind';

// 🏗️ Layout 컴포넌트를 가져옵니다
// Pages는 Layout을 사용하여 페이지 구조를 만듭니다
import { PageLayout } from '../../layouts/PageLayout';

// 🧩 Molecules 컴포넌트를 가져옵니다
// Pages는 Molecules를 직접 사용할 수도 있습니다
import { TextInputForm } from '../../components/Molecules/TextInputForm';

// 🧬 Organisms 컴포넌트를 가져옵니다
// Pages는 주로 Organisms를 조합하여 만듭니다
import { CommentList } from '../../components/Organisms/CommentList';

// 타입 정의를 가져옵니다
// Comment 타입은 Organisms에서 정의되어 있습니다
import type { Comment } from '../../components/Organisms/CommentItem';

// 이 컴포넌트의 스타일을 가져옵니다
import styles from './CommentPage.module.scss';

// classnames의 bind 함수를 사용하여 스타일 객체와 바인딩합니다
const cx = classNames.bind(styles);

/**
 * 🎯 CommentPage 컴포넌트의 Props 인터페이스 정의
 *
 * 이 컴포넌트는 완전한 페이지이므로, 페이지와 관련된 모든 설정을 props로 받습니다.
 * 실제 애플리케이션에서는 이 props들이 API나 상태 관리 라이브러리에서 전달됩니다.
 */
export interface CommentPageProps {
  /**
   * 💬 표시할 댓글 목록 (필수)
   * Comment 타입의 배열로, 각 댓글의 모든 정보를 포함합니다
   */
  comments: Comment[];

  /**
   * 📊 댓글 정렬 방식 (선택적)
   * - 'newest': 최신순 (기본값)
   * - 'oldest': 오래된순
   * - 'mostLiked': 좋아요순
   * - 'mostReplied': 답글순
   */
  sortBy?: 'newest' | 'oldest' | 'mostLiked' | 'mostReplied';

  /**
   * ⏳ 로딩 상태 (선택적)
   * true일 때 로딩 스피너를 표시합니다
   */
  loading?: boolean;

  /**
   * 📝 페이지 제목 (선택적)
   * 페이지 상단에 표시되는 제목입니다
   */
  title?: string;

  /**
   * 📄 페이지 부제목 (선택적)
   * 제목 아래에 표시되는 설명입니다
   */
  subtitle?: string;

  /**
   * ✏️ 댓글 작성 가능 여부 (선택적)
   * false일 때 댓글 작성 폼이 숨겨집니다
   */
  canComment?: boolean;

  /**
   * 🔢 최대 댓글 수 (선택적)
   * 댓글 수 제한을 설정합니다
   */
  maxComments?: number;

  /**
   * 🎨 추가적인 CSS 클래스를 적용할 수 있습니다
   * 컴포넌트의 기본 스타일을 유지하면서 추가 스타일링이 가능합니다
   */
  className?: string;

  /**
   * 📊 정렬 방식 변경 이벤트 핸들러 (선택적)
   * 사용자가 정렬 방식을 변경했을 때 호출됩니다
   */
  onSortChange?: (sortBy: 'newest' | 'oldest' | 'mostLiked' | 'mostReplied') => void;

  /**
   * ✏️ 새 댓글 작성 이벤트 핸들러 (선택적)
   * 사용자가 새 댓글을 작성했을 때 호출됩니다
   */
  onSubmitComment?: (content: string) => void;

  /**
   * 💬 답글 작성 이벤트 핸들러 (선택적)
   * 사용자가 답글을 작성했을 때 호출됩니다
   */
  onSubmitReply?: (parentId: string, content: string) => void;

  /**
   * ❤️ 좋아요 클릭 이벤트 핸들러 (선택적)
   * 사용자가 좋아요를 눌렀을 때 호출됩니다
   */
  onLikeClick?: (commentId: string) => void;

  /**
   * 💬 답글 버튼 클릭 이벤트 핸들러 (선택적)
   * 사용자가 답글 버튼을 눌렀을 때 호출됩니다
   */
  onReplyClick?: (commentId: string) => void;

  /**
   * ⚠️ 신고 버튼 클릭 이벤트 핸들러 (선택적)
   * 사용자가 신고 버튼을 눌렀을 때 호출됩니다
   */
  onReportClick?: (commentId: string) => void;

  /**
   * ✏️ 수정 버튼 클릭 이벤트 핸들러 (선택적)
   * 사용자가 수정 버튼을 눌렀을 때 호출됩니다
   */
  onEditClick?: (commentId: string) => void;

  /**
   * 🗑️ 삭제 버튼 클릭 이벤트 핸들러 (선택적)
   * 사용자가 삭제 버튼을 눌렀을 때 호출됩니다
   */
  onDeleteClick?: (commentId: string) => void;

  /**
   * 👤 사용자 이름 클릭 이벤트 핸들러 (선택적)
   * 사용자가 작성자 이름을 클릭했을 때 호출됩니다
   */
  onAuthorClick?: (authorName: string) => void;
}

/**
 * 🚀 CommentPage 컴포넌트 정의
 *
 * 이 컴포넌트는 완전한 댓글 페이지로, 다음과 같은 기능을 제공합니다:
 * - 댓글 목록 표시
 * - 새 댓글 작성
 * - 댓글 정렬
 * - 댓글 상호작용 (좋아요, 답글, 신고, 수정, 삭제)
 * - 사용자 프로필 이동
 */
export const CommentPage: React.FC<CommentPageProps> = ({
  // 🎯 Props 구조 분해 할당
  comments, // 필수 prop (기본값 없음)
  sortBy = 'newest', // 기본값: 'newest'
  loading = false, // 기본값: false
  title = '댓글', // 기본값: '댓글'
  subtitle = '이 글에 대한 의견을 남겨주세요', // 기본값
  canComment = true, // 기본값: true
  maxComments = 100, // 기본값: 100
  className, // 선택적 prop (기본값 없음)
  onSortChange, // 선택적 prop (기본값 없음)
  onSubmitComment, // 선택적 prop (기본값 없음)
  onSubmitReply, // 선택적 prop (기본값 없음)
  onLikeClick, // 선택적 prop (기본값 없음)
  onReplyClick, // 선택적 prop (기본값 없음)
  onReportClick, // 선택적 prop (기본값 없음)
  onEditClick, // 선택적 prop (기본값 없음)
  onDeleteClick, // 선택적 prop (기본값 없음)
  onAuthorClick, // 선택적 prop (기본값 없음)
}) => {
  /**
   * 🎯 새 댓글 제출 핸들러
   *
   * TextInputForm에서 새 댓글이 제출되었을 때 호출됩니다.
   * onSubmitComment 함수가 전달되었다면 실행하고, 콘솔에 로그를 남깁니다.
   */
  const handleSubmitComment = (content: string) => {
    // 👆 onSubmitComment 함수가 전달되었다면 실행
    if (onSubmitComment) {
      onSubmitComment(content);
    }

    // 📝 개발용 로그 (실제 프로젝트에서는 제거)
    console.log('새 댓글 제출:', content);
  };

  /**
   * 🎨 페이지 헤더 렌더링 함수
   *
   * 페이지 상단에 제목, 부제목, 통계 정보를 표시합니다.
   * PageLayout의 header prop으로 전달됩니다.
   */
  const renderHeader = () => (
    <div className={cx('page-header')}>
      {/* 📝 페이지 제목 */}
      <h1 className={cx('page-title')}>{title}</h1>

      {/* 📄 페이지 부제목 (있는 경우에만 표시) */}
      {subtitle && <p className={cx('page-subtitle')}>{subtitle}</p>}

      {/* 📊 페이지 통계 정보 */}
      <div className={cx('page-stats')}>
        <span>댓글 {comments.length}개</span>
        {maxComments && <span>최대 {maxComments}개</span>}
      </div>
    </div>
  );

  /**
   * 🎨 페이지 내용 렌더링 함수
   *
   * 페이지의 주요 내용을 렌더링합니다:
   * - 댓글 작성 폼 (canComment가 true일 때)
   * - 댓글 목록
   *
   * PageLayout의 children prop으로 전달됩니다.
   */
  const renderContent = () => (
    <div className={cx('page-content')}>
      {/* ✏️ 댓글 작성 섹션 (조건부 렌더링) */}
      {canComment && (
        <div className={cx('comment-form-section')}>
          <TextInputForm
            onSubmit={handleSubmitComment}
            placeholder="댓글을 입력하세요..."
            maxLength={500}
            submitText="작성"
          />
        </div>
      )}

      {/* 📋 댓글 목록 섹션 */}
      <div className={cx('comment-list-section')}>
        <CommentList
          comments={comments}
          sortBy={sortBy}
          loading={loading}
          onSortChange={onSortChange}
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

  /**
   * 🎨 페이지 푸터 렌더링 함수
   *
   * 페이지 하단에 안내 문구를 표시합니다.
   * PageLayout의 footer prop으로 전달됩니다.
   */
  const renderFooter = () => (
    <div className={cx('page-footer')}>
      <p>댓글은 커뮤니티 가이드라인을 준수해야 합니다.</p>
      <p>부적절한 댓글은 신고할 수 있습니다.</p>
    </div>
  );

  /**
   * 🎨 JSX 반환
   *
   * PageLayout을 사용하여 페이지 구조를 만들고,
   * 각 섹션을 적절한 위치에 배치합니다.
   */
  return (
    <PageLayout
      header={renderHeader()} // 🏗️ 페이지 헤더
      footer={renderFooter()} // 🏗️ 페이지 푸터
      className={cx('comment-page', className)} // 🎨 CSS 클래스
      maxWidth="xl" // 📐 최대 너비 설정
      padding="lg" // 📏 패딩 설정
    >
      {/* 📄 페이지 내용 */}
      {renderContent()}
    </PageLayout>
  );
};

/**
 * 📝 사용 예시:
 *
 * // 기본 사용법
 * <CommentPage
 *   comments={commentData}
 *   onSubmitComment={handleNewComment}
 *   onLikeClick={handleLike}
 * />
 *
 * // 읽기 전용 모드
 * <CommentPage
 *   comments={commentData}
 *   canComment={false}
 *   title="댓글 (읽기 전용)"
 * />
 *
 * // 로딩 상태
 * <CommentPage
 *   comments={[]}
 *   loading={true}
 *   title="댓글 로딩 중..."
 * />
 *
 * 🎯 이 컴포넌트의 장점:
 * 1. 완전성: 댓글 시스템의 모든 기능을 포함
 * 2. 재사용성: 다양한 페이지에서 사용 가능
 * 3. 유연성: props로 모든 동작을 제어 가능
 * 4. 확장성: 새로운 기능 추가가 용이
 * 5. 접근성: 적절한 HTML 구조와 ARIA 속성
 *
 * 🏗️ 컴포넌트 계층 구조:
 * CommentPage (Pages)
 * ├── PageLayout (Layouts)
 * │   ├── Header (Layouts)
 * │   ├── Footer (Layouts)
 * │   └── Container (Layouts)
 * ├── TextInputForm (Molecules)
 * │   ├── Input (Atoms)
 * │   └── Button (Atoms)
 * └── CommentList (Organisms)
 *     ├── SortSelector (Molecules)
 *     └── CommentItem (Organisms)
 *         ├── UserHeader (Molecules)
 *         │   ├── Avatar (Atoms)
 *         │   └── Button (Atoms)
 *         ├── ActionButtons (Molecules)
 *         │   └── Button (Atoms)
 *         └── TextInputForm (Molecules)
 *             ├── Input (Atoms)
 *             └── Button (Atoms)
 */
