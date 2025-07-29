import type { Meta, StoryObj } from '@storybook/react-vite';
import { TestButton } from './TestButton';

const meta: Meta<typeof TestButton> = {
  title: 'Atoms/TestButton',
  component: TestButton,
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
  args: {},
};

export const WithCustomClass: Story = {
  args: {
    className: 'bg-blue-100 border-2 border-blue-300',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <TestButton className="bg-blue-100" />
      <TestButton className="bg-green-100" />
      <TestButton className="bg-red-100" />
    </div>
  ),
};