import type { Meta, StoryObj } from '@storybook/react-vite';
import { UserHeader } from './UserHeader';

const meta: Meta<typeof UserHeader> = {
  title: 'Molecules/UserHeader',
  component: UserHeader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A reusable user header component that displays user information with avatar, name, status, and timestamp.',
      },
    },
  },
  argTypes: {
    authorName: {
      description: 'Name of the user/author',
      control: 'text',
    },
    authorAvatar: {
      description: 'URL of the user avatar image',
      control: 'text',
    },
    timestamp: {
      description: 'Time when the content was created',
      control: 'text',
    },
    authorStatus: {
      description: 'Current status of the user',
      control: 'select',
      options: ['online', 'offline', 'away', 'busy'],
    },
    onAuthorClick: {
      description: 'Callback when author name is clicked',
      control: false,
    },
    className: {
      description: 'Additional CSS class names',
      control: false,
    },
  },
  args: {
    authorName: '김민수',
    authorAvatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    timestamp: '2시간 전',
    authorStatus: 'online',
  },
};

export default meta;
type Story = StoryObj<typeof UserHeader>;

export const Default: Story = {
  render: args => (
    <UserHeader
      {...args}
      onAuthorClick={() => {
        console.log('Author clicked:', args.authorName);
        alert(`${args.authorName}의 프로필을 확인합니다.`);
      }}
    />
  ),
};

export const Offline: Story = {
  args: {
    authorStatus: 'offline',
    timestamp: '1일 전',
  },
};

export const Away: Story = {
  args: {
    authorStatus: 'away',
    timestamp: '30분 전',
  },
};

export const Busy: Story = {
  args: {
    authorStatus: 'busy',
    timestamp: '5분 전',
  },
};

export const NoAvatar: Story = {
  args: {
    authorAvatar: undefined,
  },
};

export const LongName: Story = {
  args: {
    authorName: '매우 긴 사용자 이름입니다',
  },
};
