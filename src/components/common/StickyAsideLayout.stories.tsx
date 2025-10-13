import type { Meta, StoryObj } from '@storybook/react-vite';
import StickyAsideLayout from './StickyAsideLayout';
import MegaMenuNavigation from '../Molecules/MegaMenu/MegaMenuNavigation/MegaMenuNavigation';
import { megaMenuConfig } from '../Organisms/MegaMenu/megaMenuConfig';
import DefinitionListSection from './DefinitionListSection';
import { withCssAndShell } from '../../decorators/withCssAndShell';

const meta: Meta<typeof StickyAsideLayout> = {
  title: 'Common/StickyAsideLayout',
  component: StickyAsideLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '메인 영역과 보조 패널을 한 화면에서 보여주고 싶을 때 사용하는 레이아웃 헬퍼입니다. 메인에는 컴포넌트를 렌더링하고, 사이드에는 설명/코드/노트 등의 보조 정보를 sticky 상태로 고정할 수 있습니다.',
      },
    },
  },
  decorators: [
    withCssAndShell({
      hrefs: ['/joongang-css/index.min.css'],
      bodyClass: ['index'],
      structure:
        'header#header.header.nav_re.emblem60.sticky_top > .full_popup.menu_popup.show > .layer_popup.side_nav > .scroll',
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof StickyAsideLayout>;

export const MegaMenuWithNotes: Story = {
  args: {
    main: <MegaMenuNavigation config={megaMenuConfig} />,
    aside: (
      <DefinitionListSection title="Note" bodyClassName="note-body">
        {[
          'StickyAsideLayout은 grid 기반 레이아웃으로, stickyOffset 값을 조절하여 사이드 패널의 고정 위치를 바꿀 수 있습니다.',
          '강의나 문서에서 "예시 + 설명" 형태의 데모를 만들 때 활용해 보세요.',
        ].map(text => (
          <p key={text} style={{ margin: 0 }}>
            {text}
          </p>
        ))}
      </DefinitionListSection>
    ),
    stickyOffset: 24,
  },
};

export const CustomColumns: Story = {
  args: {
    columns: ['minmax(0, 3fr)', 'minmax(0, 2fr)'],
    gap: '3rem',
    main: <MegaMenuNavigation config={megaMenuConfig} />,
    aside: (
      <DefinitionListSection title="Configuration" bodyClassName="note-body">
        <ul>
          <li>columns: ['minmax(0, 3fr)', 'minmax(0, 2fr)']</li>
          <li>gap: '3rem'</li>
          <li>sticky: false</li>
        </ul>
      </DefinitionListSection>
    ),
    sticky: false,
  },
};
