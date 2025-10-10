import type { Meta, StoryObj } from '@storybook/react-vite';
import MegaMenuCloseButton, { type MegaMenuCloseButtonProps } from './MegaMenuCloseButton';
import { withCssAndShell } from '../../../../decorators/withCssAndShell';

const meta: Meta<MegaMenuCloseButtonProps> = {
  title: 'Molecules/MegaMenu/MegaMenuCloseButton',
  component: MegaMenuCloseButton,
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'close' },
  },
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
type Story = StoryObj<MegaMenuCloseButtonProps>;

export const Default: Story = {};
