import { CommentList } from './CommentList';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof CommentList> = {
  title: 'Organisms/CommentList',
  component: CommentList,
  tags: ['autodocs'],
  argTypes: {
    onReplyClick: { action: 'reply' },
    onLikeClick: { action: 'like' },
    onDislikeClick: { action: 'dislike' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleComments = [
  {
    id: '1',
    author: 'newr****',
    timestamp: '6시간 전',
    content:
      '자유무역이란 말이 있지만 실제로는 미국이 주도하는 일방적인 무역이었습니다. 달러의 기축통화 지위를 이용해 미국은 세계 경제를 지배해왔고, 1990년대 미국과 일본의 GDP를 비교해보면 일본이 미국의 70% 수준이었는데, 지금은 일본이 미국의 20% 수준으로 떨어졌습니다. 이런 일방적인 시각을 가진 분들이 많으시네요.',
    likes: 1,
    dislikes: 1,
  },
  {
    id: '2',
    author: 'jhcg****',
    timestamp: '6시간 전',
    content:
      "미국, 이스라엘은 새롭게 등장하는 세계의 '악의축' 네탄야후, 트럼프는 사라져야한다",
    likes: 0,
    dislikes: 0,
  },
];

const manyComments = [
  ...sampleComments,
  {
    id: '3',
    author: 'user****',
    timestamp: '2시간 전',
    content:
      '매우 긴 댓글 내용입니다. 이 댓글은 여러 줄에 걸쳐서 표시되어야 하며, 텍스트 래핑과 오버플로우 처리가 제대로 되어야 합니다.',
    likes: 5,
    dislikes: 2,
  },
  {
    id: '4',
    author: 'popular****',
    timestamp: '1일 전',
    content: '이 댓글은 많은 사람들이 좋아요를 눌렀습니다.',
    likes: 127,
    dislikes: 8,
  },
  {
    id: '5',
    author: 'recent****',
    timestamp: '방금 전',
    content: '방금 작성된 댓글입니다.',
    likes: 0,
    dislikes: 0,
  },
];

export const Default: Story = {
  args: {
    comments: sampleComments,
  },
};

export const EmptyState: Story = {
  args: {
    comments: [],
  },
};

export const ManyComments: Story = {
  args: {
    comments: manyComments,
  },
};

export const WithActions: Story = {
  args: {
    comments: sampleComments,
    onReplyClick: commentId => console.log('Reply to comment:', commentId),
    onLikeClick: commentId => console.log('Like comment:', commentId),
    onDislikeClick: commentId => console.log('Dislike comment:', commentId),
  },
};
