import { CommentItem } from './CommentItem';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof CommentItem> = {
  title: 'Molecules/CommentItem',
  component: CommentItem,
  tags: ['autodocs'],
  argTypes: {
    author: { control: 'text', description: '작성자 이름' },
    authorAvatar: { control: 'text', description: '작성자 아바타 URL' },
    timestamp: { control: 'text', description: '작성 시간' },
    content: { control: 'text', description: '댓글 내용' },
    likes: { control: 'number', description: '좋아요 수' },
    dislikes: { control: 'number', description: '싫어요 수' },
    replies: { control: 'number', description: '답글 수' },
    editable: { control: 'boolean', description: '편집 가능 여부' },
    deletable: { control: 'boolean', description: '삭제 가능 여부' },
    onReplyClick: { action: 'reply clicked' },
    onLikeClick: { action: 'like clicked' },
    onDislikeClick: { action: 'dislike clicked' },
    onEditClick: { action: 'edit clicked' },
    onDeleteClick: { action: 'delete clicked' },
  },
  parameters: {
    interactions: {
      disable: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    author: '익명 사용자',
    timestamp: '2시간 전',
    content: '정말 좋은 글이네요! 공감합니다.',
    likes: 5,
    dislikes: 1,
  },
};

export const WithAvatar: Story = {
  args: {
    author: 'John Doe',
    authorAvatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    timestamp: '1시간 전',
    content: '이 글을 읽고 많은 도움이 되었습니다. 감사합니다!',
    likes: 12,
    dislikes: 0,
  },
};

export const WithReplies: Story = {
  args: {
    author: 'Jane Smith',
    authorAvatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    timestamp: '30분 전',
    content: '저도 같은 생각입니다. 추가로 말씀드리자면...',
    likes: 8,
    dislikes: 2,
    replies: 3,
  },
};

export const Editable: Story = {
  args: {
    author: '내 댓글',
    authorAvatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    timestamp: '5분 전',
    content: '이 댓글은 편집할 수 있습니다.',
    likes: 2,
    dislikes: 0,
    editable: true,
    deletable: true,
  },
};

export const LongContent: Story = {
  args: {
    author: '긴 댓글 작성자',
    timestamp: '1일 전',
    content:
      '이것은 매우 긴 댓글 내용입니다. 여러 줄에 걸쳐서 작성된 댓글로, 사용자가 상세한 의견을 표현할 때 사용됩니다. 이런 긴 댓글은 화면에서 어떻게 표시되는지 확인하기 위한 예시입니다.',
    likes: 15,
    dislikes: 3,
    replies: 7,
  },
};

export const HighEngagement: Story = {
  args: {
    author: '인기 댓글',
    authorAvatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    timestamp: '3일 전',
    content: '이 댓글은 많은 사람들이 좋아하고 있습니다!',
    likes: 156,
    dislikes: 12,
    replies: 23,
  },
};

export const NegativeReaction: Story = {
  args: {
    author: '논란의 댓글',
    timestamp: '2일 전',
    content: '이 댓글은 많은 사람들이 싫어합니다.',
    likes: 3,
    dislikes: 89,
    replies: 15,
  },
};

export const AllFeatures: Story = {
  args: {
    author: '모든 기능 포함',
    authorAvatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    timestamp: '방금 전',
    content:
      '이 댓글은 모든 기능이 활성화되어 있습니다. 편집과 삭제가 가능하며, 답글도 달 수 있습니다.',
    likes: 25,
    dislikes: 5,
    replies: 8,
    editable: true,
    deletable: true,
  },
};

export const MultipleComments: Story = {
  render: () => (
    <div className='space-y-0'>
      <CommentItem
        author='첫 번째 댓글'
        authorAvatar='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        timestamp='1시간 전'
        content='첫 번째 댓글입니다.'
        likes={5}
        dislikes={1}
        replies={2}
      />
      <CommentItem
        author='두 번째 댓글'
        authorAvatar='https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
        timestamp='30분 전'
        content='두 번째 댓글입니다. 이 댓글은 편집과 삭제가 가능합니다.'
        likes={12}
        dislikes={0}
        editable={true}
        deletable={true}
      />
      <CommentItem
        author='세 번째 댓글'
        timestamp='10분 전'
        content='세 번째 댓글입니다. 아바타가 없는 경우입니다.'
        likes={3}
        dislikes={2}
      />
    </div>
  ),
};
