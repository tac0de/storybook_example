import type { Meta, StoryObj } from '@storybook/react-vite';
import { CommentItem, type Comment } from './CommentItem';

const meta: Meta<typeof CommentItem> = {
  title: 'Organisms/CommentItem',
  component: CommentItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A comment item organism that combines UserHeader, ActionButtons, and TextInputForm to display a complete comment with replies.',
      },
    },
  },
  argTypes: {
    comment: {
      description: 'Comment data object',
      control: false,
    },
    depth: {
      description: 'Nesting depth for reply comments',
      control: 'number',
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
    onAuthorClick: {
      description: 'Callback when author name is clicked',
      control: false,
    },
    onSubmitReply: {
      description: 'Callback when a reply is submitted',
      control: false,
    },
    className: {
      description: 'Additional CSS class names',
      control: false,
    },
  },
  args: {
    depth: 0,
  },
};

export default meta;
type Story = StoryObj<typeof CommentItem>;

const sampleComment: Comment = {
  id: '1',
  content: '정말 유용한 정보네요! 감사합니다. 이 내용이 많은 도움이 될 것 같아요.',
  author: {
    name: '김민수',
    avatar: 'https://ui-avatars.com/api/?name=김민수&background=007bff&color=ffffff&size=40',
    isVerified: true,
  },
  createdAt: '2024-01-15T10:30:00Z',
  likes: 24,
  replies: 3,
  isLiked: false,
  isAuthor: false,
};

export const Default: Story = {
  args: {
    comment: sampleComment,
  },
  render: (args) => (
    <CommentItem
      {...args}
      onLikeClick={(commentId) => {
        console.log('Like clicked for comment:', commentId);
        alert('좋아요를 눌렀습니다!');
      }}
      onReplyClick={(commentId) => {
        console.log('Reply clicked for comment:', commentId);
        alert('답글 버튼을 눌렀습니다!');
      }}
      onReportClick={(commentId) => {
        console.log('Report clicked for comment:', commentId);
        alert('신고 버튼을 눌렀습니다!');
      }}
      onEditClick={(commentId) => {
        console.log('Edit clicked for comment:', commentId);
        alert('수정 버튼을 눌렀습니다!');
      }}
      onDeleteClick={(commentId) => {
        console.log('Delete clicked for comment:', commentId);
        if (confirm('정말로 삭제하시겠습니까?')) {
          alert('삭제되었습니다!');
        }
      }}
      onAuthorClick={(authorName) => {
        console.log('Author clicked:', authorName);
        alert(`${authorName}의 프로필을 확인합니다.`);
      }}
      onSubmitReply={(parentId, content) => {
        console.log('Reply submitted:', { parentId, content });
        alert(`답글이 작성되었습니다: ${content}`);
      }}
    />
  ),
};

export const WithEditPermission: Story = {
  args: {
    comment: {
      ...sampleComment,
      isAuthor: true,
    },
  },
};

export const WithDeletePermission: Story = {
  args: {
    comment: {
      ...sampleComment,
      isAuthor: true,
    },
  },
};

export const LikedComment: Story = {
  args: {
    comment: {
      ...sampleComment,
      isLiked: true,
    },
  },
};

export const HighEngagement: Story = {
  args: {
    comment: {
      ...sampleComment,
      likes: 1234,
      replies: 56,
    },
  },
};

export const NoReplies: Story = {
  args: {
    comment: {
      ...sampleComment,
      replies: 0,
    },
  },
};

export const NestedReply: Story = {
  args: {
    comment: {
      ...sampleComment,
      id: '1-1',
    },
    depth: 1,
  },
};

export const DeepNested: Story = {
  args: {
    comment: {
      ...sampleComment,
      id: '1-1-1',
    },
    depth: 2,
  },
};

export const LongContent: Story = {
  args: {
    comment: {
      ...sampleComment,
      content: '이것은 매우 긴 댓글 내용입니다. 여러 줄에 걸쳐서 작성된 긴 텍스트를 보여주기 위한 예시입니다. 실제로는 이런 긴 댓글이 있을 수 있고, 컴포넌트가 이를 적절히 처리해야 합니다. 줄바꿈과 텍스트 래핑이 제대로 작동하는지 확인해보세요.',
    },
  },
};

export const NoAvatar: Story = {
  args: {
    comment: {
      ...sampleComment,
      author: {
        ...sampleComment.author,
        avatar: '',
      },
    },
  },
}; 