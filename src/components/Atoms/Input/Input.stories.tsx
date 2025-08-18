import type { Meta, StoryObj, StoryFn } from '@storybook/react-vite';
import type { InputProps } from './Input';
import { Input } from './Input';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
    },
    variant: {
      control: 'select',
      options: ['default', 'underline'],
      description: 'Input visual style',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the input is read-only',
    },
    error: {
      control: 'boolean',
      description: 'Whether to show error state',
    },
    autoResize: {
      control: 'boolean',
      description: 'Whether the input should auto-resize',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    maxLength: {
      control: 'number',
      description: 'Maximum character length',
    },
    value: {
      control: 'text',
      description: 'Input value',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    // Disable controls that shouldn't be altered
    onChange: {
      control: false,
      description: 'Change handler (disabled in controls)',
    },
    onFocus: {
      control: false,
      description: 'Focus handler (disabled in controls)',
    },
    onBlur: {
      control: false,
      description: 'Blur handler (disabled in controls)',
    },
    onKeyDown: {
      control: false,
      description: 'Key down handler (disabled in controls)',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
    },
  },
  args: {
    placeholder: 'Enter text...',
    size: 'md',
    variant: 'default',
    disabled: false,
    readOnly: false,
    error: false,
    autoResize: false,
    // ← 이 두 줄을 추가하세요
    value: '',
    errorMessage: '',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template: StoryFn<InputProps> = args => {
  const [value, setValue] = useState('');
  return <Input {...args} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
Default.args = {};

// export const Default: Story = {
//   render: (args, { updateArgs }) => (
//     <Input
//       {...args}
//       onChange={newValue => updateArgs({ value: newValue })}
//       placeholder='Interactive input...'
//       onFocus={() => console.log('Input focused')}
//       onBlur={() => console.log('Input blurred')}
//       onKeyDown={e => {
//         if (e.key === 'Enter') console.log('Enter pressed:', args.value);
//       }}
//     />
//   ),
// };

export const Interactive: Story = {
  render() {
    const [value, setValue] = useState('');
    return (
      <Input
        value={value}
        onChange={newValue => {
          setValue(newValue);
          console.log('Input changed:', newValue);
        }}
        placeholder='Interactive input...'
        onFocus={() => console.log('Input focused')}
        onBlur={() => console.log('Input blurred')}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            console.log('Enter pressed:', value);
          }
        }}
      />
    );
  },
};

export const Variants: Story = {
  render() {
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
      console.log(`${field} changed:`, value);
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
          onFocus={() => console.log('Default input focused')}
        />
        <Input
          value={values.withValue}
          onChange={handleChange('withValue')}
          placeholder='Input with value'
          onFocus={() => console.log('With value input focused')}
        />
        <Input
          value={values.error}
          onChange={handleChange('error')}
          error={true}
          errorMessage='This field is required'
          onFocus={() => console.log('Error input focused')}
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
          onFocus={() => console.log('Readonly input focused')}
        />
        <Input
          value={values.maxLength}
          onChange={handleChange('maxLength')}
          placeholder='With max length'
          maxLength={50}
          onFocus={() => console.log('Max length input focused')}
        />
      </div>
    );
  },
};

export const Underline: Story = {
  render() {
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
      console.log(`Underline ${field} changed:`, value);
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
          onFocus={() => console.log('Default underline focused')}
        />
        <Input
          value={values.withValue}
          onChange={handleChange('withValue')}
          placeholder='Underline input with value'
          variant='underline'
          onFocus={() => console.log('With value underline focused')}
        />
        <Input
          value={values.error}
          onChange={handleChange('error')}
          error={true}
          errorMessage='This field is required'
          variant='underline'
          onFocus={() => console.log('Error underline focused')}
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
          onFocus={() => console.log('Readonly underline focused')}
        />
        <Input
          value={values.maxLength}
          onChange={handleChange('maxLength')}
          placeholder='Underline with max length'
          maxLength={50}
          variant='underline'
          onFocus={() => console.log('Max length underline focused')}
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  render() {
    const [values, setValues] = useState({
      small: '',
      medium: '',
      large: '',
    });

    const handleChange = (field: string) => (value: string) => {
      setValues(prev => ({ ...prev, [field]: value }));
      console.log(`${field} size input changed:`, value);
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
          onFocus={() => console.log('Small input focused')}
        />
        <Input
          value={values.medium}
          onChange={handleChange('medium')}
          placeholder='Medium size'
          size='md'
          onFocus={() => console.log('Medium input focused')}
        />
        <Input
          value={values.large}
          onChange={handleChange('large')}
          placeholder='Large size'
          size='lg'
          onFocus={() => console.log('Large input focused')}
        />
      </div>
    );
  },
};

const AutoResizeRenderer: StoryFn<InputProps> = args => {
  const [value, setValue] = useState('');
  return (
    <div style={{ maxWidth: '400px' }}>
      <Input
        {...args}
        value={value}
        onChange={newValue => {
          setValue(newValue);
          console.log('Auto-resize input changed:', newValue);
        }}
        placeholder='This input auto-resizes...'
        autoResize={true}
        onFocus={() => console.log('Auto-resize input focused')}
      />
      <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
        Try typing a long message to see the auto-resize in action
      </p>
    </div>
  );
};

export const AutoResize: Story = {
  render: AutoResizeRenderer,
};
