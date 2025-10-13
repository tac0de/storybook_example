import type { Meta, StoryObj } from '@storybook/react-vite';
import MegaMenuNavigation from './MegaMenuNavigation';
import { megaMenuConfig } from '../../../Organisms/MegaMenu/megaMenuConfig';
import { megaMenuScrollDecorator } from '../../../../stories/searchLayerStoryHelpers';

const meta: Meta<typeof MegaMenuNavigation> = {
  title: 'Molecules/MegaMenu/MegaMenuNavigation',
  component: MegaMenuNavigation,
  tags: ['autodocs'],
  args: {
    config: megaMenuConfig,
  },
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 480 } } },
  decorators: [megaMenuScrollDecorator],
};

export default meta;
type Story = StoryObj<typeof MegaMenuNavigation>;

export const Default: Story = {};
