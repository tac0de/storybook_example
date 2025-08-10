import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import RepliedCommentsList from './RepliedCommentsList';
import type { RepliedComment, Reply } from './RepliedCommentsList';

/**
 * Meta configuration for Storybook. Defines the title and component under test.
 * Storybook uses this information to organize stories and provide the correct
 * controls in the addon panel.
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
 * The Default story demonstrates the CommentsList component with a static
 * collection of comments. The story uses React state to store the current
 * comments so that replies added through the component are reflected in
 * Storybook without requiring a page reload.
 */
export const Default: StoryObj<typeof RepliedCommentsList> = {
  render: (args) => {
    const [comments, setComments] = useState<RepliedComment[]>(args.comments as RepliedComment[]);

    // When a reply is added, update the local comments state so that the
    // CommentsList re-renders with the new reply included. In a real
    // application this logic might live in a parent component or be managed
    // via a global state or API call.
    const handleAddReply = (commentId: RepliedComment['id'], reply: Reply) => {
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? { ...comment, replies: [...(comment.replies ?? []), reply] }
            : comment
        )
      );
    };

    return (
      <RepliedCommentsList
        {...args}
        comments={comments}
        onAddReply={handleAddReply}
      />
    );
  },
  args: {
    comments: [
      {
        id: 1,
        author: 'Alice',
        content: 'This is the first comment. Feel free to reply to me!',
        timestamp: '2025-08-01T10:20:30Z',
        replies: [
          {
            id: '1-1',
            author: 'Bob',
            content: 'Thanks for the info!',
            timestamp: '2025-08-02T09:45:00Z',
          },
        ],
      },
      {
        id: 2,
        author: 'Charlie',
        content: 'This is another comment. You can also reply to this one.',
        timestamp: '2025-08-03T14:15:20Z',
      },
    ],
  },
};