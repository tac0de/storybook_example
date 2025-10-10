import type { Meta, StoryObj } from '@storybook/react-vite';
import MegaMenuMobileFooter from './MegaMenuMobileFooter';
import { withCssAndShell } from '../../../../decorators/withCssAndShell';

const meta: Meta<typeof MegaMenuMobileFooter> = {
  title: 'Molecules/MegaMenu/MegaMenuMobileFooter',
  component: MegaMenuMobileFooter,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    withCssAndShell({
      hrefs: ['/joongang-css/index.min.css'],
      structure: 'div.full_popup.menu_popup.show',
      bodyClass: ['index'],
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof MegaMenuMobileFooter>;

export const Default: Story = {};
