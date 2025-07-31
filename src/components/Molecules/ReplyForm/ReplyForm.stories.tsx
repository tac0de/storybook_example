import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReplyForm } from './ReplyForm';

const meta: Meta<typeof ReplyForm> = {
  title: 'Molecules/ReplyForm',
  component: ReplyForm,
  tags: ['autodocs'],
  argTypes: {
    maxLength: {
      control: 'number',
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    showCancelButton: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReplyForm>;

export const Default: Story = {
  render: () => (
    <ReplyForm
      onSubmit={newValue => {
        console.log('답글 제출:', newValue);
      }}
      onCancel={() => {
        console.log('답글 취소');
      }}
    />
  ),
};

export const WithInitialValue: Story = {
  render: () => (
    <ReplyForm
      initialValue='이미 입력된 답글 내용입니다.'
      onSubmit={value => console.log('답글 제출:', value)}
      onCancel={() => console.log('답글 취소')}
    />
  ),
};

export const Loading: Story = {
  render: () => (
    <ReplyForm
      loading={true}
      onSubmit={value => console.log('답글 제출:', value)}
      onCancel={() => console.log('답글 취소')}
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <ReplyForm
      disabled={true}
      onSubmit={value => console.log('답글 제출:', value)}
      onCancel={() => console.log('답글 취소')}
    />
  ),
};

export const WithoutCancelButton: Story = {
  render: () => (
    <ReplyForm
      showCancelButton={false}
      onSubmit={value => console.log('답글 제출:', value)}
    />
  ),
};
