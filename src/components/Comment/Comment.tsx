// src/components/Comment.tsx

import React, { useState, useEffect } from 'react';
import { Avatar } from './Avatar';
import { CommentHeader } from './CommentHeader';
import { CommentBody } from './CommentBody';
import { ActionBar } from './ActionBar';
import './comment.css';

/**
 * CommentProps
 * @property author - 댓글 작성자 이름
 * @property avatarUrl - 프로필 이미지 URL (없으면 null)
 * @property text - 댓글 본문 텍스트
 * @property timestamp - 댓글 작성 시간(문자열)
 */
interface CommentProps {
  author: string;
  avatarUrl?: string | null;
  text: string;
  timestamp: string;
}

/**
 * Comment 컴포넌트
 * - 하나의 댓글(작성자, 본문, 액션바, 답글, 신고 등)을 표현
 * - 내부적으로 상태를 관리하여 좋아요/싫어요, 답글, 수정, 신고 등 다양한 상호작용을 지원
 * - Avatar, CommentHeader, CommentBody, ActionBar 등 서브컴포넌트로 분리하여 UI 구성
 */
export const Comment: React.FC<CommentProps> = ({ author, avatarUrl = null, text, timestamp }) => {
  // 좋아요/싫어요 상태 및 카운트
  const [liked, setLiked] = useState(false); // 좋아요 여부
  const [disliked, setDisliked] = useState(false); // 싫어요 여부
  const [likeCount, setLikeCount] = useState(0); // 좋아요 수
  const [dislikeCount, setDislikeCount] = useState(0); // 싫어요 수

  // 답글 입력창 토글 상태
  const [showReply, setShowReply] = useState(false);
  // 답글 입력값 상태
  const [replyValue, setReplyValue] = useState('');

  // 수정 모드 상태
  const [isEditing, setIsEditing] = useState(false);
  // 댓글 본문(수정 반영)
  const [commentText, setCommentText] = useState(text);
  // 수정 입력값 상태
  const [editValue, setEditValue] = useState(text);

  // 신고 입력창 토글 상태
  const [showReport, setShowReport] = useState(false);
  // 신고 사유 입력값
  const [reportReason, setReportReason] = useState('');
  // 신고 접수 완료 여부
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // 답글 목록(간단한 배열)
  const [replies, setReplies] = useState<{ text: string; timestamp: string }[]>([]);

  /**
   * 답글 버튼 클릭 핸들러
   * - 답글 입력창을 토글
   */
  const handleReplyClick = () => setShowReply((prev) => !prev);

  /**
   * 좋아요 버튼 클릭 핸들러
   * - 좋아요/싫어요는 동시에 true가 될 수 없음
   * - 좋아요 상태 토글 및 카운트 증감
   */
  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount(c => c - 1);
    } else {
      setLiked(true);
      setLikeCount(c => c + 1);
      if (disliked) {
        setDisliked(false);
        setDislikeCount(c => c - 1);
      }
    }
  };

  /**
   * 싫어요 버튼 클릭 핸들러
   * - 좋아요와 동일하게 동작, 상태는 상호배타적
   */
  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
      setDislikeCount(c => c - 1);
    } else {
      setDisliked(true);
      setDislikeCount(c => c + 1);
      if (liked) {
        setLiked(false);
        setLikeCount(c => c - 1);
      }
    }
  };

  /**
   * 답글 입력값 변경 핸들러
   */
  const handleReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => setReplyValue(e.target.value);

  /**
   * 답글 등록 핸들러
   * - 입력값이 비어있지 않으면 replies 배열에 추가
   * - 입력창 초기화 및 닫기
   */
  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyValue.trim() === '') return;
    setReplies(prev => [...prev, { text: replyValue, timestamp: '방금 전' }]);
    setReplyValue('');
    setShowReply(false);
  };

  /**
   * 수정 버튼 클릭 핸들러
   * - 수정 모드 토글
   */
  const handleEditClick = () => setIsEditing((prev) => !prev);

  /**
   * 수정 입력값 변경 핸들러
   */
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => setEditValue(e.target.value);

  /**
   * 수정 저장 핸들러
   * - 입력값을 댓글 본문에 반영, 수정 모드 종료
   */
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCommentText(editValue); // 실제 텍스트 반영
    setIsEditing(false);
  };

  // 실제 서비스라면 isEditable은 본인 댓글 여부 등으로 판단해야 함(여기선 항상 true)
  const isEditable = true;

  /**
   * 신고 버튼 클릭 핸들러
   * - 신고 입력창 토글
   */
  const handleReportClick = () => setShowReport(prev => !prev);

  /**
   * 신고 사유 입력값 변경 핸들러
   */
  const handleReportReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => setReportReason(e.target.value);

  /**
   * 신고 제출 핸들러
   * - 입력값이 비어있지 않으면 접수 완료 상태로 변경
   */
  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reportReason.trim() === '') return;
    setReportSubmitted(true);
  };

  /**
   * 신고 폼이 닫힐 때 입력값/상태 초기화
   */
  useEffect(() => {
    if (!showReport) {
      setReportReason('');
      setReportSubmitted(false);
    }
  }, [showReport]);

  return (
    <div className="comment-container">
      {/* 프로필 아바타 영역 */}
      <div className="avatar-container">
        <Avatar author={author} avatarUrl={avatarUrl} />
      </div>
      <div className="comment-body">
        {/* 댓글 헤더(작성자, 시간) */}
        <CommentHeader author={author} timestamp={timestamp} />
        {/* 댓글 본문(수정 모드 지원) */}
        <CommentBody
          text={commentText}
          isEditing={isEditing}
          editValue={editValue}
          onEditChange={handleEditChange}
          onEditSubmit={handleEditSubmit}
        />
        {/* 액션바(좋아요, 싫어요, 답글, 수정, 신고) */}
        <ActionBar
          onReply={handleReplyClick}
          onEdit={isEditable ? handleEditClick : undefined}
          isEditing={isEditing}
          likeCount={likeCount}
          dislikeCount={dislikeCount}
          liked={liked}
          disliked={disliked}
          onLike={handleLike}
          onDislike={handleDislike}
          onReport={handleReportClick}
        />
        {/* 신고 입력 UI: showReport가 true일 때만 렌더링 */}
        {showReport && (
          <div className="report-form" style={{ marginTop: 12 }}>
            {reportSubmitted ? (
              <div className="report-confirm" style={{ color: '#1976d2', fontWeight: 'bold', fontSize: 15 }}>
                신고가 접수되었습니다.
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  className="report-input"
                  type="text"
                  value={reportReason}
                  onChange={handleReportReasonChange}
                  placeholder="신고 사유를 입력하세요..."
                  style={{ padding: '6px', width: '70%' }}
                />
                <button type="submit" className="action-btn">신고하기</button>
              </form>
            )}
          </div>
        )}
        {/* 답글 입력 UI: showReply가 true일 때만 렌더링 */}
        {showReply && (
          <form className="reply-form" onSubmit={handleReplySubmit} style={{ marginTop: 8 }}>
            <input
              className="reply-input"
              type="text"
              value={replyValue}
              onChange={handleReplyChange}
              placeholder="답글을 입력하세요..."
              style={{ padding: '6px', width: '80%' }}
            />
            <button type="submit" className="action-btn" style={{ marginTop: 8 }}>등록</button>
          </form>
        )}
        {/* 답글 목록 렌더링 */}
        {replies.length > 0 && (
          <div className="reply-list" style={{ marginTop: 12, paddingLeft: 16, borderLeft: '2px solid #eee' }}>
            {replies.map((reply, idx) => (
              <div key={idx} className="reply-item" style={{ marginBottom: 8 }}>
                <span className="reply-text" style={{ fontSize: 14 }}>{reply.text}</span>
                <span className="reply-timestamp" style={{ fontSize: 12, color: '#888', marginLeft: 8 }}>{reply.timestamp}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};