import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArticleTOCOverlay } from './ArticleTOCOverlay';

const sampleItems = [
  { id: 'intro', title: '인트로' },
  { id: 'debounce', title: '디바운스 최적화' },
  { id: 'overlay', title: '오버레이 접근성' },
  { id: 'conclusion', title: '마무리' },
];

const meta: Meta<typeof ArticleTOCOverlay> = {
  title: 'Services/Articles/ArticleTOCOverlay',
  component: ArticleTOCOverlay,
  args: {
    items: sampleItems,
  },
  argTypes: {
    onNavigate: { action: 'navigate' },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ArticleTOCOverlay>;

export const Default: Story = {
  render: args => (
    <div style={{ minHeight: '120vh', padding: '32px', background: '#f8fafc' }}>
      <ArticleTOCOverlay {...args} />
      <div style={{ marginTop: '32px', display: 'grid', gap: '32px' }}>
        {args.items?.map(item => (
          <section
            key={item.id}
            id={item.id}
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
            }}
          >
            <h3 style={{ margin: '0 0 8px' }}>{item.title}</h3>
            <p style={{ margin: 0, color: '#475569' }}>
              샘플 본문입니다. 목차 버튼을 눌러 원하는 섹션으로 이동해 보세요.
            </p>
          </section>
        ))}
      </div>
    </div>
  ),
};

