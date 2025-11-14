import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArticlePage } from './ArticlePage';

const meta: Meta<typeof ArticlePage> = {
  title: 'Pages/ArticlePage',
  component: ArticlePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '중앙일보 온라인 지면을 참고해 만든 기사 템플릿입니다. 모든 훅과 패턴이 한 페이지에서 엮이는 예시를 Docs 탭에서 확인하세요.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ArticlePage>;

export const Default: Story = {
  render: () => <ArticlePage />,
  parameters: {
    docs: {
      description: {
        story:
          'JoongAng Insight Edition 뷰. Story 탭에서는 인터랙션을 체험하고, Docs 탭에서는 컴포넌트 API를 확인할 수 있습니다.',
      },
    },
  },
};
