import { Avatar } from '../../Atoms/Avatar';
import { Button } from '../../Atoms/Button';

import type React from 'react';

export interface CommentItemProps {
  /** 작성자 이름 (마스킹된 형태) */
  readonly author: string;
  /** 작성자 아바타 URL */
  readonly authorAvatar?: string;
  /** 작성 시간 */
  readonly timestamp: string;
  /** 댓글 내용 */
  readonly content: string;
  /** 좋아요 수 */
  readonly likes: number;
  /** 싫어요 수 */
  readonly dislikes: number;
  /** 답글 수 */
  readonly replies?: number;
  /** 편집 가능 여부 */
  readonly editable?: boolean;
  /** 삭제 가능 여부 */
  readonly deletable?: boolean;
  /** 답글 작성 핸들러 */
  readonly onReplyClick?: () => void;
  /** 좋아요 핸들러 */
  readonly onLikeClick?: () => void;
  /** 싫어요 핸들러 */
  readonly onDislikeClick?: () => void;
  /** 편집 핸들러 */
  readonly onEditClick?: () => void;
  /** 삭제 핸들러 */
  readonly onDeleteClick?: () => void;
  /** 추가 클래스 */
  readonly className?: string;
}

// 아이콘 컴포넌트들
const ReplyIcon = () => (
  <svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z' />
  </svg>
);

const EditIcon = () => (
  <svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' />
  </svg>
);

const DeleteIcon = () => (
  <svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' />
  </svg>
);

const LikeIcon = () => (
  <svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z' />
  </svg>
);

const DislikeIcon = () => (
  <svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z' />
  </svg>
);

export const CommentItem: React.FC<CommentItemProps> = ({
  author,
  authorAvatar,
  timestamp,
  content,
  likes,
  dislikes,
  replies = 0,
  editable = false,
  deletable = false,
  onReplyClick,
  onLikeClick,
  onDislikeClick,
  onEditClick,
  onDeleteClick,
  className = '',
}) => {
  return (
    <div
      className={`py-4 border-b border-gray-200 last:border-b-0 ${className}`}
    >
      {/* 헤더: 아바타 + 작성자 + 시간 */}
      <div className='flex items-start gap-3 mb-3'>
        <Avatar src={authorAvatar} alt={author} size='sm' shape='circle' />
        <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-2 mb-1'>
            <span className='font-medium text-sm text-gray-900 truncate'>
              {author}
            </span>
            <span className='text-xs text-gray-500 flex-shrink-0'>
              {timestamp}
            </span>
          </div>
        </div>
      </div>

      {/* 댓글 내용 */}
      <div className='mb-4 ml-11'>
        <p className='text-sm text-gray-800 leading-relaxed whitespace-pre-wrap'>
          {content}
        </p>
      </div>

      {/* 액션 버튼들 */}
      <div className='flex items-center gap-4 ml-11'>
        {/* 답글 버튼 */}
        <Button
          variant='ghost'
          size='sm'
          leftIcon={<ReplyIcon />}
          onClick={onReplyClick}
          className='text-gray-600 hover:text-gray-800'
        >
          답글 {replies > 0 && `(${replies})`}
        </Button>

        {/* 반응 버튼들 */}
        <div className='flex items-center gap-2'>
          <Button
            variant='ghost'
            size='sm'
            leftIcon={<LikeIcon />}
            onClick={onLikeClick}
            className='text-gray-600 hover:text-blue-600'
          >
            {likes}
          </Button>
          <Button
            variant='ghost'
            size='sm'
            leftIcon={<DislikeIcon />}
            onClick={onDislikeClick}
            className='text-gray-600 hover:text-red-600'
          >
            {dislikes}
          </Button>
        </div>

        {/* 편집/삭제 버튼들 */}
        {(editable || deletable) && (
          <div className='flex items-center gap-2 ml-auto'>
            {editable && (
              <Button
                variant='ghost'
                size='sm'
                leftIcon={<EditIcon />}
                onClick={onEditClick}
                className='text-gray-600 hover:text-blue-600'
              >
                편집
              </Button>
            )}
            {deletable && (
              <Button
                variant='ghost'
                size='sm'
                leftIcon={<DeleteIcon />}
                onClick={onDeleteClick}
                className='text-gray-600 hover:text-red-600'
              >
                삭제
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
