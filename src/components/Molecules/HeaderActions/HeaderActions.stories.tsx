import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeaderActions } from './HeaderActions';

const meta: Meta<typeof HeaderActions> = {
  title: 'Molecules/HeaderActions',
  component: HeaderActions,
  tags: ['autodocs'],
  args: {
    menuAriaLabel: '메뉴',
    searchAriaLabel: '검색',
    menuExpanded: false,
    searchExpanded: false,
    variant: 'default',
    containerClassName: undefined,
    menuButtonClassName: undefined,
    searchButtonClassName: undefined,
  },
  argTypes: {
    onOpenMegaMenu: { action: 'open-mega' },
    onOpenSearch: { action: 'open-search' },
    menuAriaLabel: { control: 'text' },
    searchAriaLabel: { control: 'text' },
    menuExpanded: { control: 'boolean' },
    searchExpanded: { control: 'boolean' },
    variant: { options: ['default', 'plus', 'sub', 'plus-sub'], control: 'inline-radio' },
    containerClassName: { control: 'text' },
    menuButtonClassName: { control: 'text' },
    searchButtonClassName: { control: 'text' },
  },
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof HeaderActions>;

export const Playground: Story = {};

export const ExpandedStates: Story = {
  args: { menuExpanded: true, searchExpanded: true },
};

export const WithCustomWrapper: Story = {
  args: {
    containerClassName: 'actions-wrapper',
    menuButtonClassName: 'actions-menu',
    searchButtonClassName: 'actions-search',
  },
};
