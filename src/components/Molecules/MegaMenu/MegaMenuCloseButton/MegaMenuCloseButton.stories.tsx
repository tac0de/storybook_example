import type { Meta, StoryObj } from '@storybook/react-vite';
import MegaMenuCloseButton, { type MegaMenuCloseButtonProps } from './MegaMenuCloseButton';
import { megaMenuLayerDecorator } from '../../../../stories/searchLayerStoryHelpers';

const meta: Meta<MegaMenuCloseButtonProps> = {
  title: 'Molecules/MegaMenu/MegaMenuCloseButton',
  component: MegaMenuCloseButton,
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'close' },
  },
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 480 } } },
  decorators: [megaMenuLayerDecorator],
};

export default meta;
type Story = StoryObj<MegaMenuCloseButtonProps>;

export const Default: Story = {};
