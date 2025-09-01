import type { Meta, StoryObj } from '@storybook/react';
import BrandBlock, { type BrandBlockProps } from './BrandBlock';

const meta: Meta<BrandBlockProps> = {
  title: 'Molecules/BrandBlock',
  component: BrandBlock,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    mode: 'separate',
    wordWidth: 180,
    gap: 8,
    compact: false,
    href: undefined,
  },
  argTypes: {
    mode: { control: 'inline-radio', options: ['separate', 'full'] },
    wordWidth: { control: { type: 'number', min: 60, step: 10 } },
    wordHeight: { control: { type: 'number', min: 16, step: 2 } },
    gap: { control: { type: 'number', min: 0, max: 24, step: 1 } },
    compact: { control: 'boolean' },
    href: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<BrandBlockProps>;

export const CustomSizes: Story = {
  args: {
    markWidth: 56,
    wordWidth: 127,
    gap: 10,
  },
};

export const AsLink: Story = {
  args: {
    href: '#',
  },
};
