import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextInputForm } from './TextInputForm';

const meta: Meta<typeof TextInputForm> = {
  title: 'Molecules/TextInputForm',
  component: TextInputForm,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A reusable text input form component with submit button for comments, replies, and other text submissions.',
      },
    },
  },
  argTypes: {
    placeholder: {
      description: 'Placeholder text for the input field',
      control: 'text',
    },
    maxLength: {
      description: 'Maximum number of characters allowed',
      control: 'number',
    },
    submitText: {
      description: 'Text displayed on the submit button',
      control: 'text',
    },
    onSubmit: {
      description: 'Callback when form is submitted',
      control: false,
    },
    className: {
      description: 'Additional CSS class names',
      control: false,
    },
  },
  args: {
    placeholder: '내용을 입력하세요...',
    maxLength: 500,
    submitText: '작성',
  },
};

export default meta;
type Story = StoryObj<typeof TextInputForm>;

export const Default: Story = {
  render: (args) => (
    <TextInputForm
      {...args}
      onSubmit={(value) => {
        console.log('Form submitted:', value);
        alert(`제출된 내용: ${value}`);
      }}
    />
  ),
};

export const CommentForm: Story = {
  args: {
    placeholder: '댓글을 입력하세요...',
    submitText: '댓글 작성',
  },
};

export const ReplyForm: Story = {
  args: {
    placeholder: '답글을 입력하세요...',
    submitText: '답글 작성',
  },
};

export const ShortLimit: Story = {
  args: {
    placeholder: '짧은 메시지를 입력하세요...',
    maxLength: 100,
    submitText: '전송',
  },
};

export const LongLimit: Story = {
  args: {
    placeholder: '긴 내용을 입력하세요...',
    maxLength: 1000,
    submitText: '저장',
  },
};

export const CustomSubmitText: Story = {
  args: {
    placeholder: '메시지를 입력하세요...',
    submitText: '보내기',
  },
}; 