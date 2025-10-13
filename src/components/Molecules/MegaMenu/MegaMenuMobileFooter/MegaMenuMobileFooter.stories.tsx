import type { Meta, StoryObj } from '@storybook/react-vite';
import MegaMenuMobileFooter from './MegaMenuMobileFooter';
import { megaMenuScrollDecorator } from '../../../../stories/searchLayerStoryHelpers';

const meta: Meta<typeof MegaMenuMobileFooter> = {
  title: 'Molecules/MegaMenu/MegaMenuMobileFooter',
  component: MegaMenuMobileFooter,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [megaMenuScrollDecorator],
};

export default meta;
type Story = StoryObj<typeof MegaMenuMobileFooter>;

export const Default: Story = {};
