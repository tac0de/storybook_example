import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchLayerAiTagSection from './SearchLayerAiTagSection';
import { withCssAndShell } from '../../../../decorators/withCssAndShell';

const meta: Meta<typeof SearchLayerAiTagSection> = {
  title: 'Molecules/SearchLayer/SearchLayerAiTagSection',
  component: SearchLayerAiTagSection,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    withCssAndShell({
      hrefs: ['/joongang-css/index.min.css'],
      bodyClass: ['index'],
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof SearchLayerAiTagSection>;

export const Default: Story = {};
