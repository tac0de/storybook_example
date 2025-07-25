import { CommentTemplate } from './CommentTemplate';

import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * `CommentTemplate`는 페이지의 전체적인 레이아웃 구조를 정의합니다.
 * 헤더, 본문, 푸터 영역으로 구성되어 있으며, 각 영역에 다른 컴포넌트들을 조합하여 페이지를 완성할 수 있습니다.
 */
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

/**
 * **Default CommentTemplate 스토리**
 *
 * 헤더, 본문, 푸터 영역에 간단한 텍스트를 채워넣은 기본 템플릿 예제입니다.
 */
export const Default: Story = {
  args: {
    header: '댓글',
    children: '댓글 리스트가 들어갑니다.',
    footer: 'Copyright 2024',
  },
};
