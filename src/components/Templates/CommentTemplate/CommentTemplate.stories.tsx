import { CommentTemplate } from './CommentTemplate';
import { CommentList } from '../../Organisms/CommentList';
import { CommentInput } from '../../Molecules/CommentInput';
import type { Meta, StoryObj } from '@storybook/react-vite';

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
];

const meta: Meta<typeof CommentTemplate> = {
  title: 'Templates/CommentTemplate',
  component: CommentTemplate,
  tags: ['autodocs'],
  argTypes: {
    fullWidth: { control: 'boolean', description: '전체 너비 사용 여부' },
    minHeight: { control: 'text', description: '최소 높이' },
    variant: {
      control: 'select',
      options: ['default', 'minimal', 'elevated'],
      description: '배경 스타일',
    },
    className: { control: 'text', description: '추가 클래스' },
  },
  parameters: {
    interactions: {
      disable: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 헬퍼 컴포넌트들
const HeaderComponent = () => (
  <div className='flex items-center justify-between'>
    <div className='flex items-center gap-2'>
      <h2 className='text-xl font-bold text-gray-900'>댓글 2개</h2>
      <button
        className='p-1 rounded-full hover:bg-gray-100 transition-colors'
        aria-label='새로고침'
      >
        <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
          <path d='M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z' />
        </svg>
      </button>
    </div>
    <button
      className='p-2 rounded-full hover:bg-gray-200 transition-colors'
      aria-label='닫기'
    >
      <svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
        <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
      </svg>
    </button>
  </div>
);

const SubscriptionPromptComponent = () => (
  <div className='p-4 border border-gray-200 rounded-lg bg-white'>
    <p className='text-sm text-gray-700 mb-3'>
      더중앙플러스 구독하고 자유롭게 의견을 남겨주세요.
    </p>
    <div className='flex items-center gap-4'>
      <button className='flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors'>
        <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
          <path d='M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z' />
        </svg>
        지금 바로 시작하기
      </button>
      <button className='text-sm text-gray-600 hover:text-gray-800 underline'>
        이미 더중앙플러스 구독자라면? 로그인
      </button>
    </div>
  </div>
);

const NavigationComponent = () => (
  <div className='flex items-center justify-between'>
    <button className='text-sm text-gray-600 hover:text-gray-800 underline'>
      내 댓글
    </button>
    <div className='flex items-center gap-2'>
      <span className='text-sm text-gray-600'>PICK ?</span>
      <select className='text-sm border border-gray-300 rounded px-2 py-1 bg-white'>
        <option value='latest'>최신순</option>
        <option value='popular'>인기순</option>
      </select>
    </div>
  </div>
);

const PaginationComponent = () => (
  <div className='flex items-center justify-between'>
    <div className='flex items-center gap-2'>
      <span className='text-sm text-gray-600'>페이지 1 / 3</span>
    </div>
    <div className='flex items-center gap-2'>
      <button className='px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50'>
        이전
      </button>
      <button className='px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50'>
        다음
      </button>
      <button className='px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700'>
        더 보기
      </button>
    </div>
  </div>
);

const CommentInputComponent = () => (
  <CommentInput
    value=''
    onChange={() => {}}
    onSubmit={() => {}}
    placeholder='댓글을 입력하세요'
    userName='John Doe'
    userAvatar='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  />
);

export const Default: Story = {
  args: {
    header: <HeaderComponent />,
    topSection: <SubscriptionPromptComponent />,
    navigation: <NavigationComponent />,
    children: (
      <>
        <CommentInputComponent />
        <CommentList comments={sampleComments} />
      </>
    ),
    bottomSection: <PaginationComponent />,
  },
};

export const Minimal: Story = {
  args: {
    variant: 'minimal',
    header: <HeaderComponent />,
    children: <CommentList comments={sampleComments} />,
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    header: <HeaderComponent />,
    navigation: <NavigationComponent />,
    children: <CommentList comments={sampleComments} />,
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    header: <HeaderComponent />,
    topSection: <SubscriptionPromptComponent />,
    navigation: <NavigationComponent />,
    children: <CommentList comments={sampleComments} />,
  },
};

export const WithoutHeader: Story = {
  args: {
    topSection: <SubscriptionPromptComponent />,
    navigation: <NavigationComponent />,
    children: <CommentList comments={sampleComments} />,
  },
};

export const WithoutNavigation: Story = {
  args: {
    header: <HeaderComponent />,
    topSection: <SubscriptionPromptComponent />,
    children: <CommentList comments={sampleComments} />,
  },
};

export const WithCommentInput: Story = {
  args: {
    header: <HeaderComponent />,
    navigation: <NavigationComponent />,
    children: (
      <>
        <CommentInputComponent />
        <CommentList comments={sampleComments} />
      </>
    ),
  },
};

export const WithPagination: Story = {
  args: {
    header: <HeaderComponent />,
    navigation: <NavigationComponent />,
    children: <CommentList comments={sampleComments} />,
    bottomSection: <PaginationComponent />,
  },
};

export const EmptyState: Story = {
  args: {
    header: <HeaderComponent />,
    navigation: <NavigationComponent />,
    children: (
      <div className='text-center py-8 text-gray-500'>
        <p>아직 댓글이 없습니다.</p>
        <p className='text-sm mt-1'>첫 번째 댓글을 남겨보세요!</p>
      </div>
    ),
  },
};

export const CustomHeight: Story = {
  args: {
    minHeight: 'min-h-screen',
    header: <HeaderComponent />,
    navigation: <NavigationComponent />,
    children: <CommentList comments={sampleComments} />,
  },
};
