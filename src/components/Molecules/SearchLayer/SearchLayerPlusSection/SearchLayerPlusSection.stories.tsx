import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchLayerPlusSection from './SearchLayerPlusSection';
import { searchLayerBaseDecorator } from '../../../../stories/searchLayerStoryHelpers';

const meta: Meta<typeof SearchLayerPlusSection> = {
  title: 'Molecules/SearchLayer/SearchLayerPlusSection',
  component: SearchLayerPlusSection,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [searchLayerBaseDecorator],
};

export default meta;
type Story = StoryObj<typeof SearchLayerPlusSection>;

export const Default: Story = {};
