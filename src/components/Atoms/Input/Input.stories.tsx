import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['default', 'underline'] },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    error: { control: 'boolean' },
    autoResize: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Input value={value} onChange={setValue} placeholder='Enter text...' />
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [values, setValues] = useState({
      default: '',
      withValue: 'With value',
      error: 'Error state',
      disabled: 'Disabled input',
      readonly: 'Read only',
      maxLength: '',
    });

    const handleChange = (field: string) => (value: string) => {
      setValues(prev => ({ ...prev, [field]: value }));
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxWidth: '400px',
        }}
      >
        <Input
          value={values.default}
          onChange={handleChange('default')}
          placeholder='Default input'
        />
        <Input
          value={values.withValue}
          onChange={handleChange('withValue')}
          placeholder='Input with value'
        />
        <Input
          value={values.error}
          onChange={handleChange('error')}
          error={true}
          errorMessage='This field is required'
        />
        <Input
          value={values.disabled}
          onChange={handleChange('disabled')}
          disabled={true}
        />
        <Input
          value={values.readonly}
          onChange={handleChange('readonly')}
          readOnly={true}
        />
        <Input
          value={values.maxLength}
          onChange={handleChange('maxLength')}
          placeholder='With max length'
          maxLength={50}
        />
      </div>
    );
  },
};

export const Underline: Story = {
  render: () => {
    const [values, setValues] = useState({
      default: '',
      withValue: 'With value',
      error: 'Error state',
      disabled: 'Disabled input',
      readonly: 'Read only',
      maxLength: '',
    });

    const handleChange = (field: string) => (value: string) => {
      setValues(prev => ({ ...prev, [field]: value }));
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxWidth: '400px',
        }}
      >
        <Input
          value={values.default}
          onChange={handleChange('default')}
          placeholder='Default underline input'
          variant='underline'
        />
        <Input
          value={values.withValue}
          onChange={handleChange('withValue')}
          placeholder='Underline input with value'
          variant='underline'
        />
        <Input
          value={values.error}
          onChange={handleChange('error')}
          error={true}
          errorMessage='This field is required'
          variant='underline'
        />
        <Input
          value={values.disabled}
          onChange={handleChange('disabled')}
          disabled={true}
          variant='underline'
        />
        <Input
          value={values.readonly}
          onChange={handleChange('readonly')}
          readOnly={true}
          variant='underline'
        />
        <Input
          value={values.maxLength}
          onChange={handleChange('maxLength')}
          placeholder='Underline with max length'
          maxLength={50}
          variant='underline'
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [values, setValues] = useState({
      small: '',
      medium: '',
      large: '',
    });

    const handleChange = (field: string) => (value: string) => {
      setValues(prev => ({ ...prev, [field]: value }));
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxWidth: '400px',
        }}
      >
        <Input
          value={values.small}
          onChange={handleChange('small')}
          placeholder='Small size'
          size='sm'
        />
        <Input
          value={values.medium}
          onChange={handleChange('medium')}
          placeholder='Medium size'
          size='md'
        />
        <Input
          value={values.large}
          onChange={handleChange('large')}
          placeholder='Large size'
          size='lg'
        />
      </div>
    );
  },
};
