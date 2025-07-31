import type { Meta, StoryObj } from '@storybook/react-vite';
import { CommentHeader } from './CommentHeader';

const meta: Meta<typeof CommentHeader> = {
  title: 'Molecules/CommentHeader',
  component: CommentHeader,
  tags: ['autodocs'],
  argTypes: {
    authorStatus: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <CommentHeader authorName='John Doe' timestamp='2 hours ago' />,
};

export const WithAvatar: Story = {
  render: () => (
    <CommentHeader
      authorName='Jane Smith'
      authorAvatar='https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      timestamp='1 hour ago'
    />
  ),
};

export const WithStatus: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <CommentHeader
        authorName='Alice Johnson'
        authorAvatar='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        timestamp='30 minutes ago'
        authorStatus='online'
      />
      <CommentHeader
        authorName='Bob Wilson'
        authorAvatar='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
        timestamp='1 day ago'
        authorStatus='offline'
      />
      <CommentHeader
        authorName='Carol Brown'
        authorAvatar='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
        timestamp='2 days ago'
        authorStatus='away'
      />
      <CommentHeader
        authorName='David Lee'
        authorAvatar='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
        timestamp='3 days ago'
        authorStatus='busy'
      />
    </div>
  ),
};

export const WithoutAvatar: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <CommentHeader
        authorName='Anonymous User'
        timestamp='5 minutes ago'
        authorStatus='online'
      />
      <CommentHeader authorName='Guest User' timestamp='1 hour ago' />
    </div>
  ),
};
