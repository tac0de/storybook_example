import { useState } from 'react';
import { CommentPage } from './CommentPage';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof CommentPage> = {
  title: 'Pages/CommentPage',
  component: CommentPage,
  tags: ['autodocs'],
  argTypes: {
    commentCount: { control: 'number', description: '댓글 수' },
    isLoggedIn: { control: 'boolean', description: '로그인 상태' },
    sortOrder: {
      control: 'select',
      options: ['latest', 'popular'],
      description: '정렬 순서',
    },
    onRefresh: { action: 'refresh' },
    onClose: { action: 'close' },
    onSubscribe: { action: 'subscribe' },
    onLogin: { action: 'login' },
    onMyComments: { action: 'my comments' },
    onSortChange: { action: 'sort change' },
    onReplyClick: { action: 'reply click' },
    onLikeClick: { action: 'like click' },
    onDislikeClick: { action: 'dislike click' },
    onEditClick: { action: 'edit click' },
    onDeleteClick: { action: 'delete click' },
  },
  parameters: {
    interactions: {
      disable: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 샘플 댓글 데이터
const sampleComments = [
  {
    id: '1',
    author: 'John Doe',
    authorAvatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    timestamp: '2시간 전',
    content: '정말 좋은 글이네요! 공감합니다.',
    likes: 5,
    dislikes: 1,
    replies: 2,
  },
  {
    id: '2',
    author: 'Jane Smith',
    authorAvatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    timestamp: '1시간 전',
    content: '이 글을 읽고 많은 도움이 되었습니다. 감사합니다!',
    likes: 12,
    dislikes: 0,
    replies: 1,
  },
  {
    id: '3',
    author: '내 댓글',
    authorAvatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    timestamp: '30분 전',
    content: '이 댓글은 편집과 삭제가 가능합니다.',
    likes: 2,
    dislikes: 0,
    editable: true,
    deletable: true,
  },
];

export const Default: Story = {
  args: {
    commentCount: 3,
    comments: sampleComments,
    isLoggedIn: false,
    sortOrder: 'latest',
  },
};

export const LoggedIn: Story = {
  args: {
    commentCount: 3,
    comments: sampleComments,
    isLoggedIn: true,
    sortOrder: 'latest',
    commentInput: {
      value: '',
      onChange: () => {},
      onSubmit: () => {},
      placeholder: '댓글을 입력하세요',
      userAvatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      userName: 'John Doe',
    },
  },
};

export const WithCommentInput: Story = {
  render: () => {
    const [commentValue, setCommentValue] = useState('');
    return (
      <CommentPage
        commentCount={3}
        comments={sampleComments}
        isLoggedIn={true}
        sortOrder='latest'
        commentInput={{
          value: commentValue,
          onChange: e => setCommentValue(e.target.value),
          onSubmit: () => {
            console.log('댓글 제출:', commentValue);
            setCommentValue('');
          },
          placeholder: '댓글을 입력하세요',
          userAvatar:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          userName: 'John Doe',
        }}
      />
    );
  },
};

export const WithPagination: Story = {
  args: {
    commentCount: 25,
    comments: sampleComments,
    isLoggedIn: false,
    sortOrder: 'latest',
    pagination: {
      currentPage: 1,
      totalPages: 5,
      onPageChange: page => console.log('페이지 변경:', page),
      hasNextPage: true,
      onLoadMore: () => console.log('더 보기 클릭'),
    },
  },
};

export const PopularSort: Story = {
  args: {
    commentCount: 3,
    comments: sampleComments,
    isLoggedIn: false,
    sortOrder: 'popular',
  },
};

export const EmptyComments: Story = {
  args: {
    commentCount: 0,
    comments: [],
    isLoggedIn: false,
    sortOrder: 'latest',
  },
};

export const ManyComments: Story = {
  args: {
    commentCount: 156,
    comments: [
      ...sampleComments,
      {
        id: '4',
        author: '인기 댓글',
        authorAvatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        timestamp: '3일 전',
        content: '이 댓글은 많은 사람들이 좋아하고 있습니다!',
        likes: 156,
        dislikes: 12,
        replies: 23,
      },
      {
        id: '5',
        author: '논란의 댓글',
        timestamp: '2일 전',
        content: '이 댓글은 많은 사람들이 싫어합니다.',
        likes: 3,
        dislikes: 89,
        replies: 15,
      },
    ],
    isLoggedIn: false,
    sortOrder: 'latest',
  },
};

export const WithAllActions: Story = {
  args: {
    commentCount: 3,
    comments: sampleComments,
    isLoggedIn: true,
    sortOrder: 'latest',
    commentInput: {
      value: '',
      onChange: () => {},
      onSubmit: () => {},
      placeholder: '댓글을 입력하세요',
      userAvatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      userName: 'John Doe',
    },
    pagination: {
      currentPage: 1,
      totalPages: 3,
      onPageChange: page => console.log('페이지 변경:', page),
      hasNextPage: true,
      onLoadMore: () => console.log('더 보기 클릭'),
    },
  },
};

export const LoadingState: Story = {
  args: {
    commentCount: 3,
    comments: sampleComments,
    isLoggedIn: true,
    sortOrder: 'latest',
    commentInput: {
      value: '댓글을 작성 중입니다...',
      onChange: () => {},
      onSubmit: () => {},
      placeholder: '댓글을 입력하세요',
      userAvatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      userName: 'John Doe',
      loading: true,
      disabled: true,
    },
  },
};
