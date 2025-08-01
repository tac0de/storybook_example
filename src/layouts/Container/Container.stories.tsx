import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container } from './Container';

const meta: Meta<typeof Container> = {
  title: 'Layouts/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A container component that provides consistent spacing and width constraints for content layout.',
      },
    },
  },
  argTypes: {
    maxWidth: {
      description: 'Maximum width constraint for the container',
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    padding: {
      description: 'Padding applied to the container',
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    centered: {
      description: 'Whether the container should be centered horizontally',
      control: 'boolean',
    },
    fluid: {
      description:
        'Whether the container should use full width without max-width constraints',
      control: 'boolean',
    },
    children: {
      description: 'Content to render inside the container',
      control: false,
    },
  },
  args: {
    maxWidth: 'lg',
    padding: 'md',
    centered: true,
    fluid: false,
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

const SampleContent = () => (
  <div
    style={{
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      padding: '2rem',
      borderRadius: '12px',
      border: '1px solid #dee2e6',
      textAlign: 'center',
      minHeight: '200px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <h3 style={{ color: '#495057', marginBottom: '1rem' }}>
      Container Content
    </h3>
    <p style={{ color: '#6c757d', margin: 0, maxWidth: '400px' }}>
      This content is wrapped in a container component that provides consistent
      spacing and max-width constraints.
    </p>
  </div>
);

export const Default: Story = {
  render: args => (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', padding: '2rem' }}>
      <Container {...args}>
        <SampleContent />
      </Container>
    </div>
  ),
};
