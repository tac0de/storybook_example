import { useState } from 'react';
import { Button } from './Button';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text', description: '버튼 텍스트' },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
      description: '버튼 변형',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: '버튼 크기',
    },
    disabled: { control: 'boolean', description: '비활성화 여부' },
    loading: { control: 'boolean', description: '로딩 상태' },
    fullWidth: { control: 'boolean', description: '전체 너비' },
    borderRadius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
      description: '테두리 반경',
    },
    color: { control: 'color', description: '텍스트 색상' },
    backgroundColor: { control: 'color', description: '배경 색상' },
    onClick: { action: 'clicked' },
  },
  parameters: {
    // Disable interaction testing for this component
    interactions: {
      disable: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 아이콘 컴포넌트들
const PlusIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z' />
  </svg>
);

const TrashIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' />
  </svg>
);

export const Default: Story = {
  render: () => {
    const [clicked, setClicked] = useState(false);
    return (
      <Button onClick={() => setClicked(!clicked)}>
        {clicked ? 'Clicked!' : 'Button'}
      </Button>
    );
  },
};

export const Variants: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4'>
      <Button variant='primary'>Primary</Button>
      <Button variant='secondary'>Secondary</Button>
      <Button variant='outline'>Outline</Button>
      <Button variant='ghost'>Ghost</Button>
      <Button variant='danger'>Danger</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <Button size='xs'>Extra Small</Button>
      <Button size='sm'>Small</Button>
      <Button size='md'>Medium</Button>
      <Button size='lg'>Large</Button>
      <Button size='xl'>Extra Large</Button>
    </div>
  ),
};

export const BorderRadius: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4'>
      <Button borderRadius='none'>No Radius</Button>
      <Button borderRadius='sm'>Small Radius</Button>
      <Button borderRadius='md'>Medium Radius</Button>
      <Button borderRadius='lg'>Large Radius</Button>
      <Button borderRadius='xl'>Extra Large Radius</Button>
      <Button borderRadius='full'>Full Radius</Button>
    </div>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4'>
      <Button color='#ffffff' backgroundColor='#8b5cf6'>
        Purple Button
      </Button>
      <Button color='#ffffff' backgroundColor='#10b981'>
        Green Button
      </Button>
      <Button color='#ffffff' backgroundColor='#f59e0b'>
        Orange Button
      </Button>
      <Button color='#1f2937' backgroundColor='#fbbf24'>
        Yellow Button
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4'>
      <Button leftIcon={<PlusIcon />}>Add Item</Button>
      <Button rightIcon={<ArrowRightIcon />}>Continue</Button>
      <Button leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
        Add & Continue
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4'>
      <Button loading>Loading...</Button>
      <Button loading variant='outline'>
        Loading...
      </Button>
      <Button loading variant='danger'>
        Deleting...
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4'>
      <Button disabled>Disabled</Button>
      <Button disabled variant='outline'>
        Disabled
      </Button>
      <Button disabled variant='danger'>
        Disabled
      </Button>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div className='space-y-4 max-w-md'>
      <Button fullWidth>Full Width Button</Button>
      <Button fullWidth variant='outline'>
        Full Width Outline
      </Button>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [count, setCount] = useState(0);
    return (
      <Button onClick={() => setCount(count + 1)}>Clicked {count} times</Button>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className='space-y-6'>
      <div>
        <h3 className='font-semibold mb-2'>Variants</h3>
        <div className='flex flex-wrap gap-2'>
          <Button variant='primary'>Primary</Button>
          <Button variant='secondary'>Secondary</Button>
          <Button variant='outline'>Outline</Button>
          <Button variant='ghost'>Ghost</Button>
          <Button variant='danger'>Danger</Button>
        </div>
      </div>

      <div>
        <h3 className='font-semibold mb-2'>Sizes</h3>
        <div className='flex items-center gap-2'>
          <Button size='xs'>XS</Button>
          <Button size='sm'>SM</Button>
          <Button size='md'>MD</Button>
          <Button size='lg'>LG</Button>
          <Button size='xl'>XL</Button>
        </div>
      </div>

      <div>
        <h3 className='font-semibold mb-2'>Border Radius</h3>
        <div className='flex flex-wrap gap-2'>
          <Button borderRadius='none'>None</Button>
          <Button borderRadius='sm'>Small</Button>
          <Button borderRadius='md'>Medium</Button>
          <Button borderRadius='lg'>Large</Button>
          <Button borderRadius='xl'>XL</Button>
          <Button borderRadius='full'>Full</Button>
        </div>
      </div>

      <div>
        <h3 className='font-semibold mb-2'>Custom Colors</h3>
        <div className='flex flex-wrap gap-2'>
          <Button color='#ffffff' backgroundColor='#8b5cf6'>
            Purple
          </Button>
          <Button color='#ffffff' backgroundColor='#10b981'>
            Green
          </Button>
          <Button color='#ffffff' backgroundColor='#f59e0b'>
            Orange
          </Button>
        </div>
      </div>

      <div>
        <h3 className='font-semibold mb-2'>With Icons</h3>
        <div className='flex flex-wrap gap-2'>
          <Button leftIcon={<PlusIcon />}>Add</Button>
          <Button rightIcon={<ArrowRightIcon />}>Next</Button>
          <Button leftIcon={<TrashIcon />} variant='danger'>
            Delete
          </Button>
        </div>
      </div>

      <div>
        <h3 className='font-semibold mb-2'>States</h3>
        <div className='flex flex-wrap gap-2'>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button loading disabled>
            Loading Disabled
          </Button>
        </div>
      </div>
    </div>
  ),
};
