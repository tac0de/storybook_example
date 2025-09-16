// src/layouts/Header/Headers.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import GlobalHeader from './GlobalHeader';
import SubHeader from './SubHeader';

import { withCss } from '../../decorators/withShadowCss';

export default {
  title: 'Layouts/Headers',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

type Story = StoryObj;

export const GlobalHeaderDesktop: Story = {
  name: 'GlobalHeader (Desktop)',
  decorators: [
    withCss({
      mode: 'auto-docs-shadow',
      hrefs: ['/legacy.css'],
      bodyClass: 'index re',
    }),
  ],
  render: args => <GlobalHeader {...args} />,
};

export const SubHeaderDesktop: Story = {
  name: 'SubHeader (Desktop)',
  decorators: [
    withCss({
      mode: 'auto-docs-shadow',
      hrefs: ['/joongang-css/layout.min.css?v=202508281501'],
      bodyClass: 'index',
    }),
  ],
  render: args => <SubHeader {...args} />,
};
