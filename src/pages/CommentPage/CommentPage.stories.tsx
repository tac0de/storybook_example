import type { Meta, StoryObj } from '@storybook/react-vite';
import { CommentPage, type Comment } from './CommentPage';

const meta: Meta<typeof CommentPage> = {
  title: 'Pages/CommentPage',
  component: CommentPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A complete comment system page built entirely with atomic components, featuring beautiful modern styling and full interactivity.',
      },
    },
  },
  argTypes: {
    comments: {
      description: 'Array of comment objects to display',
      control: false,
    },
    sortBy: {
      description: 'Current sort order for comments',
      control: 'select',
      options: ['newest', 'oldest', 'mostLiked', 'mostReplied'],
    },
    loading: {
      description: 'Whether the page is in loading state',
      control: 'boolean',
    },
    title: {
      description: 'Page title displayed in the header',
      control: 'text',
    },
    subtitle: {
      description: 'Page subtitle displayed in the header',
      control: 'text',
    },
    canComment: {
      description: 'Whether users can submit new comments',
      control: 'boolean',
    },
    maxComments: {
      description: 'Maximum number of comments allowed',
      control: 'number',
    },
    className: {
      description: 'Additional CSS class names',
      control: false,
    },
    onSortChange: {
      description: 'Callback when sort order changes',
      control: false,
    },
    onSubmitComment: {
      description: 'Callback when a new comment is submitted',
      control: false,
    },
    onSubmitReply: {
      description: 'Callback when a reply is submitted',
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
  },
  args: {
    title: '댓글',
    subtitle: '이 글에 대한 의견을 남겨주세요',
    canComment: true,
    maxComments: 100,
    sortBy: 'newest',
    loading: false,
  },
};

export default meta;
type Story = StoryObj<typeof CommentPage>;

// Sample data with beautiful, realistic content
const sampleComments: Comment[] = [
  {
    id: '1',
    content:
      '정말 유익한 글이네요! 특히 마지막 부분에서 제시한 해결책이 인상적이었습니다. 이런 내용을 더 자주 볼 수 있었으면 좋겠어요. 👍',
    authorName: '김민수',
    authorAvatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    timestamp: '2시간 전',
    authorStatus: 'online',
    likeCount: 24,
    isLiked: true,
    replyCount: 3,
    canEdit: true,
    canDelete: true,
    replies: [
      {
        id: '1-1',
        content: '저도 같은 생각이에요! 정말 도움이 되는 내용이었습니다.',
        authorName: '이지은',
        authorAvatar:
          'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        timestamp: '1시간 전',
        authorStatus: 'online',
        likeCount: 8,
        isLiked: false,
        replyCount: 0,
        parentId: '1',
      },
      {
        id: '1-2',
        content:
          '완전 동감합니다! 특히 실무에서 바로 적용할 수 있는 팁들이 많았어요.',
        authorName: '박준호',
        authorAvatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        timestamp: '30분 전',
        authorStatus: 'away',
        likeCount: 5,
        isLiked: true,
        replyCount: 0,
        parentId: '1',
      },
    ],
  },
  {
    id: '2',
    content:
      '좋은 글 감사합니다! 혹시 이 부분에 대해 더 자세히 설명해주실 수 있나요? 제가 이해하기 어려운 부분이 있어서요.',
    authorName: '최수진',
    authorAvatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    timestamp: '3시간 전',
    authorStatus: 'offline',
    likeCount: 12,
    isLiked: false,
    replyCount: 1,
    canEdit: false,
    canDelete: false,
    replies: [
      {
        id: '2-1',
        content:
          '네, 물론이죠! 어떤 부분이 궁금하신지 말씀해 주시면 더 자세히 설명드릴게요.',
        authorName: '김민수',
        authorAvatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        timestamp: '2시간 전',
        authorStatus: 'online',
        likeCount: 3,
        isLiked: false,
        replyCount: 0,
        parentId: '2',
      },
    ],
  },
  {
    id: '3',
    content:
      '와, 이렇게 정리해주시니 정말 이해하기 쉬워요! 특히 예시 코드가 도움이 많이 되었습니다. 앞으로도 이런 좋은 글 부탁드려요! 🚀',
    authorName: '정현우',
    authorAvatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    timestamp: '5시간 전',
    authorStatus: 'busy',
    likeCount: 31,
    isLiked: false,
    replyCount: 0,
    canEdit: true,
    canDelete: true,
  },
  {
    id: '4',
    content:
      '저는 조금 다른 관점에서 보는데, 이 부분이 좀 더 개선될 수 있을 것 같아요. 하지만 전체적으로는 정말 좋은 내용이었습니다!',
    authorName: '한소영',
    authorAvatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    timestamp: '6시간 전',
    authorStatus: 'online',
    likeCount: 18,
    isLiked: true,
    replyCount: 2,
    canEdit: false,
    canDelete: false,
    replies: [
      {
        id: '4-1',
        content:
          '어떤 부분을 말씀하시는 건가요? 구체적으로 설명해 주시면 더 좋을 것 같아요.',
        authorName: '김민수',
        authorAvatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        timestamp: '5시간 전',
        authorStatus: 'online',
        likeCount: 7,
        isLiked: false,
        replyCount: 0,
        parentId: '4',
      },
      {
        id: '4-2',
        content: '저도 궁금하네요! 어떤 개선점을 생각하고 계신지 듣고 싶어요.',
        authorName: '이지은',
        authorAvatar:
          'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        timestamp: '4시간 전',
        authorStatus: 'online',
        likeCount: 4,
        isLiked: false,
        replyCount: 0,
        parentId: '4',
      },
    ],
  },
];

export const Default: Story = {
  render: args => (
    <CommentPage
      {...args}
      comments={sampleComments}
      onSubmitComment={content => {
        console.log('새 댓글 작성:', content);
        alert(`댓글이 작성되었습니다: ${content}`);
      }}
      onSubmitReply={(parentId, content) => {
        console.log('답글 작성:', { parentId, content });
        alert(`답글이 작성되었습니다: ${content}`);
      }}
      onLikeClick={commentId => {
        console.log('좋아요 클릭:', commentId);
        alert(`댓글 ${commentId}에 좋아요를 눌렀습니다!`);
      }}
      onReplyClick={commentId => {
        console.log('답글 버튼 클릭:', commentId);
        alert(`댓글 ${commentId}에 답글을 작성합니다.`);
      }}
      onReportClick={commentId => {
        console.log('신고 클릭:', commentId);
        alert(`댓글 ${commentId}를 신고합니다.`);
      }}
      onEditClick={commentId => {
        console.log('수정 클릭:', commentId);
        alert(`댓글 ${commentId}를 수정합니다.`);
      }}
      onDeleteClick={commentId => {
        console.log('삭제 클릭:', commentId);
        if (confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
          alert(`댓글 ${commentId}가 삭제되었습니다.`);
        }
      }}
      onAuthorClick={authorName => {
        console.log('작성자 클릭:', authorName);
        alert(`${authorName}의 프로필을 확인합니다.`);
      }}
      onSortChange={sortBy => {
        console.log('정렬 변경:', sortBy);
        alert(`댓글이 ${sortBy}순으로 정렬되었습니다.`);
      }}
    />
  ),
};

export const Loading: Story = {
  render: args => (
    <CommentPage
      {...args}
      comments={[]}
      loading={true}
      title='댓글 로딩 중'
      subtitle='댓글을 불러오는 중입니다...'
    />
  ),
};

export const Empty: Story = {
  render: args => (
    <CommentPage
      {...args}
      comments={[]}
      title='첫 번째 댓글을 남겨보세요!'
      subtitle='아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!'
    />
  ),
};

export const ReadOnly: Story = {
  render: args => (
    <CommentPage
      {...args}
      comments={sampleComments.slice(0, 2)}
      canComment={false}
      title='댓글 (읽기 전용)'
      subtitle='댓글 작성이 비활성화된 상태입니다'
    />
  ),
};
