import { CommentPage } from './CommentPage';

import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * `CommentPage`는 댓글 기능을 제공하는 완전한 페이지 단위의 컴포넌트입니다.
 * 이 페이지는 `CommentTemplate`, `CommentInput`, `CommentList` 등 여러 컴포넌트를 조합하여 구성됩니다.
 * 사용자는 이 페이지에서 댓글을 보고, 작성하고, 삭제할 수 있습니다.
 */
const meta: Meta<typeof CommentPage> = {
  title: 'Pages/CommentPage',
  component: CommentPage,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * **Default CommentPage 스토리**
 *
 * `CommentPage`의 기본 상태를 보여주는 스토리입니다.
 * 초기 댓글 목록이 표시되며, 사용자는 댓글을 추가하거나 삭제할 수 있습니다.
 */
export const Default: Story = {};
// 로딩/빈 상태 등은 실제 컴포넌트에서 상태를 조작하거나, 별도 스토리로 확장 가능
