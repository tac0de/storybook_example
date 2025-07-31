import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Sidebar } from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Templates/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['left', 'right'],
    },
    width: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['default', 'minimal', 'elevated'],
    },
    collapsible: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

const SampleSidebarContent = () => (
  <div>
    <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Navigation</h3>
    <nav>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <li style={{ marginBottom: '0.5rem' }}>
          <a
            href='#'
            style={{
              display: 'block',
              padding: '0.5rem',
              textDecoration: 'none',
              color: '#333',
              borderRadius: '4px',
              transition: 'background-color 0.2s',
            }}
          >
            Dashboard
          </a>
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <a
            href='#'
            style={{
              display: 'block',
              padding: '0.5rem',
              textDecoration: 'none',
              color: '#333',
              borderRadius: '4px',
              transition: 'background-color 0.2s',
            }}
          >
            Profile
          </a>
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <a
            href='#'
            style={{
              display: 'block',
              padding: '0.5rem',
              textDecoration: 'none',
              color: '#333',
              borderRadius: '4px',
              transition: 'background-color 0.2s',
            }}
          >
            Settings
          </a>
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <a
            href='#'
            style={{
              display: 'block',
              padding: '0.5rem',
              textDecoration: 'none',
              color: '#333',
              borderRadius: '4px',
              transition: 'background-color 0.2s',
            }}
          >
            Help
          </a>
        </li>
      </ul>
    </nav>
  </div>
);

const SidebarWrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'flex',
      height: '400px',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      overflow: 'hidden',
    }}
  >
    {children}
    <div
      style={{
        flex: 1,
        padding: '2rem',
        background: '#f9f9f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h3>Main Content Area</h3>
        <p>This is the main content that appears alongside the sidebar.</p>
      </div>
    </div>
  </div>
);

export const Default: Story = {
  render: () => (
    <SidebarWrapper>
      <Sidebar>
        <SampleSidebarContent />
      </Sidebar>
    </SidebarWrapper>
  ),
};

export const RightPosition: Story = {
  render: () => (
    <SidebarWrapper>
      <Sidebar position='right'>
        <SampleSidebarContent />
      </Sidebar>
    </SidebarWrapper>
  ),
};

export const SmallWidth: Story = {
  render: () => (
    <SidebarWrapper>
      <Sidebar width='sm'>
        <SampleSidebarContent />
      </Sidebar>
    </SidebarWrapper>
  ),
};

export const LargeWidth: Story = {
  render: () => (
    <SidebarWrapper>
      <Sidebar width='xl'>
        <SampleSidebarContent />
      </Sidebar>
    </SidebarWrapper>
  ),
};

export const Minimal: Story = {
  render: () => (
    <SidebarWrapper>
      <Sidebar variant='minimal'>
        <SampleSidebarContent />
      </Sidebar>
    </SidebarWrapper>
  ),
};

export const Elevated: Story = {
  render: () => (
    <SidebarWrapper>
      <Sidebar variant='elevated'>
        <SampleSidebarContent />
      </Sidebar>
    </SidebarWrapper>
  ),
};

export const Collapsible: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
      <SidebarWrapper>
        <Sidebar
          collapsible
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        >
          <SampleSidebarContent />
        </Sidebar>
      </SidebarWrapper>
    );
  },
};
