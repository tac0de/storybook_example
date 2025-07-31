import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageLayout } from './PageLayout';

const meta: Meta<typeof PageLayout> = {
  title: 'Templates/PageLayout',
  component: PageLayout,
  tags: ['autodocs'],
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    hasSidebar: {
      control: 'boolean',
    },
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
    }}
  >
    <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
      Website Header
    </h1>
    <nav>
      <a
        href='#'
        style={{ marginLeft: '1rem', textDecoration: 'none', color: '#333' }}
      >
        Home
      </a>
      <a
        href='#'
        style={{ marginLeft: '1rem', textDecoration: 'none', color: '#333' }}
      >
        About
      </a>
      <a
        href='#'
        style={{ marginLeft: '1rem', textDecoration: 'none', color: '#333' }}
      >
        Contact
      </a>
    </nav>
  </div>
);

const SampleSidebar = () => (
  <div>
    <h3 style={{ marginTop: 0 }}>Navigation</h3>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      <li style={{ padding: '0.5rem 0' }}>Dashboard</li>
      <li style={{ padding: '0.5rem 0' }}>Profile</li>
      <li style={{ padding: '0.5rem 0' }}>Settings</li>
      <li style={{ padding: '0.5rem 0' }}>Help</li>
    </ul>
  </div>
);

const SampleContent = () => (
  <div>
    <h2>Main Content</h2>
    <p>
      This is the main content area of the page. It can contain any content you
      need.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </p>
    <div
      style={{
        background: '#f0f0f0',
        padding: '2rem',
        borderRadius: '8px',
        marginTop: '1rem',
      }}
    >
      <h3>Content Section</h3>
      <p>This is a content section with some styling applied.</p>
    </div>
  </div>
);

const SampleFooter = () => (
  <div style={{ textAlign: 'center', color: '#666' }}>
    <p>&copy; 2024 Your Company. All rights reserved.</p>
    <p>Privacy Policy | Terms of Service | Contact Us</p>
  </div>
);

export const Default: Story = {
  render: () => (
    <PageLayout
      header={<SampleHeader />}
      children={<SampleContent />}
      footer={<SampleFooter />}
    />
  ),
};

export const WithSidebar: Story = {
  render: () => (
    <PageLayout
      header={<SampleHeader />}
      sidebar={<SampleSidebar />}
      children={<SampleContent />}
      footer={<SampleFooter />}
      hasSidebar={true}
    />
  ),
};

export const ContentOnly: Story = {
  render: () => <PageLayout children={<SampleContent />} />,
};

export const CompactLayout: Story = {
  render: () => (
    <PageLayout
      header={<SampleHeader />}
      children={<SampleContent />}
      footer={<SampleFooter />}
      maxWidth='md'
      padding='sm'
    />
  ),
};
