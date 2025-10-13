import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchLayerAiTagSection from './SearchLayerAiTagSection';
import { searchLayerBaseDecorator } from '../../../../stories/searchLayerStoryHelpers';

const meta: Meta<typeof SearchLayerAiTagSection> = {
  title: 'Molecules/SearchLayer/SearchLayerAiTagSection',
  component: SearchLayerAiTagSection,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [searchLayerBaseDecorator],
};

export default meta;
type Story = StoryObj<typeof SearchLayerAiTagSection>;

export const Default: Story = {};
