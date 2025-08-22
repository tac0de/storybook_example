import type { Meta, StoryObj } from '@storybook/react';
import TextLink, { type TextLinkProps } from './TextLink';

const meta: Meta<TextLinkProps> = {
  title: 'Atoms/TextLink',
  component: TextLink,
  args: {
    href: '#',
    children: '링크 텍스트',
  },
  argTypes: {
    active: { control: 'boolean' },
    muted: { control: 'boolean' },
    withSeparator: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<TextLinkProps>;

export const Default: Story = {};

export const Active: Story = {
  args: { active: true, children: '현재 페이지' },
};

export const Muted: Story = {
  args: { muted: true, children: '비활성 링크' },
};

export const WithSeparator: Story = {
  args: { withSeparator: true, children: '구분된 링크' },
};

export const Group: Story = {
  render: () => (
    <div>
      <TextLink href="#">日文</TextLink>
      <TextLink href="#" withSeparator>
        中文
      </TextLink>
      <TextLink href="#" withSeparator>
        ENG
      </TextLink>
      <TextLink href="#">로그아웃</TextLink>
      <TextLink href="#" active>
        마이페이지
      </TextLink>
    </div>
  ),
};
