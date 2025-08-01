import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'text'],
      description: 'Button visual style variant',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Button size',
    },
    borderRadius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
      description: 'Button border radius',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML button type',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button should take full width',
    },
    children: {
      control: 'text',
      description: 'Button text content',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    // Disable controls that shouldn't be altered
    onClick: {
      control: false,
      description: 'Click handler (disabled in controls)',
    },
    leftIcon: {
      control: false,
      description: 'Left icon element (disabled in controls)',
    },
    rightIcon: {
      control: false,
      description: 'Right icon element (disabled in controls)',
    },
    icon: {
      control: false,
      description: 'Icon element (disabled in controls)',
    },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// SVG 아이콘들
const PlusIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' />
  </svg>
);

const HeartIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
  </svg>
);

const SettingsIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z' />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z' />
  </svg>
);

export const Default: Story = {
  args: {
    children: 'Click me',
    onClick: () => console.log('Button clicked!'),
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive Button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    fullWidth: false,
    onClick: () => alert('Button clicked!'),
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button variant='primary' onClick={() => console.log('Primary clicked')}>
        Primary
      </Button>
      <Button
        variant='secondary'
        onClick={() => console.log('Secondary clicked')}
      >
        Secondary
      </Button>
      <Button variant='outline' onClick={() => console.log('Outline clicked')}>
        Outline
      </Button>
      <Button variant='ghost' onClick={() => console.log('Ghost clicked')}>
        Ghost
      </Button>
      <Button variant='danger' onClick={() => console.log('Danger clicked')}>
        Danger
      </Button>
      <Button variant='text' onClick={() => console.log('Text clicked')}>
        Text
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button size='xs' onClick={() => console.log('XS clicked')}>
        Extra Small
      </Button>
      <Button size='sm' onClick={() => console.log('SM clicked')}>
        Small
      </Button>
      <Button size='md' onClick={() => console.log('MD clicked')}>
        Medium
      </Button>
      <Button size='lg' onClick={() => console.log('LG clicked')}>
        Large
      </Button>
    </div>
  ),
};

export const BorderRadius: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button
        borderRadius='none'
        onClick={() => console.log('None radius clicked')}
      >
        None
      </Button>
      <Button
        borderRadius='sm'
        onClick={() => console.log('SM radius clicked')}
      >
        Small
      </Button>
      <Button
        borderRadius='md'
        onClick={() => console.log('MD radius clicked')}
      >
        Medium
      </Button>
      <Button
        borderRadius='lg'
        onClick={() => console.log('LG radius clicked')}
      >
        Large
      </Button>
      <Button
        borderRadius='xl'
        onClick={() => console.log('XL radius clicked')}
      >
        Extra Large
      </Button>
      <Button
        borderRadius='full'
        onClick={() => console.log('Full radius clicked')}
      >
        Full
      </Button>
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button type='button' onClick={() => console.log('Button type clicked')}>
        Button
      </Button>
      <Button type='submit' onClick={() => console.log('Submit clicked')}>
        Submit
      </Button>
      <Button type='reset' onClick={() => console.log('Reset clicked')}>
        Reset
      </Button>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button onClick={() => console.log('Normal clicked')}>Normal</Button>
      <Button disabled onClick={() => console.log('Disabled clicked')}>
        Disabled
      </Button>
      <Button fullWidth onClick={() => console.log('Full width clicked')}>
        Full Width
      </Button>
    </div>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button icon={<PlusIcon />} onClick={() => console.log('Plus clicked')} />
      <Button
        icon={<HeartIcon />}
        variant='danger'
        onClick={() => console.log('Heart clicked')}
      />
      <Button
        icon={<SettingsIcon />}
        variant='outline'
        onClick={() => console.log('Settings clicked')}
      />
      <Button
        icon={<ArrowRightIcon />}
        size='lg'
        onClick={() => console.log('Arrow clicked')}
      />
    </div>
  ),
};

export const IconWithText: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button
        leftIcon={<PlusIcon />}
        onClick={() => console.log('Add item clicked')}
      >
        Add Item
      </Button>
      <Button
        rightIcon={<ArrowRightIcon />}
        onClick={() => console.log('Continue clicked')}
      >
        Continue
      </Button>
      <Button
        leftIcon={<HeartIcon />}
        variant='danger'
        onClick={() => console.log('Like clicked')}
      >
        Like
      </Button>
      <Button
        leftIcon={<SettingsIcon />}
        rightIcon={<ArrowRightIcon />}
        onClick={() => console.log('Settings clicked')}
      >
        Settings
      </Button>
    </div>
  ),
};
