import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchLayerMostViewed from './SearchLayerMostViewed';
import { searchLayerBaseDecorator } from '../../../../stories/searchLayerStoryHelpers';

const meta: Meta<typeof SearchLayerMostViewed> = {
  title: 'Molecules/SearchLayer/SearchLayerMostViewed',
  component: SearchLayerMostViewed,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [searchLayerBaseDecorator],
};

export default meta;
type Story = StoryObj<typeof SearchLayerMostViewed>;

export const Default: Story = {};
