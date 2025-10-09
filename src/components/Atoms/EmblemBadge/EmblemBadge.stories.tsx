import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmblemBadge } from './EmblemBadge';
import { withCssAndShell } from '../../../decorators/withCssAndShell';

const meta: Meta<typeof EmblemBadge> = {
  title: 'Atoms/EmblemBadge',
  component: EmblemBadge,
  tags: ['autodocs'],
  args: {
    ariaLabel: '60주년',
    iconClassName: 'ico_emblem60',
    spanClassName: 'emblem',
  },
  argTypes: {
    ariaLabel: { control: 'text' },
    iconClassName: { control: 'text' },
    spanClassName: { control: 'text' },
  },
  decorators: [
    withCssAndShell({
      hrefs: ['/joongang-css/index.min.css'],
    }),
  ],
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof EmblemBadge>;

export const Playground: Story = {};
