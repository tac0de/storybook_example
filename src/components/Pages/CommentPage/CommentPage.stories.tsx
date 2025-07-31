import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CommentPage } from './CommentPage';
import type { Comment } from '../../Organisms/CommentList';
import avatarDefault from '../../../assets/react.svg';

const meta: Meta<typeof CommentPage> = {
  title: 'Pages/CommentPage',
  component: CommentPage,
  tags: ['autodocs'],
  argTypes: {
    sortBy: {
      control: 'select',
      options: ['newest', 'oldest', 'mostLiked', 'mostReplied'],
    },
    loading: {
      control: 'boolean',
    },
    canComment: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const initialComments: Comment[] = [
  {
    id: '1',
    content:
      '정말 좋은 글이네요! 공감합니다. 이런 내용이 더 많이 나왔으면 좋겠어요.',
    authorName: '김철수',
    authorAvatar: avatarDefault,
    timestamp: '2024-01-15T10:30:00Z',
    authorStatus: 'online',
    likeCount: 15,
    isLiked: false,
    replyCount: 3,
    canEdit: true,
    canDelete: false,
    replies: [
      {
        id: '1-1',
        content: '저도 완전 동감해요! 특히 두 번째 문단이 정말 공감이 가네요.',
        authorName: '박민수',
        authorAvatar: avatarDefault,
        timestamp: '2024-01-15T11:00:00Z',
        authorStatus: 'online',
        likeCount: 5,
        isLiked: false,
        replyCount: 1,
        canEdit: false,
        canDelete: false,
        parentId: '1',
        replies: [
          {
            id: '1-1-1',
            content: '정말 그렇죠! 저도 같은 생각이었어요.',
            authorName: '이영희',
            authorAvatar: avatarDefault,
            timestamp: '2024-01-15T11:15:00Z',
            authorStatus: 'offline',
            likeCount: 2,
            isLiked: true,
            replyCount: 0,
            canEdit: false,
            canDelete: false,
            parentId: '1-1',
          },
        ],
      },
      {
        id: '1-2',
        content: '좋은 의견이네요. 저도 비슷하게 생각했어요.',
        authorName: '최지영',
        authorAvatar: avatarDefault,
        timestamp: '2024-01-15T11:30:00Z',
        authorStatus: 'away',
        likeCount: 3,
        isLiked: false,
        replyCount: 0,
        canEdit: true,
        canDelete: false,
        parentId: '1',
      },
      {
        id: '1-3',
        content: '완전 공감합니다! 이런 내용이 더 필요해요.',
        authorName: '김영수',
        authorAvatar: avatarDefault,
        timestamp: '2024-01-15T12:00:00Z',
        authorStatus: 'online',
        likeCount: 7,
        isLiked: false,
        replyCount: 0,
        canEdit: false,
        canDelete: false,
        parentId: '1',
      },
    ],
  },
  {
    id: '2',
    content:
      '저도 비슷한 경험이 있어서 공감이 가네요. 특히 마지막 부분이 인상적이었습니다.',
    authorName: '이영희',
    authorAvatar: avatarDefault,
    timestamp: '2024-01-15T09:15:00Z',
    authorStatus: 'offline',
    likeCount: 8,
    isLiked: true,
    replyCount: 1,
    canEdit: false,
    canDelete: false,
    replies: [
      {
        id: '2-1',
        content: '저도 같은 경험이 있어요. 정말 공감이 가네요.',
        authorName: '박민수',
        authorAvatar: avatarDefault,
        timestamp: '2024-01-15T09:45:00Z',
        authorStatus: 'online',
        likeCount: 4,
        isLiked: false,
        replyCount: 0,
        canEdit: false,
        canDelete: false,
        parentId: '2',
      },
    ],
  },
  {
    id: '3',
    content: '좋은 정보 감사합니다. 다음에도 이런 유용한 내용 기대하겠습니다!',
    authorName: '박민수',
    authorAvatar: avatarDefault,
    timestamp: '2024-01-15T08:45:00Z',
    authorStatus: 'away',
    likeCount: 22,
    isLiked: false,
    replyCount: 0,
    canEdit: false,
    canDelete: false,
  },
  {
    id: '4',
    content: '이런 관점은 처음 보네요. 새로운 시각을 제공해주셔서 감사합니다.',
    authorName: '최지영',
    authorAvatar: avatarDefault,
    timestamp: '2024-01-15T07:20:00Z',
    authorStatus: 'busy',
    likeCount: 12,
    isLiked: false,
    replyCount: 2,
    canEdit: true,
    canDelete: true,
    replies: [
      {
        id: '4-1',
        content: '정말 새로운 관점이네요. 생각해볼 점이 많아요.',
        authorName: '김철수',
        authorAvatar: avatarDefault,
        timestamp: '2024-01-15T07:50:00Z',
        authorStatus: 'online',
        likeCount: 6,
        isLiked: false,
        replyCount: 0,
        canEdit: false,
        canDelete: false,
        parentId: '4',
      },
      {
        id: '4-2',
        content: '흥미로운 관점입니다. 더 자세히 설명해주실 수 있나요?',
        authorName: '이영희',
        authorAvatar: avatarDefault,
        timestamp: '2024-01-15T08:00:00Z',
        authorStatus: 'offline',
        likeCount: 3,
        isLiked: true,
        replyCount: 0,
        canEdit: false,
        canDelete: false,
        parentId: '4',
      },
    ],
  },
];

export const Default: Story = {
  render: () => {
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [nextId, setNextId] = useState(100);

    const handleSubmitComment = (content: string) => {
      const newComment: Comment = {
        id: nextId.toString(),
        content,
        authorName: '사용자',
        authorAvatar: avatarDefault,
        timestamp: new Date().toISOString(),
        authorStatus: 'online',
        likeCount: 0,
        isLiked: false,
        replyCount: 0,
        canEdit: true,
        canDelete: true,
      };

      setComments(prev => [newComment, ...prev]);
      setNextId(prev => prev + 1);
      console.log('새 댓글 추가:', content);
    };

    const handleSubmitReply = (parentId: string, content: string) => {
      const addReplyToComment = (commentList: Comment[]): Comment[] => {
        return commentList.map(comment => {
          if (comment.id === parentId) {
            const newReply: Comment = {
              id: nextId.toString(),
              content,
              authorName: '사용자',
              authorAvatar: avatarDefault,
              timestamp: new Date().toISOString(),
              authorStatus: 'online',
              likeCount: 0,
              isLiked: false,
              replyCount: 0,
              canEdit: true,
              canDelete: true,
              parentId,
            };

            return {
              ...comment,
              replies: [...(comment.replies || []), newReply],
              replyCount: (comment.replies?.length || 0) + 1,
            };
          }

          if (comment.replies) {
            return {
              ...comment,
              replies: addReplyToComment(comment.replies),
            };
          }

          return comment;
        });
      };

      setComments(addReplyToComment);
      setNextId(prev => prev + 1);
      console.log('새 답글 추가:', { parentId, content });
    };

    const handleLikeClick = (commentId: string) => {
      const updateCommentLikes = (commentList: Comment[]): Comment[] => {
        return commentList.map(comment => {
          if (comment.id === commentId) {
            return {
              ...comment,
              isLiked: !comment.isLiked,
              likeCount: comment.isLiked
                ? comment.likeCount - 1
                : comment.likeCount + 1,
            };
          }

          if (comment.replies) {
            return {
              ...comment,
              replies: updateCommentLikes(comment.replies),
            };
          }

          return comment;
        });
      };

      setComments(updateCommentLikes);
      console.log('좋아요 클릭:', commentId);
    };

    return (
      <CommentPage
        comments={comments}
        title='댓글'
        subtitle='이 글에 대한 의견을 남겨주세요'
        canComment={true}
        maxComments={100}
        onSubmitComment={handleSubmitComment}
        onSubmitReply={handleSubmitReply}
        onLikeClick={handleLikeClick}
      />
    );
  },
};
