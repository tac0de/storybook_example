export * from './CommentItem';
export type { EnhancedComment } from './commentUtils';
export {
  createReplyComment,
  addReplyToComment,
  getRepliesForComment,
  buildCommentTree,
  getThreadComments,
  updateReplyCount,
  deleteReplyComment,
  flattenComments,
  validateCommentDepth,
  sortReplies,
  MAX_COMMENT_DEPTH
} from './commentUtils';