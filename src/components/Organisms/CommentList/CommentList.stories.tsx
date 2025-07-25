import { CommentList } from './CommentList';

import type { Comment } from './CommentList';
import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * `CommentList` 컴포넌트는 여러 `CommentItem`을 렌더링하고,
 * 로딩 및 빈 상태와 같은 목록 관련 상태를 관리합니다.
 */
const meta: Meta<typeof CommentList> = {
  title: 'Organisms/CommentList',
  component: CommentList,
  tags: ['autodocs'],
  argTypes: {
    comments: { control: 'object', description: '댓글 목록' },
    loading: { control: 'boolean' },
    onDelete: { action: 'delete' },
    onEdit: { action: 'edit' },
    emptyMessage: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const sampleComments: Comment[] = [
  { id: '1', author: '홍길동', text: '첫 댓글', timestamp: '방금 전' },
  { id: '2', author: '김철수', text: '두 번째 댓글', timestamp: '1분 전' },
];

/**
 * **Default CommentList 스토리**
 *
 * 샘플 댓글 데이터를 사용하여 기본 상태의 댓글 목록을 표시합니다.
 */
export const Default: Story = {
  args: {
    comments: sampleComments,
  },
};

/**
 * **Loading CommentList 스토리**
 *
 * `loading` prop이 `true`로 설정되어 로딩 상태를 표시하는 댓글 목록입니다.
 */
export const Loading: Story = {
  args: {
    comments: [],
    loading: true,
  },
};

/**
 * **Empty CommentList 스토리**
 *
 * 댓글 목록이 비어 있을 때 `emptyMessage`를 표시하는 댓글 목록입니다.
 */
export const Empty: Story = {
  args: {
    comments: [],
    loading: false,
    emptyMessage: '아직 댓글이 없습니다.',
  },
};
