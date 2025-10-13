import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchLayerTrendSection from './SearchLayerTrendSection';
import { searchLayerBaseDecorator } from '../../../../stories/searchLayerStoryHelpers';

const meta: Meta<typeof SearchLayerTrendSection> = {
  title: 'Molecules/SearchLayer/SearchLayerTrendSection',
  component: SearchLayerTrendSection,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [searchLayerBaseDecorator],
};

export default meta;
type Story = StoryObj<typeof SearchLayerTrendSection>;

export const Default: Story = {};
