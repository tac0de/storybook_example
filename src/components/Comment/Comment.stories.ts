// src/components/Comment.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { Comment } from './Comment';
import { userEvent, within, waitFor } from '@storybook/testing-library';

/**
 * Storybook 메타 정보
 * - Comment 컴포넌트의 스토리북 설정 및 argTypes 정의
 * - title: Storybook 내에서의 분류 경로
 * - component: 실제 렌더링할 컴포넌트
 * - argTypes: Storybook Controls 패널에서 조작 가능한 props 설명
 */
const meta: Meta<typeof Comment> = {
  title: 'Components/Comment',
  component: Comment,
  tags: ['autodocs'], // 자동 문서 생성을 위한 태그
  argTypes: {
    author: { control: 'text', description: '댓글 작성자 이름' },
    text: { control: 'text', description: '댓글 본문' },
    timestamp: { control: 'text', description: '작성 시간' },
    avatarUrl: { control: 'text', description: '프로필 이미지 URL' },
  },
};

export default meta;

/**
 * Story 타입 정의
 * - 각 스토리의 타입 안전성을 보장
 */
type Story = StoryObj<typeof meta>;

/**
 * Primary: 기본 댓글 UI
 * - 가장 일반적인 댓글 상태를 보여줌
 */
export const Primary: Story = {
  args: {
    author: '김민준',
    text: '타입스크립트로 컴포넌트를 만드니 타입이 명확해서 정말 좋네요!',
    timestamp: '10분 전',
    avatarUrl: 'https://i.pravatar.cc/40?u=minjun',
  },
};

/**
 * NoAvatar: 프로필 이미지가 없는 경우
 * - avatarUrl이 null일 때의 UI를 확인
 */
export const NoAvatar: Story = {
  args: {
    author: '이서연',
    text: '프로필 이미지가 없는 경우의 UI도 확인해야죠.',
    timestamp: '1시간 전',
    avatarUrl: null,
  },
};

/**
 * LongText: 매우 긴 댓글 본문
 * - 긴 텍스트가 레이아웃을 깨지 않고 잘 표시되는지 테스트
 */
export const LongText: Story = {
  args: {
    ...Primary.args, // Primary 스토리의 args를 그대로 사용
    author: '박지훈',
    text: '이 댓글은 텍스트가 아주 아주 길어질 때 어떻게 보이는지 테스트하기 위한 것입니다. 줄바꿈은 잘 되는지, 레이아웃이 깨지지는 않는지 등을 꼼꼼하게 확인해 보아야 합니다. 이렇게 긴 텍스트도 문제없이 잘 처리되어야 좋은 컴포넌트라고 할 수 있겠죠.',
    timestamp: '어제',
    avatarUrl: 'https://i.pravatar.cc/40?u=jihun',
  },
};

/**
 * Editing: 수정 모드 시나리오
 * - 스토리북 play function을 활용해, 처음부터 수정 버튼을 눌러 편집 상태로 진입
 */
export const Editing: Story = {
  args: {
    author: '홍길동',
    text: '이 댓글은 수정 모드로 시작합니다.',
    timestamp: '방금 전',
    avatarUrl: 'https://i.pravatar.cc/40?u=hong',
  },
  /**
   * play: 스토리북 상호작용 시나리오
   * - 렌더링 후 "수정" 버튼을 찾아 클릭하여 편집 모드로 진입
   */
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      return canvasElement.querySelector('button[title="수정"]') !== null;
    });
    const editButton = canvasElement.querySelector('button[title="수정"]') as HTMLButtonElement | null;
    if (editButton) await userEvent.click(editButton);
  },
};

/**
 * ToggleLikeAndDislike: 좋아요/싫어요 토글 시나리오
 * - play function에서 좋아요, 싫어요 버튼을 순서대로 눌러 토글 동작을 시연
 */
export const ToggleLikeAndDislike: Story = {
  args: {
    author: '최원영',
    text: '좋아요 싫어요 버튼을 순서대로 눌러 토글합니다.',
    timestamp: '5분 전',
    avatarUrl: 'https://i.pravatar.cc/40?u=emoji-toggle',
  },
  /**
   * play: 좋아요/싫어요 버튼을 자동으로 클릭/해제
   */
  play: async ({ canvasElement }) => {
    const emojis = ['😂', '❤️'];
    for (const emoji of emojis) {
      await waitFor(() => {
        return canvasElement.querySelector(`button[title="${emoji}"]`) !== null;
      });
      const btn = canvasElement.querySelector(`button[title="${emoji}"]`) as HTMLButtonElement | null;
      if (btn) {
        await userEvent.click(btn); // on
        await new Promise(res => setTimeout(res, 300));
        await userEvent.click(btn); // off
        await new Promise(res => setTimeout(res, 300));
      }
    }
  },
};

/**
 * Replying: 답글 입력창 열기 시나리오
 * - play function에서 답글 버튼을 눌러 입력창이 열리는지 확인
 */
export const Replying: Story = {
  args: {
    author: '박서준',
    text: '답글 버튼을 눌러 입력창을 확인합니다.',
    timestamp: '2분 전',
    avatarUrl: 'https://i.pravatar.cc/40?u=seojoon',
  },
  /**
   * play: 답글 버튼을 클릭하여 입력창이 열리는지 시연
   */
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      return canvasElement.querySelector('button[title="답글"]') !== null;
    });
    const replyButton = canvasElement.querySelector('button[title="답글"]') as HTMLButtonElement | null;
    if (replyButton) await userEvent.click(replyButton);
  },
};

/**
 * ReportScenario: 신고 기능 시나리오
 * - play function에서 신고 버튼 클릭 → 사유 입력 → 신고하기 버튼 클릭까지 자동화
 */
export const ReportScenario: Story = {
  args: {
    author: '신고테스터',
    text: '신고 기능을 자동으로 시연합니다.',
    timestamp: '방금 전',
    avatarUrl: 'https://i.pravatar.cc/40?u=report',
  },
  /**
   * play: 신고 버튼 클릭 → 사유 입력 → 신고하기 버튼 클릭까지 자동화
   */
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      return within(canvasElement).queryByRole('button', { name: /신고/ }) !== null;
    });
    // 1. 신고 버튼 클릭
    const reportButton = within(canvasElement).getByRole('button', { name: /신고/ });
    await userEvent.click(reportButton);
    await new Promise(res => setTimeout(res, 300));
    // 2. 신고 사유 입력
    const input = within(canvasElement).getByPlaceholderText('신고 사유를 입력하세요...');
    await userEvent.type(input, '스팸입니다');
    await new Promise(res => setTimeout(res, 300));
    // 3. 신고하기 버튼 클릭
    const submitButton = within(canvasElement).getByRole('button', { name: /신고하기/ });
    await userEvent.click(submitButton);
    await new Promise(res => setTimeout(res, 300));
    // 4. 접수 메시지 확인 (자동화 검증은 생략, UI로 확인)
  },
}; 