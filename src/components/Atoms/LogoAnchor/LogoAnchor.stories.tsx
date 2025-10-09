import type { Meta, StoryObj } from '@storybook/react-vite';
import { LogoAnchor } from './LogoAnchor';
import { withCssAndShell } from '../../../decorators/withCssAndShell';

const meta: Meta<typeof LogoAnchor> = {
  title: 'Atoms/LogoAnchor',
  component: LogoAnchor,
  tags: ['autodocs'],
  args: {
    href: 'https://www.joongang.co.kr',
    ariaLabel: '중앙일보',
    baseClassName: 'logo',
    children: (
      <img
        width={178}
        height={26}
        src="https://img.joongang.co.kr/pubimg/logo/logo_thejoongang.png"
        alt="중앙일보"
      />
    ),
  },
  argTypes: {
    href: { control: 'text' },
    ariaLabel: { control: 'text' },
    baseClassName: { control: 'text' },
    className: { control: 'text' },
  },
  decorators: [
    withCssAndShell({
      hrefs: ['/joongang-css/index.min.css'],
    }),
  ],
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof LogoAnchor>;

export const Playground: Story = {};

export const WithoutBaseClass: Story = {
  args: {
    baseClassName: '',
    children: (
      <span className="visually_hidden">
        중앙일보
      </span>
    ),
  },
};
