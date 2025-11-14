import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArticleSearchInput } from './ArticleSearchInput';

const meta: Meta<typeof ArticleSearchInput> = {
  title: 'Services/Articles/ArticleSearchInput',
  component: ArticleSearchInput,
  args: {
    delay: 300,
    placeholder: '본문 검색 (디바운스)',
  },
  argTypes: {
    onDebouncedChange: { action: 'debounced change' },
    delay: { control: { type: 'number', min: 0, step: 50 } },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ArticleSearchInput>;

export const Playground: Story = {
  render: args => {
    const [value, setValue] = React.useState('');
    return (
      <div style={{ display: 'grid', gap: '8px', minWidth: '360px' }}>
        <ArticleSearchInput
          {...args}
          onDebouncedChange={val => {
            setValue(val);
            args.onDebouncedChange?.(val);
          }}
        />
        <small style={{ color: '#475569' }}>디바운스 값: {value || '(없음)'}</small>
      </div>
    );
  },
};

