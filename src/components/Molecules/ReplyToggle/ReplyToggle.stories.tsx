import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ReplyToggle } from './ReplyToggle';

const meta: Meta<typeof ReplyToggle> = {
  title: 'Molecules/ReplyToggle',
  component: ReplyToggle,
  tags: ['autodocs'],
  argTypes: {
    replyCount: {
      control: 'number',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReplyToggle>;

export const Default: Story = {
  render: () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <ReplyToggle
        replyCount={5}
        isExpanded={isExpanded}
        onToggle={() => {
          console.log('토글 클릭:', !isExpanded);
          setIsExpanded(!isExpanded);
        }}
      />
    );
  },
};

export const Expanded: Story = {
  render: () => (
    <ReplyToggle
      replyCount={3}
      isExpanded={true}
      onToggle={() => console.log('답글 숨기기 클릭')}
    />
  ),
};

export const Collapsed: Story = {
  render: () => (
    <ReplyToggle
      replyCount={7}
      isExpanded={false}
      onToggle={() => console.log('답글 보기 클릭')}
    />
  ),
};

export const SingleReply: Story = {
  render: () => (
    <ReplyToggle
      replyCount={1}
      isExpanded={false}
      onToggle={() => console.log('답글 보기 클릭')}
    />
  ),
};

export const ManyReplies: Story = {
  render: () => (
    <ReplyToggle
      replyCount={25}
      isExpanded={false}
      onToggle={() => console.log('답글 보기 클릭')}
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <ReplyToggle
      replyCount={5}
      isExpanded={false}
      onToggle={() => console.log('토글 클릭')}
      disabled={true}
    />
  ),
};

export const NoReplies: Story = {
  render: () => (
    <ReplyToggle
      replyCount={0}
      isExpanded={false}
      onToggle={() => console.log('토글 클릭')}
    />
  ),
};
