import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeaderActions } from './HeaderActions';
import { withCssLinks } from '../../../decorators/withCssLinks';

const meta: Meta<typeof HeaderActions> = {
  title: 'Molecules/HeaderActions',
  component: HeaderActions,
  tags: ['autodocs'],
  argTypes: {
    onOpenMegaMenu: { action: 'open-mega' },
    onOpenSearch: { action: 'open-search' },
    menuAriaLabel: { control: 'text' },
    searchAriaLabel: { control: 'text' },
    menuExpanded: { control: 'boolean' },
    searchExpanded: { control: 'boolean' },
  },
  args: {
    menuAriaLabel: '메뉴',
    searchAriaLabel: '검색',
    menuExpanded: false,
    searchExpanded: false,
  },
  parameters: { layout: 'padded' },
  decorators: [
    withCssLinks({
      hrefs: ['/joongang-css/index.min.css'],
      bodyClass: ['index'],
    }),
  ],
};
export default meta;

type Story = StoryObj<typeof HeaderActions>;

export const Playground: Story = {};

export const ExpandedStates: Story = {
  args: { menuExpanded: true, searchExpanded: true },
};
