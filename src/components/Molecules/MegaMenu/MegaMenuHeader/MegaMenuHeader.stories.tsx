import type { Meta, StoryObj } from '@storybook/react-vite';
import MegaMenuHeader from './MegaMenuHeader';
import { withCssAndShell } from '../../../../decorators/withCssAndShell';

const meta: Meta<typeof MegaMenuHeader> = {
  title: 'Molecules/MegaMenu/MegaMenuHeader',
  component: MegaMenuHeader,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    withCssAndShell({
      hrefs: ['/joongang-css/index.min.css'],
      structure: 'header.header.nav_re',
      bodyClass: ['index'],
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof MegaMenuHeader>;

export const Default: Story = {};
