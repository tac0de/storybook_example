import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchLayer, { type SearchLayerProps } from './SearchLayer';
import HeaderShell from '../../../layouts/Header/HeaderShell';

// 전역 index.css가 preview.ts(또는 .storybook/preview.js)에서 import 되어 있어야 합니다.
// 필요 시 이 파일 상단에서 직접 import 해도 됩니다.
// import '../../../styles/index.css';

const meta: Meta<SearchLayerProps> = {
  title: 'Organisms/SearchLayer',
  component: SearchLayer,
  tags: ['autodocs'],
  parameters: {
    // docs: {
    //   story: { inline: false },
    //   container: ({ children, context }) => (
    //     <DocsContainer context={context}>
    //       <style>
    //         {`
    //         .sb-main-padded { // Or a more specific selector for the canvas content area
    //           height: 100vh;
    //           overflow: auto; // Add overflow if content might exceed viewport
    //         }
    //       `}
    //       </style>
    //       {children}
    //     </DocsContainer>
    //   ),
    // },
    layout: 'fullscreen', // 메뉴는 풀화면으로 보이게
  },
  args: {
    open: true,
  },
  argTypes: {
    onClose: { action: 'closed' },
  },

  decorators: [
    Story => (
      <HeaderShell>
        <Story />
      </HeaderShell>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof SearchLayer>;

export const Default: Story = {};
