import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container } from './Container';

const meta: Meta<typeof Container> = {
  title: 'Templates/Container',
  component: Container,
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
    centered: {
      control: 'boolean',
    },
    fluid: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

const SampleContent = () => (
  <div
    style={{
      background: '#f0f0f0',
      padding: '2rem',
      borderRadius: '8px',
      textAlign: 'center',
    }}
  >
    <h3>Container Content</h3>
    <p>This content is wrapped in a container component.</p>
    <p>The container provides consistent spacing and max-width constraints.</p>
  </div>
);

export const Default: Story = {
  render: () => (
    <Container>
      <SampleContent />
    </Container>
  ),
};

export const SmallWidth: Story = {
  render: () => (
    <Container maxWidth='sm'>
      <SampleContent />
    </Container>
  ),
};

export const LargeWidth: Story = {
  render: () => (
    <Container maxWidth='xl'>
      <SampleContent />
    </Container>
  ),
};

export const NoPadding: Story = {
  render: () => (
    <Container padding='none'>
      <SampleContent />
    </Container>
  ),
};

export const Fluid: Story = {
  render: () => (
    <Container fluid>
      <SampleContent />
    </Container>
  ),
};
