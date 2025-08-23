import type { Meta, StoryObj } from '@storybook/react';
import Button, { type ButtonProps } from './Button';
import Icon from '../Icon/Icon';

const meta: Meta<ButtonProps> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: { layout: 'centered' },
  args: {
    children: 'Button',
    variant: 'solid',
    size: 'md',
    pill: false,
    fullWidth: false,
    loading: false,
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['solid', 'outline', 'ghost', 'link'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    pill: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<ButtonProps>;

export const Playground: Story = {};

export const Variants: Story = {
  render: args => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button {...args} variant="solid">
        Solid
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="link">
        Link
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: args => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button {...args} variant="outline" trailingIcon={<Icon name="chevron_right" ariaLabel="" customWidth={7} />}>
        Next
      </Button>
      <Button {...args} variant="outline" pill leadingIcon={<Icon name="navbar" ariaLabel="" size="sm" />}>
        The JoongAng Plus
      </Button>
    </div>
  ),
};

export const MultipleIcons: Story = {
  render: args => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button
        {...args}
        variant="outline"
        iconOnly
        pill
        iconsGap={8}
        icons={[
          <Icon name="logo_plus" ariaLabel="" customWidth={122} />,
          <Icon name="chevron_right" ariaLabel="" customWidth={7} />,
        ]}
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: args => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  args: { loading: true, loadingLabel: 'Submitting' },
};
