import { useState } from 'react';
import { CommentInput } from './CommentInput';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof CommentInput> = {
  title: 'Molecules/CommentInput',
  component: CommentInput,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text', description: '입력값' },
    placeholder: { control: 'text', description: '플레이스홀더' },
    disabled: { control: 'boolean', description: '비활성화 여부' },
    loading: { control: 'boolean', description: '로딩 상태' },
    maxLength: { control: 'number', description: '최대 글자 수' },
    minLength: { control: 'number', description: '최소 글자 수' },
    userAvatar: { control: 'text', description: '사용자 아바타 URL' },
    userName: { control: 'text', description: '사용자 이름' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '입력 크기',
    },
    submitText: { control: 'text', description: '버튼 텍스트' },
    error: { control: 'text', description: '에러 메시지' },
    onChange: { action: 'changed' },
    onSubmit: { action: 'submitted' },
  },
  parameters: {
    interactions: {
      disable: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <CommentInput
        value={value}
        onChange={e => setValue(e.target.value)}
        onSubmit={() => console.log('Submitted:', value)}
      />
    );
  },
};

export const WithUser: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <CommentInput
        value={value}
        onChange={e => setValue(e.target.value)}
        onSubmit={() => console.log('Submitted:', value)}
        userName='John Doe'
        userAvatar='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      />
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <CommentInput
        value={value}
        onChange={e => setValue(e.target.value)}
        onSubmit={() => console.log('Submitted:', value)}
        minLength={10}
        maxLength={200}
        placeholder='최소 10자, 최대 200자까지 입력 가능합니다'
      />
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <CommentInput
        value={value}
        onChange={e => setValue(e.target.value)}
        onSubmit={() => console.log('Submitted:', value)}
        error='댓글을 입력해주세요'
      />
    );
  },
};

export const Loading: Story = {
  render: () => {
    const [value, setValue] = useState('댓글을 작성 중입니다...');
    return (
      <CommentInput
        value={value}
        onChange={e => setValue(e.target.value)}
        onSubmit={() => console.log('Submitted:', value)}
        loading={true}
        disabled={true}
      />
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <CommentInput
        value={value}
        onChange={e => setValue(e.target.value)}
        onSubmit={() => console.log('Submitted:', value)}
        disabled={true}
        placeholder='로그인이 필요합니다'
      />
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [values, setValues] = useState({
      sm: '',
      md: '',
      lg: '',
    });

    const handleChange =
      (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues(prev => ({ ...prev, [field]: e.target.value }));
      };

    return (
      <div className='space-y-6'>
        <div>
          <h3 className='text-lg font-semibold mb-2'>Small Size</h3>
          <CommentInput
            value={values.sm}
            onChange={handleChange('sm')}
            onSubmit={() => console.log('Small submitted')}
            size='sm'
            submitText='등록'
          />
        </div>
        <div>
          <h3 className='text-lg font-semibold mb-2'>Medium Size (Default)</h3>
          <CommentInput
            value={values.md}
            onChange={handleChange('md')}
            onSubmit={() => console.log('Medium submitted')}
            size='md'
            submitText='등록'
          />
        </div>
        <div>
          <h3 className='text-lg font-semibold mb-2'>Large Size</h3>
          <CommentInput
            value={values.lg}
            onChange={handleChange('lg')}
            onSubmit={() => console.log('Large submitted')}
            size='lg'
            submitText='등록'
          />
        </div>
      </div>
    );
  },
};

export const CustomSubmitText: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className='space-y-4'>
        <CommentInput
          value={value}
          onChange={e => setValue(e.target.value)}
          onSubmit={() => console.log('Submitted:', value)}
          submitText='댓글 작성'
        />
        <CommentInput
          value={value}
          onChange={e => setValue(e.target.value)}
          onSubmit={() => console.log('Submitted:', value)}
          submitText='전송'
        />
        <CommentInput
          value={value}
          onChange={e => setValue(e.target.value)}
          onSubmit={() => console.log('Submitted:', value)}
          submitText='답글 달기'
        />
      </div>
    );
  },
};

export const AllFeatures: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <CommentInput
        value={value}
        onChange={e => setValue(e.target.value)}
        onSubmit={() => console.log('Submitted:', value)}
        userName='Jane Smith'
        userAvatar='https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
        size='lg'
        minLength={5}
        maxLength={500}
        submitText='댓글 작성'
        placeholder='의견을 자유롭게 남겨주세요 (최소 5자)'
      />
    );
  },
};
