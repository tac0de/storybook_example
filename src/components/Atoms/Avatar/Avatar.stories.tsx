import { Avatar } from './Avatar';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text', description: '프로필 이미지 URL' },
    alt: { control: 'text', description: '대체 텍스트 또는 이니셜' },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: '크기 변형',
    },
    shape: {
      control: 'select',
      options: ['circle', 'square', 'rounded'],
      description: '모양',
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy'],
      description: '상태 표시',
    },
    onClick: { action: 'clicked' },
  },
  parameters: {
    // Disable interaction testing for this component
    interactions: {
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
};

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'John Doe',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <Avatar alt='XS' size='xs' />
      <Avatar alt='SM' size='sm' />
      <Avatar alt='MD' size='md' />
      <Avatar alt='LG' size='lg' />
      <Avatar alt='XL' size='xl' />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <Avatar alt='Circle' shape='circle' />
      <Avatar alt='Square' shape='square' />
      <Avatar alt='Rounded' shape='rounded' />
    </div>
  ),
};

export const StatusVariants: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <Avatar alt='Online' status='online' />
      <Avatar alt='Offline' status='offline' />
      <Avatar alt='Away' status='away' />
      <Avatar alt='Busy' status='busy' />
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    alt: 'Clickable',
    onClick: () => console.log('Avatar clicked'),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className='grid grid-cols-2 gap-4'>
      <div className='space-y-2'>
        <h3 className='font-semibold'>Sizes</h3>
        <div className='flex items-center gap-2'>
          <Avatar alt='XS' size='xs' />
          <Avatar alt='SM' size='sm' />
          <Avatar alt='MD' size='md' />
          <Avatar alt='LG' size='lg' />
          <Avatar alt='XL' size='xl' />
        </div>
      </div>

      <div className='space-y-2'>
        <h3 className='font-semibold'>Shapes</h3>
        <div className='flex items-center gap-2'>
          <Avatar alt='Circle' shape='circle' />
          <Avatar alt='Square' shape='square' />
          <Avatar alt='Rounded' shape='rounded' />
        </div>
      </div>

      <div className='space-y-2'>
        <h3 className='font-semibold'>Status</h3>
        <div className='flex items-center gap-2'>
          <Avatar alt='Online' status='online' />
          <Avatar alt='Offline' status='offline' />
          <Avatar alt='Away' status='away' />
          <Avatar alt='Busy' status='busy' />
        </div>
      </div>

      <div className='space-y-2'>
        <h3 className='font-semibold'>With Image</h3>
        <Avatar
          src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
          alt='John Doe'
          status='online'
        />
      </div>
    </div>
  ),
};
