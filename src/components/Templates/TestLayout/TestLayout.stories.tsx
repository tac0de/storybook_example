import type { Meta, StoryObj } from '@storybook/react-vite';
import { TestLayout } from './TestLayout';

const meta: Meta<typeof TestLayout> = {
  title: 'Templates/TestLayout',
  component: TestLayout,
  tags: ['autodocs'],
  argTypes: {
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

export const Default: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">헤더</h2>
        <p>메인 콘텐츠 영역입니다.</p>
        <div className="bg-gray-100 p-4 rounded">
          샘플 콘텐츠
        </div>
      </div>
    ),
  },
};

export const WithCustomContent: Story = {
  args: {
    className: 'bg-blue-50',
    children: (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">커스텀 콘텐츠</h2>
        <p className="text-blue-700">이것은 커스텀 콘텐츠입니다.</p>
      </div>
    ),
  },
};