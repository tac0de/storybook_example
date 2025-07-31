import type { Meta, StoryObj } from '@storybook/react-vite';
import { CommentForm } from './CommentForm';

const meta: Meta<typeof CommentForm> = {
  title: 'Molecules/CommentForm',
  component: CommentForm,
  tags: ['autodocs'],
  argTypes: {
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
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <CommentForm
      onSubmit={text => {
        console.log('Submitted:', text);
      }}
      onCancel={() => {
        console.log('Cancelled');
      }}
    />
  ),
};

export const WithInitialValue: Story = {
  render: () => (
    <CommentForm
      initialValue='이미 작성된 댓글 내용입니다.'
      onSubmit={text => console.log('Submitted:', text)}
      onCancel={() => console.log('Cancelled')}
    />
  ),
};

export const Loading: Story = {
  render: () => (
    <CommentForm
      loading={true}
      onSubmit={text => console.log('Submitted:', text)}
      onCancel={() => console.log('Cancelled')}
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <CommentForm
      disabled={true}
      onSubmit={text => console.log('Submitted:', text)}
      onCancel={() => console.log('Cancelled')}
    />
  ),
};

export const WithoutCancelButton: Story = {
  render: () => (
    <CommentForm
      showCancelButton={false}
      onSubmit={text => console.log('Submitted:', text)}
    />
  ),
};

export const ShortMaxLength: Story = {
  render: () => (
    <CommentForm
      maxLength={100}
      placeholder='최대 100자까지 입력 가능합니다.'
      onSubmit={text => console.log('Submitted:', text)}
      onCancel={() => console.log('Cancelled')}
    />
  ),
};

export const CustomPlaceholder: Story = {
  render: () => (
    <CommentForm
      placeholder='여러분의 의견을 자유롭게 남겨주세요!'
      onSubmit={text => console.log('Submitted:', text)}
      onCancel={() => console.log('Cancelled')}
    />
  ),
};
