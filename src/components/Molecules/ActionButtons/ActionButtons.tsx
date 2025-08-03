/**
 * 🎓 ActionButtons 컴포넌트 학습 가이드
 * 
 * 이 파일은 React + TypeScript로 만든 재사용 가능한 ActionButtons 컴포넌트입니다.
 * 댓글이나 게시물에 대한 액션 버튼들(좋아요, 답글, 신고, 수정, 삭제)을 표시합니다.
 * Atoms 레벨의 Button 컴포넌트를 조합하여 만든 Molecules 레벨 컴포넌트입니다.
 * 초보자를 위해 각 부분에 상세한 주석을 추가했습니다.
 */

// React 라이브러리에서 필요한 기능들을 가져옵니다
import React from 'react';

// classnames 라이브러리를 가져와서 CSS 클래스를 동적으로 조합할 수 있게 합니다
// bind 함수를 사용하면 CSS Modules와 함께 사용할 때 더 편리합니다
import classNames from 'classnames/bind';

// Atoms 레벨의 Button 컴포넌트를 가져옵니다
// 이 컴포넌트는 Button 컴포넌트를 조합하여 더 복잡한 기능을 제공합니다
import { Button } from '../../Atoms/Button';

// 이 컴포넌트의 스타일을 가져옵니다
// CSS Modules를 사용하므로 클래스명이 자동으로 고유화됩니다
import styles from './ActionButtons.module.scss';

// classnames의 bind 함수를 사용하여 스타일 객체와 바인딩합니다
// 이렇게 하면 cx('action-buttons') 같은 방식으로 클래스를 조합할 수 있습니다
const cx = classNames.bind(styles);

/**
 * 🎯 ActionButtons 컴포넌트의 Props 인터페이스 정의
 * 
 * TypeScript를 사용하여 컴포넌트가 받을 수 있는 속성들을 명확하게 정의합니다.
 * 이렇게 하면 타입 안전성과 자동완성을 보장할 수 있습니다.
 */
export interface ActionButtonsProps {
  /**
   * ❤️ 좋아요 개수입니다
   * 현재 게시물이나 댓글에 달린 좋아요의 총 개수를 표시합니다
   */
  likeCount: number;

  /**
   * ❤️ 현재 사용자가 좋아요를 눌렀는지 여부입니다
   * true일 때 좋아요 버튼이 활성화된 상태로 표시됩니다
   */
  isLiked: boolean;

  /**
   * 💬 답글 개수입니다
   * 현재 게시물이나 댓글에 달린 답글의 총 개수를 표시합니다
   */
  replyCount: number;

  /**
   * ❤️ 좋아요 버튼을 클릭했을 때 호출되는 콜백 함수입니다
   * 좋아요 상태를 토글하는 로직을 처리합니다
   */
  onLikeClick?: () => void;

  /**
   * 💬 답글 버튼을 클릭했을 때 호출되는 콜백 함수입니다
   * 답글 작성 모드를 활성화하는 로직을 처리합니다
   */
  onReplyClick?: () => void;

  /**
   * ⚠️ 신고 버튼을 클릭했을 때 호출되는 콜백 함수입니다
   * 신고 모달을 열거나 신고 처리를 시작하는 로직을 처리합니다
   */
  onReportClick?: () => void;

  /**
   * ✏️ 수정 버튼을 클릭했을 때 호출되는 콜백 함수입니다
   * 수정 모드를 활성화하는 로직을 처리합니다
   */
  onEditClick?: () => void;

  /**
   * 🗑️ 삭제 버튼을 클릭했을 때 호출되는 콜백 함수입니다
   * 삭제 확인 모달을 열거나 삭제 처리를 시작하는 로직을 처리합니다
   */
  onDeleteClick?: () => void;

  /**
   * ✏️ 수정 버튼을 표시할지 결정합니다
   * true일 때만 수정 버튼이 렌더링됩니다 (권한 체크용)
   */
  canEdit?: boolean;

  /**
   * 🗑️ 삭제 버튼을 표시할지 결정합니다
   * true일 때만 삭제 버튼이 렌더링됩니다 (권한 체크용)
   */
  canDelete?: boolean;

  /**
   * 🎨 추가적인 CSS 클래스를 적용할 수 있습니다
   * 컴포넌트의 기본 스타일을 유지하면서 추가 스타일링이 가능합니다
   */
  className?: string;
}

/**
 * 🚀 ActionButtons 컴포넌트 정의
 * 
 * React.FC는 "Function Component"의 줄임말로, 함수형 컴포넌트임을 명시합니다.
 * <ActionButtonsProps>는 이 컴포넌트가 ActionButtonsProps 타입의 props를 받는다는 의미입니다.
 * 
 * 이 컴포넌트는 화살표 함수로 정의되어 있으며, 즉시 반환하는 형태입니다.
 * 복잡한 로직이 없고 단순히 JSX를 반환하는 경우에 적합한 패턴입니다.
 */
export const ActionButtons: React.FC<ActionButtonsProps> = ({
  // 🎯 Props 구조 분해 할당 (Destructuring Assignment)
  likeCount,                 // 좋아요 개수 (필수)
  isLiked,                   // 좋아요 상태 (필수)
  replyCount,                // 답글 개수 (필수)
  onLikeClick,               // 좋아요 클릭 핸들러 (선택적)
  onReplyClick,              // 답글 클릭 핸들러 (선택적)
  onReportClick,             // 신고 클릭 핸들러 (선택적)
  onEditClick,               // 수정 클릭 핸들러 (선택적)
  onDeleteClick,             // 삭제 클릭 핸들러 (선택적)
  canEdit = false,           // 수정 권한 (기본값: false)
  canDelete = false,         // 삭제 권한 (기본값: false)
  className,                 // 추가 CSS 클래스 (선택적)
}) => (
  /**
   * 🎨 JSX 반환
   * 
   * 액션 버튼들을 포함하는 컨테이너를 반환합니다.
   * 각 버튼은 Atoms 레벨의 Button 컴포넌트를 사용하여 구현됩니다.
   */
  <div className={cx('action-buttons', className)}>
    {/* ❤️ 좋아요 버튼 */}
    <Button
      variant='ghost'                    // 투명 배경 스타일
      size='sm'                          // 작은 크기
      onClick={onLikeClick}              // 클릭 핸들러
      className={cx('action-button', { 
        liked: isLiked                   // 좋아요 상태에 따른 클래스
      })}
    >
      ♥ {likeCount}                      {/* 하트 이모지와 좋아요 개수 */}
    </Button>

    {/* 💬 답글 버튼 */}
    <Button
      variant='ghost'                    // 투명 배경 스타일
      size='sm'                          // 작은 크기
      onClick={onReplyClick}             // 클릭 핸들러
      className={cx('action-button')}    // 기본 액션 버튼 클래스
    >
      💬 {replyCount}                    {/* 말풍선 이모지와 답글 개수 */}
    </Button>

    {/* ⚠️ 신고 버튼 */}
    <Button
      variant='ghost'                    // 투명 배경 스타일
      size='sm'                          // 작은 크기
      onClick={onReportClick}            // 클릭 핸들러
      className={cx('action-button')}    // 기본 액션 버튼 클래스
    >
      ⚠️                                  {/* 경고 이모지 */}
    </Button>

    {/* ✏️ 수정 버튼 (권한이 있을 때만 표시) */}
    {canEdit && (
      <Button
        variant='ghost'                  // 투명 배경 스타일
        size='sm'                        // 작은 크기
        onClick={onEditClick}            // 클릭 핸들러
        className={cx('action-button')}  // 기본 액션 버튼 클래스
      >
        ✏️                                {/* 연필 이모지 */}
      </Button>
    )}

    {/* 🗑️ 삭제 버튼 (권한이 있을 때만 표시) */}
    {canDelete && (
      <Button
        variant='ghost'                  // 투명 배경 스타일
        size='sm'                        // 작은 크기
        onClick={onDeleteClick}          // 클릭 핸들러
        className={cx('action-button')}  // 기본 액션 버튼 클래스
      >
        🗑️                                {/* 휴지통 이모지 */}
      </Button>
    )}
  </div>
);

/**
 * 📝 사용 예시:
 * 
 * // 기본 액션 버튼들
 * <ActionButtons 
 *   likeCount={42} 
 *   isLiked={true} 
 *   replyCount={5} 
 *   onLikeClick={() => handleLike()} 
 *   onReplyClick={() => handleReply()} 
 *   onReportClick={() => handleReport()} 
 * />
 * 
 * // 수정/삭제 권한이 있는 사용자용
 * <ActionButtons 
 *   likeCount={42} 
 *   isLiked={false} 
 *   replyCount={5} 
 *   canEdit={true} 
 *   canDelete={true} 
 *   onEditClick={() => handleEdit()} 
 *   onDeleteClick={() => handleDelete()} 
 * />
 * 
 * // 읽기 전용 사용자용 (수정/삭제 버튼 없음)
 * <ActionButtons 
 *   likeCount={42} 
 *   isLiked={false} 
 *   replyCount={5} 
 *   canEdit={false} 
 *   canDelete={false} 
 * />
 */ 