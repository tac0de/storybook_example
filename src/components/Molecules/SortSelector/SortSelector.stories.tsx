import type { Meta, StoryObj } from '@storybook/react-vite';
import { SortSelector } from './SortSelector';

const meta: Meta<typeof SortSelector> = {
  title: 'Molecules/SortSelector',
  component: SortSelector,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A reusable sort selector component that allows users to choose sorting options.',
      },
    },
  },
  argTypes: {
    value: {
      description: 'Currently selected sort value',
      control: 'text',
    },
    options: {
      description: 'Array of sort options',
      control: false,
    },
    onChange: {
      description: 'Callback when sort selection changes',
      control: false,
    },
    className: {
      description: 'Additional CSS class names',
      control: false,
    },
  },
  args: {
    value: 'newest',
    options: [
      { value: 'newest', label: '최신순' },
      { value: 'oldest', label: '오래된순' },
      { value: 'mostLiked', label: '좋아요순' },
      { value: 'mostReplied', label: '답글순' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof SortSelector>;

export const Default: Story = {
  render: (args) => (
    <SortSelector
      {...args}
      onChange={(value) => {
        console.log('Sort changed:', value);
        alert(`정렬이 ${value}로 변경되었습니다.`);
      }}
    />
  ),
};

export const CommentSort: Story = {
  args: {
    value: 'mostLiked',
    options: [
      { value: 'newest', label: '최신순' },
      { value: 'oldest', label: '오래된순' },
      { value: 'mostLiked', label: '좋아요순' },
      { value: 'mostReplied', label: '답글순' },
    ],
  },
};

export const ProductSort: Story = {
  args: {
    value: 'price_asc',
    options: [
      { value: 'newest', label: '최신순' },
      { value: 'price_asc', label: '가격 낮은순' },
      { value: 'price_desc', label: '가격 높은순' },
      { value: 'popular', label: '인기순' },
    ],
  },
};

export const UserSort: Story = {
  args: {
    value: 'name_asc',
    options: [
      { value: 'name_asc', label: '이름순' },
      { value: 'name_desc', label: '이름 역순' },
      { value: 'join_date', label: '가입일순' },
      { value: 'last_active', label: '최근 활동순' },
    ],
  },
}; 