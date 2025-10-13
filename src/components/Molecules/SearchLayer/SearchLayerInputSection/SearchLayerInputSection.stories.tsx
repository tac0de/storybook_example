import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchLayerInputSection from './SearchLayerInputSection';
import { searchLayerBaseDecorator } from '../../../../stories/searchLayerStoryHelpers';

const meta: Meta<typeof SearchLayerInputSection> = {
  title: 'Molecules/SearchLayer/SearchLayerInputSection',
  component: SearchLayerInputSection,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [searchLayerBaseDecorator],
};

export default meta;
type Story = StoryObj<typeof SearchLayerInputSection>;

export const Default: Story = {};
