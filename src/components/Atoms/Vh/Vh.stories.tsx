import type { Meta, StoryObj } from '@storybook/react-vite';
import { Vh } from './Vh';

const meta: Meta<typeof Vh> = {
  title: 'Atoms/Vh',
  component: Vh,
  tags: ['autodocs'],
  args: {
    children: '스크린리더 전용 텍스트',
    as: 'span',
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['span', 'div', 'label', 'em', 'strong'],
    },
    className: { control: 'text' },
    children: { control: 'text' },
  },
  parameters: {
    layout: 'padded',
  },
};
export default meta;

type Story = StoryObj<typeof Vh>;

export const Playground: Story = {};

export const InButton: Story = {
  render: args => (
    <button
      type="button"
      className="btn_search"
      onClick={() => {
        //
      }}
    >
      <i className="ico_search" aria-hidden="true" />
      <Vh {...args}>검색 열기</Vh>
    </button>
  ),
};

export const InLink: Story = {
  render: args => (
    <a href="#" onClick={e => e.preventDefault()} className="newspaper">
      <i className="ico_newspaper black" aria-hidden="true" />
      <Vh {...args}>지면보기</Vh>
    </a>
  ),
};
