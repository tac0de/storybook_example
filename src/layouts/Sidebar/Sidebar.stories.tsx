import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Sidebar } from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Layouts/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A sidebar component with positioning, sizing, and collapsible options for navigation layouts.',
      },
    },
  },
  argTypes: {
    position: {
      description: 'Position of the sidebar relative to the main content',
      control: 'select',
      options: ['left', 'right'],
    },
    width: {
      description: 'Width size of the sidebar',
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    variant: {
      description: 'Visual style variant of the sidebar',
      control: 'select',
      options: ['default', 'minimal', 'elevated'],
    },
    collapsible: {
      description: 'Whether the sidebar can be collapsed',
      control: 'boolean',
    },
    collapsed: {
      description: 'Whether the sidebar is currently collapsed',
      control: 'boolean',
    },
    onToggle: {
      description: 'Callback function when sidebar is toggled',
      control: false,
    },
    children: {
      description: 'Content to render inside the sidebar',
      control: false,
    },
  },
  args: {
    position: 'left',
    width: 'md',
    variant: 'default',
    collapsible: false,
    collapsed: false,
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

const SampleSidebarContent = () => (
  <div style={{ padding: '1rem' }}>
    <h3
      style={{
        marginTop: 0,
        marginBottom: '1.5rem',
        color: '#495057',
        fontSize: '1.1rem',
        fontWeight: '600',
      }}
    >
      Navigation
    </h3>
    <nav>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {['Dashboard', 'Profile', 'Settings', 'Help'].map(item => (
          <li key={item} style={{ marginBottom: '0.5rem' }}>
            <a
              href='#'
              style={{
                display: 'block',
                padding: '0.75rem 1rem',
                textDecoration: 'none',
                color: '#495057',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                fontWeight: '500',
                border: '1px solid transparent',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#e9ecef';
                e.currentTarget.style.color = '#212529';
                e.currentTarget.style.borderColor = '#dee2e6';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#495057';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </div>
);

const SidebarWrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'flex',
      height: '500px',
      border: '1px solid #dee2e6',
      borderRadius: '12px',
      overflow: 'hidden',
      background: '#fff',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    }}
  >
    {children}
    <div
      style={{
        flex: 1,
        padding: '2rem',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '400px' }}>
        <h3 style={{ color: '#495057', marginBottom: '1rem' }}>
          Main Content Area
        </h3>
        <p style={{ color: '#6c757d', margin: 0, lineHeight: '1.6' }}>
          This is the main content that appears alongside the sidebar. The
          layout is responsive and adapts to different screen sizes.
        </p>
      </div>
    </div>
  </div>
);

export const Default: Story = {
  render: args => (
    <div style={{ padding: '2rem', background: '#f8f9fa', minHeight: '100vh' }}>
      <SidebarWrapper>
        <Sidebar {...args}>
          <SampleSidebarContent />
        </Sidebar>
      </SidebarWrapper>
    </div>
  ),
};

// export const RightPosition: Story = {
//   render: args => (
//     <div style={{ padding: '2rem', background: '#f8f9fa', minHeight: '100vh' }}>
//       <SidebarWrapper>
//         <Sidebar {...args} position='right'>
//           <SampleSidebarContent />
//         </Sidebar>
//       </SidebarWrapper>
//     </div>
//   ),
// };

// export const Minimal: Story = {
//   render: args => (
//     <div style={{ padding: '2rem', background: '#f8f9fa', minHeight: '100vh' }}>
//       <SidebarWrapper>
//         <Sidebar {...args} variant='minimal'>
//           <SampleSidebarContent />
//         </Sidebar>
//       </SidebarWrapper>
//     </div>
//   ),
// };

const CollapsibleRenderer: StoryFn<typeof Sidebar> = args => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ padding: '2rem', background: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            padding: '0.5rem 1rem',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          {collapsed ? 'Expand' : 'Collapse'} Sidebar
        </button>
      </div>
      <SidebarWrapper>
        <Sidebar
          {...args}
          collapsible
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        >
          <SampleSidebarContent />
        </Sidebar>
      </SidebarWrapper>
    </div>
  );
};

export const Collapsible: Story = {
  render: CollapsibleRenderer,
};
