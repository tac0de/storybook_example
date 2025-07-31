import type { Meta, StoryObj } from '@storybook/react-vite';
import { CommentActions } from './CommentActions';

const meta: Meta<typeof CommentActions> = {
  title: 'Molecules/CommentActions',
  component: CommentActions,
  tags: ['autodocs'],
  argTypes: {
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
  render: () => <CommentActions likeCount={5} isLiked={false} replyCount={2} />,
};

export const Liked: Story = {
  render: () => <CommentActions likeCount={12} isLiked={true} replyCount={3} />,
};

export const WithEditDelete: Story = {
  render: () => (
    <CommentActions
      likeCount={8}
      isLiked={false}
      replyCount={1}
      canEdit={true}
      canDelete={true}
    />
  ),
};

export const AllActions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <CommentActions
        likeCount={15}
        isLiked={true}
        replyCount={5}
        canEdit={true}
        canDelete={true}
      />
      <CommentActions
        likeCount={0}
        isLiked={false}
        replyCount={0}
        canEdit={false}
        canDelete={false}
      />
      <CommentActions
        likeCount={3}
        isLiked={false}
        replyCount={1}
        canEdit={true}
        canDelete={false}
      />
    </div>
  ),
};

export const HighCounts: Story = {
  render: () => (
    <CommentActions
      likeCount={1234}
      isLiked={true}
      replyCount={89}
      canEdit={true}
      canDelete={true}
    />
  ),
};
