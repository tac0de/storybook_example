import type { Meta, StoryObj } from '@storybook/react-vite';
import { CommentList, type Comment } from './CommentList';

const meta: Meta<typeof CommentList> = {
  title: 'Organisms/CommentList',
  component: CommentList,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A comment list organism that displays multiple comments with sorting functionality and loading/empty states.',
      },
    },
  },
  argTypes: {
    comments: {
      description: 'Array of comment objects',
      control: false,
    },
    sortBy: {
      description: 'Current sort method',
      control: 'select',
      options: ['newest', 'oldest', 'mostLiked', 'mostReplied'],
    },
    loading: {
      description: 'Whether the list is in loading state',
      control: 'boolean',
    },
    onSortChange: {
      description: 'Callback when sort method changes',
      control: false,
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
    sortBy: 'newest',
    loading: false,
  },
};

export default meta;
type Story = StoryObj<typeof CommentList>;

const sampleComments: Comment[] = [
  {
    id: '1',
    content:
      '정말 유용한 정보네요! 감사합니다. 이 내용이 많은 도움이 될 것 같아요.',
    author: {
      name: '김민수',
      avatar:
        'https://ui-avatars.com/api/?name=김민수&background=007bff&color=ffffff&size=40',
      isVerified: true,
    },
    createdAt: '2024-01-15T10:30:00Z',
    likes: 24,
    replies: 3,
    isLiked: false,
    isAuthor: false,
  },
  {
    id: '2',
    content:
      '이런 내용을 찾고 있었는데 정말 감사합니다. 더 자세한 설명이 있었으면 좋겠어요.',
    author: {
      name: '박철수',
      avatar:
        'https://ui-avatars.com/api/?name=박철수&background=28a745&color=ffffff&size=40',
      isVerified: false,
    },
    createdAt: '2024-01-15T11:15:00Z',
    likes: 12,
    replies: 1,
    isLiked: true,
    isAuthor: true,
  },
  {
    id: '3',
    content: '좋은 정보 감사합니다. 앞으로도 이런 유용한 내용 많이 올려주세요!',
    author: {
      name: '이영희',
      avatar:
        'https://ui-avatars.com/api/?name=이영희&background=dc3545&color=ffffff&size=40',
      isVerified: true,
    },
    createdAt: '2024-01-15T11:45:00Z',
    likes: 8,
    replies: 0,
    isLiked: false,
    isAuthor: false,
  },
];

export const Default: Story = {
  args: {
    comments: sampleComments,
  },
  render: args => (
    <CommentList
      {...args}
      onSortChange={sortBy => {
        console.log('Sort changed:', sortBy);
        alert(`정렬이 ${sortBy}로 변경되었습니다.`);
      }}
      onLikeClick={commentId => {
        console.log('Like clicked for comment:', commentId);
        alert('좋아요를 눌렀습니다!');
      }}
      onReplyClick={commentId => {
        console.log('Reply clicked for comment:', commentId);
        alert('답글 버튼을 눌렀습니다!');
      }}
      onReportClick={commentId => {
        console.log('Report clicked for comment:', commentId);
        alert('신고 버튼을 눌렀습니다!');
      }}
      onEditClick={commentId => {
        console.log('Edit clicked for comment:', commentId);
        alert('수정 버튼을 눌렀습니다!');
      }}
      onDeleteClick={commentId => {
        console.log('Delete clicked for comment:', commentId);
        if (confirm('정말로 삭제하시겠습니까?')) {
          alert('삭제되었습니다!');
        }
      }}
      onAuthorClick={authorName => {
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

export const Loading: Story = {
  args: {
    comments: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    comments: [],
    loading: false,
  },
};

export const MostLiked: Story = {
  args: {
    comments: sampleComments,
    sortBy: 'mostLiked',
  },
};

export const MostReplied: Story = {
  args: {
    comments: sampleComments,
    sortBy: 'mostReplied',
  },
};

export const Oldest: Story = {
  args: {
    comments: sampleComments,
    sortBy: 'oldest',
  },
};

export const NoSorting: Story = {
  args: {
    comments: sampleComments,
    onSortChange: undefined,
  },
};

export const ManyComments: Story = {
  args: {
    comments: [
      ...sampleComments,
      {
        id: '4',
        content:
          '추가 댓글입니다. 더 많은 댓글이 있을 때의 스크롤 동작을 확인해보세요.',
        author: {
          name: '김철수',
          avatar:
            'https://ui-avatars.com/api/?name=김철수&background=6c757d&color=ffffff&size=40',
          isVerified: false,
        },
        createdAt: '2024-01-15T12:00:00Z',
        likes: 3,
        replies: 0,
        isLiked: false,
        isAuthor: false,
      },
      {
        id: '5',
        content: '또 다른 댓글입니다. 긴 목록에서의 성능을 테스트해보세요.',
        author: {
          name: '박영희',
          avatar:
            'https://ui-avatars.com/api/?name=박영희&background=fd7e14&color=ffffff&size=40',
          isVerified: true,
        },
        createdAt: '2024-01-15T12:05:00Z',
        likes: 7,
        replies: 2,
        isLiked: true,
        isAuthor: false,
      },
    ],
  },
};
