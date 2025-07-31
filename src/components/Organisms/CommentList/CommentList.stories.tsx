import type { Meta, StoryObj } from '@storybook/react-vite';
import type { Comment } from './CommentList';
import { CommentList } from './CommentList';

const meta: Meta<typeof CommentList> = {
  title: 'Organisms/CommentList',
  component: CommentList,
  tags: ['autodocs'],
  argTypes: {
    sortBy: {
      control: 'select',
      options: ['newest', 'oldest', 'mostLiked', 'mostReplied'],
    },
    loading: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleComments: Comment[] = [
  {
    id: '1',
    content:
      '정말 좋은 글이네요! 공감합니다. 이런 내용들이 더 많이 공유되면 좋겠어요.',
    authorName: '김철수',
    authorAvatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    timestamp: '2시간 전',
    likeCount: 5,
    isLiked: false,
    replyCount: 2,
  },
  {
    id: '2',
    content: '완전 동감합니다! 저도 같은 생각이었어요.',
    authorName: '이영희',
    authorAvatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    timestamp: '1시간 전',
    authorStatus: 'online',
    likeCount: 12,
    isLiked: true,
    replyCount: 0,
  },
  {
    id: '3',
    content: '이 댓글은 수정하거나 삭제할 수 있습니다.',
    authorName: '박민수',
    authorAvatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    timestamp: '30분 전',
    authorStatus: 'away',
    likeCount: 3,
    isLiked: false,
    replyCount: 1,
    canEdit: true,
    canDelete: true,
  },
  {
    id: '4',
    content:
      '이것은 매우 긴 댓글 내용입니다. 여러 줄에 걸쳐서 작성된 댓글로, 댓글 컴포넌트가 긴 텍스트를 어떻게 처리하는지 보여줍니다.',
    authorName: '최지영',
    authorAvatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    timestamp: '1일 전',
    authorStatus: 'busy',
    likeCount: 8,
    isLiked: true,
    replyCount: 5,
  },
  {
    id: '5',
    content: '아바타가 없는 사용자의 댓글입니다.',
    authorName: '익명 사용자',
    timestamp: '3일 전',
    likeCount: 1,
    isLiked: false,
    replyCount: 0,
  },
];

export const Default: Story = {
  render: () => (
    <CommentList
      comments={sampleComments}
      onSortChange={sortBy => console.log('Sort changed to:', sortBy)}
      onLikeClick={commentId => console.log('Like clicked:', commentId)}
      onReplyClick={commentId => console.log('Reply clicked:', commentId)}
      onReportClick={commentId => console.log('Report clicked:', commentId)}
      onEditClick={commentId => console.log('Edit clicked:', commentId)}
      onDeleteClick={commentId => console.log('Delete clicked:', commentId)}
      onAuthorClick={commentId => console.log('Author clicked:', commentId)}
    />
  ),
};

export const Loading: Story = {
  render: () => <CommentList comments={[]} loading={true} />,
};

export const Empty: Story = {
  render: () => (
    <CommentList
      comments={[]}
      emptyMessage='아직 댓글이 없습니다. 첫 번째 댓글을 남겨보세요!'
    />
  ),
};

export const WithoutSort: Story = {
  render: () => (
    <CommentList
      comments={sampleComments.slice(0, 3)}
      onLikeClick={commentId => console.log('Like clicked:', commentId)}
      onReplyClick={commentId => console.log('Reply clicked:', commentId)}
    />
  ),
};

export const SingleComment: Story = {
  render: () => (
    <CommentList
      comments={[sampleComments[0]]}
      onSortChange={sortBy => console.log('Sort changed to:', sortBy)}
      onLikeClick={commentId => console.log('Like clicked:', commentId)}
      onReplyClick={commentId => console.log('Reply clicked:', commentId)}
    />
  ),
};

export const ManyComments: Story = {
  render: () => {
    const manyComments = Array.from({ length: 10 }, (_, index) => ({
      ...sampleComments[index % sampleComments.length],
      id: `comment-${index + 1}`,
      content: `댓글 ${index + 1}: ${sampleComments[index % sampleComments.length].content}`,
      likeCount: Math.floor(Math.random() * 20),
      replyCount: Math.floor(Math.random() * 5),
    }));

    return (
      <CommentList
        comments={manyComments}
        onSortChange={sortBy => console.log('Sort changed to:', sortBy)}
        onLikeClick={commentId => console.log('Like clicked:', commentId)}
        onReplyClick={commentId => console.log('Reply clicked:', commentId)}
      />
    );
  },
};
