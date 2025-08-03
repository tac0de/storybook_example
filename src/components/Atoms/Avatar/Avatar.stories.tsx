import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Avatar size',
    },
    shape: {
      control: 'select',
      options: ['circle', 'square', 'rounded'],
      description: 'Avatar shape',
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy'],
      description: 'User status indicator',
    },
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alt text for accessibility',
    },
    className: {
      control: {
        disable: true,
      },
    },
  },
  args: {
    alt: 'User Avatar',
    size: 'md',
    shape: 'circle',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    alt: 'John Doe',
  },
};

export const Interactive: Story = {
  args: {
    alt: 'Interactive Avatar',
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    size: 'md',
    shape: 'circle',
    status: 'online',
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

export const WithImages: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Avatar
        src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        alt='John Doe'
      />
      <Avatar
        src='https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
        alt='Jane Smith'
      />
      <Avatar
        src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
        alt='Bob Johnson'
      />
      <Avatar
        src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
        alt='Alice Brown'
      />
    </div>
  ),
};

export const StatusVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Avatar
        src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        alt='Online User'
        status='online'
      />
      <Avatar
        src='https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
        alt='Offline User'
        status='offline'
      />
      <Avatar
        src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
        alt='Away User'
        status='away'
      />
      <Avatar
        src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
        alt='Busy User'
        status='busy'
      />
    </div>
  ),
};
