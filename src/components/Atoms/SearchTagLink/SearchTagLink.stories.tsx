import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchTagLink, { type SearchTagLinkProps } from './SearchTagLink';

const meta: Meta<typeof SearchTagLink> = {
  title: 'Atoms/SearchTagLink',
  component: SearchTagLink,
  tags: ['autodocs'],
  args: {
    href: '#',
    label: '샘플 태그',
  },
};

export default meta;
type Story = StoryObj<SearchTagLinkProps>;

export const Default: Story = {};

export const WithTracking: Story = {
  args: {
    label: '트렌드 키워드',
    eventCategory: 'area:중앙|홈',
    eventAction: 'move:search_검색창',
    eventLabel: '트렌드 키워드_샘플',
  },
};

export const External: Story = {
  args: {
    href: 'https://www.joongang.co.kr',
    targetBlank: true,
  },
};
