import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'square', 'rounded'],
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy'],
    },
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    alt: 'John Doe',
  },
  parameters: {
    controls: {
      disable: false,
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar alt='John Doe' />
      <Avatar
        src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        alt='John Doe'
      />
      <Avatar alt='John Doe' status='online' />
      <Avatar alt='John Doe' status='offline' />
      <Avatar alt='John Doe' status='away' />
      <Avatar alt='John Doe' status='busy' />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar alt='John Doe' shape='circle' />
      <Avatar alt='John Doe' shape='rounded' />
      <Avatar alt='John Doe' shape='square' />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar alt='Small' size='sm' />
      <Avatar alt='Medium' size='md' />
      <Avatar alt='Large' size='lg' />
    </div>
  ),
};
