import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArticleTag } from './ArticleTag';

const meta: Meta<typeof ArticleTag> = {
  title: 'Services/Articles/ArticleTag',
  component: ArticleTag,
  args: {
    label: 'React',
    selected: false,
  },
  argTypes: {
    onClick: { action: 'click' },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ArticleTag>;

export const Default: Story = {};

export const Selected: Story = {
  args: { selected: true },
};

