import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Templates/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'minimal', 'elevated'],
    },
    sticky: {
      control: 'boolean',
    },
    transparent: {
      control: 'boolean',
    },
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

export const Default: Story = {
  render: () => (
    <Header>
      <SampleHeaderContent />
    </Header>
  ),
};

export const Minimal: Story = {
  render: () => (
    <Header variant='minimal'>
      <SampleHeaderContent />
    </Header>
  ),
};

export const Elevated: Story = {
  render: () => (
    <Header variant='elevated'>
      <SampleHeaderContent />
    </Header>
  ),
};

export const Sticky: Story = {
  render: () => (
    <Header sticky>
      <SampleHeaderContent />
    </Header>
  ),
};

export const Transparent: Story = {
  render: () => (
    <div
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem',
        minHeight: '200px',
      }}
    >
      <Header transparent>
        <SampleHeaderContent />
      </Header>
    </div>
  ),
};
