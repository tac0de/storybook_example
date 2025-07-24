import { CommentTemplate } from './CommentTemplate';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof CommentTemplate> = {
  title: 'Templates/CommentTemplate',
  component: CommentTemplate,
  tags: ['autodocs'],
  argTypes: {
    header: { control: 'text', description: '헤더 영역' },
    children: { control: 'text', description: '본문 영역' },
    footer: { control: 'text', description: '푸터 영역' },
    className: { control: 'text', description: '추가 클래스' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    header: '댓글',
    children: '댓글 리스트가 들어갑니다.',
    footer: 'Copyright 2024',
  },
};
