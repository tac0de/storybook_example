import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import RepliedCommentsList from './RepliedCommentsList';
import type { RepliedComment, Reply } from './RepliedCommentsList';

/**
 * Storybook을 위한 메타 설정입니다. 테스트할 컴포넌트와 제목을 정의합니다.
 * Storybook은 이 정보를 사용하여 스토리를 구성하고 애드온 패널에 올바른 컨트롤을 제공합니다.
 */
const meta: Meta<typeof RepliedCommentsList> = {
  title: 'Organisms/RepliedCommentsList',
  component: RepliedCommentsList,
  argTypes: {
    onAddReply: { action: 'reply added' },
  },
};

export default meta;

/**
 * Default 스토리는 정적인 댓글 컬렉션을 가진 CommentsList 컴포넌트를 보여줍니다.
 * 이 스토리는 React 상태를 사용하여 현재 댓글을 저장하므로, 컴포넌트를 통해 추가된 답글이
 * 페이지를 새로고침할 필요 없이 Storybook에 반영됩니다.
 */
export const Default: StoryObj<typeof RepliedCommentsList> = {
  render(args) {
    const [comments, setComments] = useState<RepliedComment[]>(args.comments as RepliedComment[]);

    // 답글이 추가되면 로컬 댓글 상태를 업데이트하여 CommentsList가
    // 새 답글을 포함하여 다시 렌더링되도록 합니다. 실제 애플리케이션에서는
    // 이 로직이 부모 컴포넌트에 있거나 전역 상태 또는 API 호출을 통해 관리될 수 있습니다.
    const handleAddReply = (commentId: RepliedComment['id'], reply: Reply) => {
      setComments(prev =>
        prev.map(comment =>
          comment.id === commentId ? { ...comment, replies: [...(comment.replies ?? []), reply] } : comment,
        ),
      );
    };

    return <RepliedCommentsList {...args} comments={comments} onAddReply={handleAddReply} />;
  },
  args: {
    comments: [
      {
        id: 1,
        author: 'Alice',
        content: '첫 번째 댓글입니다. 자유롭게 답글을 달아주세요!',
        timestamp: '2025-08-01T10:20:30Z',
        replies: [
          {
            id: '1-1',
            author: 'Bob',
            content: '정보 감사합니다!',
            timestamp: '2025-08-02T09:45:00Z',
          },
        ],
      },
      {
        id: 2,
        author: 'Charlie',
        content: '또 다른 댓글입니다. 여기에도 답글을 달 수 있습니다.',
        timestamp: '2025-08-03T14:15:20Z',
      },
    ],
  },
};
