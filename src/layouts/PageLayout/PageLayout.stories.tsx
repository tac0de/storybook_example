import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageLayout } from './PageLayout';

const meta: Meta<typeof PageLayout> = {
  title: 'Layouts/PageLayout',
  component: PageLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A complete page layout component that provides header, sidebar, content, and footer sections with flexible configuration options.',
      },
    },
  },
  argTypes: {
    maxWidth: {
      description: 'Maximum width constraint for the layout',
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    padding: {
      description: 'Padding applied to the main content area',
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    hasSidebar: {
      description: 'Whether the layout includes a sidebar',
      control: 'boolean',
    },
    header: {
      description: 'Header component to render',
      control: false,
    },
    sidebar: {
      description: 'Sidebar component to render',
      control: false,
    },
    children: {
      description: 'Main content to render',
      control: false,
    },
    footer: {
      description: 'Footer component to render',
      control: false,
    },
  },
  args: {
    maxWidth: 'lg',
    padding: 'md',
    hasSidebar: false,
  },
};

export default meta;
type Story = StoryObj<typeof PageLayout>;

const SampleHeader = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 1rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      minHeight: '60px',
    }}
  >
    <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
      Website Header
    </h1>
    <nav style={{ display: 'flex', gap: '1rem' }}>
      <a
        href='#'
        style={{ textDecoration: 'none', color: 'white', fontWeight: '500' }}
      >
        Home
      </a>
      <a
        href='#'
        style={{ textDecoration: 'none', color: 'white', fontWeight: '500' }}
      >
        About
      </a>
      <a
        href='#'
        style={{ textDecoration: 'none', color: 'white', fontWeight: '500' }}
      >
        Contact
      </a>
    </nav>
  </div>
);

const SampleSidebar = () => (
  <div style={{ padding: '1rem', background: '#f8f9fa', height: '100%' }}>
    <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#495057' }}>
      Navigation
    </h3>
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {['Dashboard', 'Profile', 'Settings', 'Help'].map(item => (
        <li key={item} style={{ marginBottom: '0.5rem' }}>
          <a
            href='#'
            style={{
              display: 'block',
              padding: '0.75rem',
              textDecoration: 'none',
              color: '#495057',
              borderRadius: '6px',
              transition: 'all 0.2s ease',
              fontWeight: '500',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#e9ecef';
              e.currentTarget.style.color = '#212529';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#495057';
            }}
          >
            {item}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const SampleContent = () => (
  <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
    <h2 style={{ color: '#212529', marginBottom: '1rem' }}>Main Content</h2>
    <p style={{ color: '#6c757d', lineHeight: '1.6', marginBottom: '1rem' }}>
      This is the main content area of the page. It can contain any content you
      need.
    </p>
    <p style={{ color: '#6c757d', lineHeight: '1.6', marginBottom: '2rem' }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </p>
    <div
      style={{
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid #dee2e6',
        textAlign: 'center',
      }}
    >
      <h3 style={{ color: '#495057', marginBottom: '1rem' }}>
        Content Section
      </h3>
      <p style={{ color: '#6c757d', margin: 0 }}>
        This is a content section with enhanced styling and visual appeal.
      </p>
    </div>
  </div>
);

const SampleFooter = () => (
  <div
    style={{
      textAlign: 'center',
      color: '#6c757d',
      background: '#f8f9fa',
      padding: '1.5rem',
      borderTop: '1px solid #dee2e6',
    }}
  >
    <p style={{ margin: '0 0 0.5rem 0', fontWeight: '500' }}>
      &copy; 2024 Your Company. All rights reserved.
    </p>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        flexWrap: 'wrap',
      }}
    >
      <a href='#' style={{ textDecoration: 'none', color: '#495057' }}>
        Privacy Policy
      </a>
      <a href='#' style={{ textDecoration: 'none', color: '#495057' }}>
        Terms of Service
      </a>
      <a href='#' style={{ textDecoration: 'none', color: '#495057' }}>
        Contact Us
      </a>
    </div>
  </div>
);

export const Default: Story = {
  render: args => (
    <PageLayout
      {...args}
      header={<SampleHeader />}
      children={<SampleContent />}
      footer={<SampleFooter />}
    />
  ),
};

export const WithSidebar: Story = {
  render: args => (
    <PageLayout
      {...args}
      header={<SampleHeader />}
      sidebar={<SampleSidebar />}
      children={<SampleContent />}
      footer={<SampleFooter />}
      hasSidebar={true}
    />
  ),
};

export const Compact: Story = {
  render: args => (
    <PageLayout
      {...args}
      header={<SampleHeader />}
      children={<SampleContent />}
      footer={<SampleFooter />}
      maxWidth='md'
      padding='sm'
    />
  ),
};
