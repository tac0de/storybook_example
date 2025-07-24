import { CommentPage } from './CommentPage';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof CommentPage> = {
  title: 'Pages/CommentPage',
  component: CommentPage,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
// 로딩/빈 상태 등은 실제 컴포넌트에서 상태를 조작하거나, 별도 스토리로 확장 가능
