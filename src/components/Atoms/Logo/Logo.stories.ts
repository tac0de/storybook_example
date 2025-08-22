import type { Meta, StoryObj } from '@storybook/react';
import Logo, { type LogoProps } from './Logo';

const meta: Meta<LogoProps> = {
  title: 'Atoms/Logo',
  component: Logo,
  parameters: { layout: 'centered' },
  args: {
    variant: 'mark',
    alt: 'JoongAng 60th logo',
  },
};

export default meta;
type Story = StoryObj<LogoProps>;

export const MarkOnly: Story = { args: { variant: 'mark', alt: 'JoongAng 60th logo' } };
export const WordOnly: Story = { args: { variant: 'word', alt: 'The JoongAng wordmark' } };
