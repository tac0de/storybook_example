import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchLayerForm, { type SearchLayerFormProps } from './SearchLayerForm';
import { searchLayerBaseDecorator } from '../../../../stories/searchLayerStoryHelpers';

const meta: Meta<SearchLayerFormProps> = {
  title: 'Molecules/SearchLayer/SearchLayerForm',
  component: SearchLayerForm,
  tags: ['autodocs'],
  args: {
    placeholderHidden: true,
    showClearButton: true,
  },
  argTypes: {
    onSubmit: { action: 'submit' },
    onInput: { action: 'input' },
    onClear: { action: 'clear' },
  },
  parameters: { layout: 'padded' },
  decorators: [searchLayerBaseDecorator],
};

export default meta;
type Story = StoryObj<SearchLayerFormProps>;

export const Default: Story = {};
