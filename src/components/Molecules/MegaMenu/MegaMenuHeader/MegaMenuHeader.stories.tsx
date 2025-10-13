import type { Meta, StoryObj } from '@storybook/react-vite';
import MegaMenuHeader from './MegaMenuHeader';
import { megaMenuLayerDecorator } from '../../../../stories/searchLayerStoryHelpers';

const meta: Meta<typeof MegaMenuHeader> = {
  title: 'Molecules/MegaMenu/MegaMenuHeader',
  component: MegaMenuHeader,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [megaMenuLayerDecorator],
};

export default meta;
type Story = StoryObj<typeof MegaMenuHeader>;

export const Default: Story = {};
