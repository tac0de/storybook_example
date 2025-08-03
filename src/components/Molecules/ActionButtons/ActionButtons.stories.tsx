import type { Meta, StoryObj } from '@storybook/react-vite';
import { ActionButtons } from './ActionButtons';

const meta: Meta<typeof ActionButtons> = {
  title: 'Molecules/ActionButtons',
  component: ActionButtons,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A reusable action buttons component that displays like, reply, report, edit, and delete actions.',
      },
    },
  },
  argTypes: {
    likeCount: {
      description: 'Number of likes',
      control: 'number',
    },
    isLiked: {
      description: 'Whether the current user has liked this content',
      control: 'boolean',
    },
    replyCount: {
      description: 'Number of replies',
      control: 'number',
    },
    canEdit: {
      description: 'Whether the user can edit this content',
      control: 'boolean',
    },
    canDelete: {
      description: 'Whether the user can delete this content',
      control: 'boolean',
    },
    onLikeClick: {
      description: 'Callback when like button is clicked',
      control: false,
    },
    onReplyClick: {
      description: 'Callback when reply button is clicked',
      control: false,
    },
    onReportClick: {
      description: 'Callback when report button is clicked',
      control: false,
    },
    onEditClick: {
      description: 'Callback when edit button is clicked',
      control: false,
    },
    onDeleteClick: {
      description: 'Callback when delete button is clicked',
      control: false,
    },
    className: {
      description: 'Additional CSS class names',
      control: false,
    },
  },
  args: {
    likeCount: 24,
    isLiked: false,
    replyCount: 3,
    canEdit: false,
    canDelete: false,
  },
};

export default meta;
type Story = StoryObj<typeof ActionButtons>;

export const Default: Story = {
  render: (args) => (
    <ActionButtons
      {...args}
      onLikeClick={() => {
        console.log('Like clicked');
        alert('좋아요를 눌렀습니다!');
      }}
      onReplyClick={() => {
        console.log('Reply clicked');
        alert('답글 버튼을 눌렀습니다!');
      }}
      onReportClick={() => {
        console.log('Report clicked');
        alert('신고 버튼을 눌렀습니다!');
      }}
      onEditClick={() => {
        console.log('Edit clicked');
        alert('수정 버튼을 눌렀습니다!');
      }}
      onDeleteClick={() => {
        console.log('Delete clicked');
        if (confirm('정말로 삭제하시겠습니까?')) {
          alert('삭제되었습니다!');
        }
      }}
    />
  ),
};

export const Liked: Story = {
  args: {
    isLiked: true,
  },
};

export const WithEditPermission: Story = {
  args: {
    canEdit: true,
  },
};

export const WithDeletePermission: Story = {
  args: {
    canDelete: true,
  },
};

export const FullPermissions: Story = {
  args: {
    canEdit: true,
    canDelete: true,
  },
};

export const HighCounts: Story = {
  args: {
    likeCount: 1234,
    replyCount: 56,
  },
};

export const ZeroCounts: Story = {
  args: {
    likeCount: 0,
    replyCount: 0,
  },
}; 