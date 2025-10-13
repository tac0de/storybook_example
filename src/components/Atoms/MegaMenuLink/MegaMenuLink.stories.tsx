import type { Meta, StoryObj } from '@storybook/react-vite';
import MegaMenuLink, { type MegaMenuLinkProps } from './MegaMenuLink';

const meta: Meta<typeof MegaMenuLink> = {
  title: 'Atoms/MegaMenuLink',
  component: MegaMenuLink,
  tags: ['autodocs'],
  args: {
    href: 'https://www.joongang.co.kr',
    label: '샘플 링크',
  },
};

export default meta;
type Story = StoryObj<MegaMenuLinkProps>;

export const Default: Story = {};

export const WithNewBadge: Story = {
  args: {
    withNew: true,
  },
};

export const External: Story = {
  args: {
    ext: true,
  },
};
