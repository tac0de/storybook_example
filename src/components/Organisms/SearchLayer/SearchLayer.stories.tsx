import type { Meta, StoryObj } from '@storybook/react';
import { SearchLayer } from './SearchLayer';

// 전역 index.css가 preview.ts(또는 .storybook/preview.js)에서 import 되어 있어야 합니다.
// 필요 시 이 파일 상단에서 직접 import 해도 됩니다.
// import '../../../styles/index.css';

const meta: Meta<typeof SearchLayer> = {
  title: 'Organisms/SearchLayer',
  component: SearchLayer,
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj<typeof SearchLayer>;

export const Default: Story = {};
