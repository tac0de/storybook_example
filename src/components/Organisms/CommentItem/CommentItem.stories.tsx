import type { Meta, StoryObj } from '@storybook/react-vite';
import { CommentItem } from './CommentItem';

const meta: Meta<typeof CommentItem> = {
  title: 'Organisms/CommentItem',
  component: CommentItem,
  tags: ['autodocs'],
  argTypes: {
    authorStatus: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy'],
    },
    isLiked: {
      control: 'boolean',
    },
    canEdit: {
      control: 'boolean',
    },
    canDelete: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <CommentItem
      id='1'
      content='정말 좋은 글이네요! 공감합니다. 이런 내용들이 더 많이 공유되면 좋겠어요.'
      authorName='김철수'
      authorAvatar='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      timestamp='2시간 전'
      likeCount={5}
      isLiked={false}
      replyCount={2}
    />
  ),
};

export const Liked: Story = {
  render: () => (
    <CommentItem
      id='2'
      content='완전 동감합니다! 저도 같은 생각이었어요.'
      authorName='이영희'
      authorAvatar='https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      timestamp='1시간 전'
      authorStatus='online'
      likeCount={12}
      isLiked={true}
      replyCount={0}
    />
  ),
};

export const WithEditDelete: Story = {
  render: () => (
    <CommentItem
      id='3'
      content='이 댓글은 수정하거나 삭제할 수 있습니다.'
      authorName='박민수'
      authorAvatar='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      timestamp='30분 전'
      authorStatus='away'
      likeCount={3}
      isLiked={false}
      replyCount={1}
      canEdit={true}
      canDelete={true}
    />
  ),
};

export const LongContent: Story = {
  render: () => (
    <CommentItem
      id='4'
      content='이것은 매우 긴 댓글 내용입니다. 여러 줄에 걸쳐서 작성된 댓글로, 댓글 컴포넌트가 긴 텍스트를 어떻게 처리하는지 보여줍니다. 긴 텍스트의 경우 자동으로 줄바꿈이 되고, 적절한 여백과 함께 표시됩니다. 또한 링크나 코드 블록, 인용구 등 다양한 마크업도 지원할 수 있습니다.'
      authorName='최지영'
      authorAvatar='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
      timestamp='1일 전'
      authorStatus='busy'
      likeCount={8}
      isLiked={true}
      replyCount={5}
    />
  ),
};

export const WithoutAvatar: Story = {
  render: () => (
    <CommentItem
      id='5'
      content='아바타가 없는 사용자의 댓글입니다.'
      authorName='익명 사용자'
      timestamp='3일 전'
      likeCount={1}
      isLiked={false}
      replyCount={0}
    />
  ),
};

export const MultipleComments: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <CommentItem
        id='6'
        content='첫 번째 댓글입니다.'
        authorName='사용자1'
        authorAvatar='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        timestamp='1시간 전'
        likeCount={3}
        isLiked={true}
        replyCount={1}
      />
      <CommentItem
        id='7'
        content='두 번째 댓글입니다.'
        authorName='사용자2'
        authorAvatar='https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
        timestamp='30분 전'
        authorStatus='online'
        likeCount={7}
        isLiked={false}
        replyCount={2}
        canEdit={true}
      />
      <CommentItem
        id='8'
        content='세 번째 댓글입니다.'
        authorName='사용자3'
        timestamp='10분 전'
        likeCount={0}
        isLiked={false}
        replyCount={0}
      />
    </div>
  ),
};
