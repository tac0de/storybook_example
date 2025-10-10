import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchLayerForm, { type SearchLayerFormProps } from './SearchLayerForm';
import { withCssAndShell } from '../../../../decorators/withCssAndShell';

const meta: Meta<SearchLayerFormProps> = {
  title: 'Molecules/SearchLayer/SearchLayerForm',
  component: SearchLayerForm,
  tags: ['autodocs'],
  args: {
    placeholderHidden: true,
  },
  argTypes: {
    onSubmit: { action: 'submit' },
    onInput: { action: 'input' },
  },
  parameters: { layout: 'padded' },
  decorators: [
    withCssAndShell({
      hrefs: ['/joongang-css/index.min.css'],
      bodyClass: ['index'],
    }),
  ],
};

export default meta;
type Story = StoryObj<SearchLayerFormProps>;

export const Default: Story = {};
