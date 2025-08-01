import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Layouts/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A footer component with multiple variants and positioning options for different layout needs.',
      },
    },
  },
  argTypes: {
    variant: {
      description: 'Visual style variant of the footer',
      control: 'select',
      options: ['default', 'minimal', 'dark'],
    },
    fixed: {
      description:
        'Whether the footer should be fixed to the bottom of the viewport',
      control: 'boolean',
    },
    children: {
      description: 'Content to render inside the footer',
      control: false,
    },
  },
  args: {
    variant: 'default',
    fixed: false,
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

const SampleFooterContent = () => (
  <div
    style={{
      textAlign: 'center',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '0 1rem',
    }}
  >
    <p style={{ margin: '0 0 1rem 0', fontWeight: '500' }}>
      &copy; 2024 Your Company. All rights reserved.
    </p>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        flexWrap: 'wrap',
      }}
    >
      {['Privacy Policy', 'Terms of Service', 'Contact Us'].map(item => (
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
    </div>
  </div>
);

export const Default: Story = {
  render: args => (
    <div
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <div
        style={{
          flex: 1,
          padding: '2rem',
          background: '#f8f9fa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#495057', marginBottom: '1rem' }}>
            Page Content
          </h2>
          <p style={{ color: '#6c757d', margin: 0 }}>
            This is the main content area. The footer will appear at the bottom.
          </p>
        </div>
      </div>
      <Footer {...args}>
        <SampleFooterContent />
      </Footer>
    </div>
  ),
};

export const Minimal: Story = {
  render: args => (
    <div
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <div
        style={{
          flex: 1,
          padding: '2rem',
          background: '#f8f9fa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#495057', marginBottom: '1rem' }}>
            Page Content
          </h2>
          <p style={{ color: '#6c757d', margin: 0 }}>
            This is the main content area with a minimal footer.
          </p>
        </div>
      </div>
      <Footer {...args} variant='minimal'>
        <SampleFooterContent />
      </Footer>
    </div>
  ),
};

export const Dark: Story = {
  render: args => (
    <div
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <div
        style={{
          flex: 1,
          padding: '2rem',
          background: '#f8f9fa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#495057', marginBottom: '1rem' }}>
            Page Content
          </h2>
          <p style={{ color: '#6c757d', margin: 0 }}>
            This is the main content area with a dark footer.
          </p>
        </div>
      </div>
      <Footer {...args} variant='dark'>
        <SampleFooterContent />
      </Footer>
    </div>
  ),
};
