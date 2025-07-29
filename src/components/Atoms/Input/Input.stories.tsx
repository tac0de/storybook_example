import { useState } from 'react';
import { Input } from './Input';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text', description: '입력값' },
    placeholder: { control: 'text', description: '플레이스홀더' },
    label: { control: 'text', description: '라벨' },
    helperText: { control: 'text', description: '도움말 텍스트' },
    error: { control: 'text', description: '에러 메시지' },
    disabled: { control: 'boolean', description: '비활성화 여부' },
    readOnly: { control: 'boolean', description: '읽기 전용' },
    required: { control: 'boolean', description: '필수 입력' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '크기',
    },
    variant: {
      control: 'select',
      options: ['outline', 'filled', 'flushed'],
      description: '변형',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: '입력 타입',
    },
    maxLength: { control: 'number', description: '최대 길이' },
    minLength: { control: 'number', description: '최소 길이' },
    onChange: { action: 'changed' },
    onFocus: { action: 'focused' },
    onBlur: { action: 'blurred' },
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

// 아이콘 컴포넌트들
const SearchIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
  </svg>
);

const EmailIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' />
  </svg>
);

const LockIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z' />
  </svg>
);

const EyeIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z' />
  </svg>
);

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder='Enter text...'
      />
    );
  },
};

export const WithLabel: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        label='Email Address'
        placeholder='Enter your email'
        type='email'
      />
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [values, setValues] = useState({
      outline: '',
      filled: '',
      flushed: '',
    });

    const handleChange =
      (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues(prev => ({ ...prev, [field]: e.target.value }));
      };

    return (
      <div className='space-y-4 max-w-md'>
        <Input
          value={values.outline}
          onChange={handleChange('outline')}
          label='Outline'
          placeholder='Outline variant'
          variant='outline'
        />
        <Input
          value={values.filled}
          onChange={handleChange('filled')}
          label='Filled'
          placeholder='Filled variant'
          variant='filled'
        />
        <Input
          value={values.flushed}
          onChange={handleChange('flushed')}
          label='Flushed'
          placeholder='Flushed variant'
          variant='flushed'
        />
      </div>
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
      <div className='space-y-4 max-w-md'>
        <Input
          value={values.sm}
          onChange={handleChange('sm')}
          label='Small'
          placeholder='Small size'
          size='sm'
        />
        <Input
          value={values.md}
          onChange={handleChange('md')}
          label='Medium'
          placeholder='Medium size'
          size='md'
        />
        <Input
          value={values.lg}
          onChange={handleChange('lg')}
          label='Large'
          placeholder='Large size'
          size='lg'
        />
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const [values, setValues] = useState({
      search: '',
      email: '',
      password: '',
    });

    const handleChange =
      (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues(prev => ({ ...prev, [field]: e.target.value }));
      };

    return (
      <div className='space-y-4 max-w-md'>
        <Input
          value={values.search}
          onChange={handleChange('search')}
          label='Search'
          placeholder='Search...'
          leftIcon={<SearchIcon />}
          type='search'
        />
        <Input
          value={values.email}
          onChange={handleChange('email')}
          label='Email'
          placeholder='Enter email'
          leftIcon={<EmailIcon />}
          type='email'
        />
        <Input
          value={values.password}
          onChange={handleChange('password')}
          label='Password'
          placeholder='Enter password'
          leftIcon={<LockIcon />}
          rightIcon={<EyeIcon />}
          type='password'
        />
      </div>
    );
  },
};

export const ValidationStates: Story = {
  render: () => {
    const [values, setValues] = useState({
      helper: '',
      error: '',
      required: '',
    });

    const handleChange =
      (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues(prev => ({ ...prev, [field]: e.target.value }));
      };

    return (
      <div className='space-y-4 max-w-md'>
        <Input
          value={values.helper}
          onChange={handleChange('helper')}
          label='Helper Text'
          placeholder='With helper text'
          helperText='This is a helpful message'
        />
        <Input
          value={values.error}
          onChange={handleChange('error')}
          label='Error State'
          placeholder='With error'
          error='This field is required'
        />
        <Input
          value={values.required}
          onChange={handleChange('required')}
          label='Required Field'
          placeholder='Required input'
          required
        />
      </div>
    );
  },
};

export const States: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <div className='space-y-4 max-w-md'>
        <Input
          value='Disabled input'
          onChange={() => {}}
          label='Disabled'
          disabled
        />
        <Input
          value='Read only input'
          onChange={() => {}}
          label='Read Only'
          readOnly
        />
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          label='With Max Length'
          placeholder='Max 10 characters'
          maxLength={10}
          helperText='Maximum 10 characters allowed'
        />
      </div>
    );
  },
};

export const InputTypes: Story = {
  render: () => {
    const [values, setValues] = useState({
      text: '',
      email: '',
      password: '',
      number: '',
      tel: '',
      url: '',
    });

    const handleChange =
      (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues(prev => ({ ...prev, [field]: e.target.value }));
      };

    return (
      <div className='space-y-4 max-w-md'>
        <Input
          value={values.text}
          onChange={handleChange('text')}
          label='Text'
          placeholder='Text input'
          type='text'
        />
        <Input
          value={values.email}
          onChange={handleChange('email')}
          label='Email'
          placeholder='Email input'
          type='email'
        />
        <Input
          value={values.password}
          onChange={handleChange('password')}
          label='Password'
          placeholder='Password input'
          type='password'
        />
        <Input
          value={values.number}
          onChange={handleChange('number')}
          label='Number'
          placeholder='Number input'
          type='number'
        />
        <Input
          value={values.tel}
          onChange={handleChange('tel')}
          label='Tel'
          placeholder='Phone number'
          type='tel'
        />
        <Input
          value={values.url}
          onChange={handleChange('url')}
          label='URL'
          placeholder='Website URL'
          type='url'
        />
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        label='Interactive Input'
        placeholder='Type something...'
        onFocus={() => console.log('Input focused')}
        onBlur={() => console.log('Input blurred')}
      />
    );
  },
};
