import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Templates/Footer',
  component: Footer,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'minimal', 'dark'],
    },
    fixed: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

const SampleFooterContent = () => (
  <div style={{ textAlign: 'center' }}>
    <p style={{ margin: '0 0 1rem 0' }}>
      &copy; 2024 Your Company. All rights reserved.
    </p>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
      <a href='#' style={{ textDecoration: 'none', color: 'inherit' }}>
        Privacy Policy
      </a>
      <a href='#' style={{ textDecoration: 'none', color: 'inherit' }}>
        Terms of Service
      </a>
      <a href='#' style={{ textDecoration: 'none', color: 'inherit' }}>
        Contact Us
      </a>
    </div>
  </div>
);

export const Default: Story = {
  render: () => (
    <div
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ flex: 1, padding: '2rem' }}>
        <h2>Page Content</h2>
        <p>
          This is the main content area. The footer will appear at the bottom.
        </p>
      </div>
      <Footer>
        <SampleFooterContent />
      </Footer>
    </div>
  ),
};

export const Minimal: Story = {
  render: () => (
    <div
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ flex: 1, padding: '2rem' }}>
        <h2>Page Content</h2>
        <p>This is the main content area with a minimal footer.</p>
      </div>
      <Footer variant='minimal'>
        <SampleFooterContent />
      </Footer>
    </div>
  ),
};

export const Dark: Story = {
  render: () => (
    <div
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ flex: 1, padding: '2rem' }}>
        <h2>Page Content</h2>
        <p>This is the main content area with a dark footer.</p>
      </div>
      <Footer variant='dark'>
        <SampleFooterContent />
      </Footer>
    </div>
  ),
};

export const Fixed: Story = {
  render: () => (
    <div style={{ paddingBottom: '100px' }}>
      <div style={{ padding: '2rem' }}>
        <h2>Page Content</h2>
        <p>This content has a fixed footer at the bottom of the viewport.</p>
        <p>Scroll down to see the fixed footer behavior.</p>
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            style={{
              margin: '1rem 0',
              padding: '1rem',
              background: '#f0f0f0',
              borderRadius: '4px',
            }}
          >
            Content section {i + 1}
          </div>
        ))}
      </div>
      <Footer fixed>
        <SampleFooterContent />
      </Footer>
    </div>
  ),
};
