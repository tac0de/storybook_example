import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Layouts/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A flexible header component with multiple variants and positioning options for different layout needs.',
      },
    },
  },
  argTypes: {
    variant: {
      description: 'Visual style variant of the header',
      control: 'select',
      options: ['default', 'minimal', 'elevated'],
    },
    sticky: {
      description: 'Whether the header should stick to the top of the viewport',
      control: 'boolean',
    },
    transparent: {
      description: 'Whether the header should have a transparent background',
      control: 'boolean',
    },
    children: {
      description: 'Content to render inside the header',
      control: false,
    },
  },
  args: {
    variant: 'default',
    sticky: false,
    transparent: false,
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

const SampleHeaderContent = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
    }}
  >
    <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
      Website Header
    </h1>
    <nav style={{ display: 'flex', gap: '1.5rem' }}>
      {['Home', 'About', 'Contact'].map(item => (
        <a
          key={item}
          href='#'
          style={{
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: '500',
            padding: '0.5rem 0',
            borderBottom: '2px solid transparent',
            transition: 'border-color 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderBottomColor = 'currentColor';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderBottomColor = 'transparent';
          }}
        >
          {item}
        </a>
      ))}
    </nav>
  </div>
);

export const Default: Story = {
  render: args => (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Header {...args}>
        <SampleHeaderContent />
      </Header>
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Page Content</h2>
        <p>This is the main content area below the header.</p>
      </div>
    </div>
  ),
};

export const Minimal: Story = {
  render: args => (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Header {...args} variant='minimal'>
        <SampleHeaderContent />
      </Header>
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Page Content</h2>
        <p>This is the main content area with a minimal header.</p>
      </div>
    </div>
  ),
};

export const Elevated: Story = {
  render: args => (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Header {...args} variant='elevated'>
        <SampleHeaderContent />
      </Header>
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Page Content</h2>
        <p>This is the main content area with an elevated header.</p>
      </div>
    </div>
  ),
};

export const Transparent: Story = {
  render: args => (
    <div
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        padding: '2rem',
      }}
    >
      <Header {...args} transparent>
        <SampleHeaderContent />
      </Header>
      <div
        style={{
          padding: '2rem',
          textAlign: 'center',
          color: 'white',
          marginTop: '2rem',
        }}
      >
        <h2>Page Content</h2>
        <p>
          This is the main content area with a transparent header over a
          gradient background.
        </p>
      </div>
    </div>
  ),
};
