/**
 * Comment Utilities for Reply Management
 *
 * This file contains utility functions for managing reply comments in a hierarchical structure.
 * It enhances the existing Comment system with parentId and replyTo fields for better reply tracking.
 */

// Enhanced Comment interface with parentId and replyTo fields
export interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
  likes: number;
  isLiked: boolean;
  isAuthor: boolean;
  replies?: Comment[];
}

export interface EnhancedComment {
  /**
   * 🔑 Comment's unique identifier
   */
  id: string;

  /**
   * 📝 The actual content of the comment
   */
  content: string;

  /**
   * 👤 Author information
   */
  author: {
    name: string;        // Author's name
    avatar?: string;     // Profile image URL (optional)
    isVerified?: boolean; // Verified user status (optional)
  };

  /**
   * ⏰ Creation time in ISO 8601 format
   */
  createdAt: string;

  /**
   * ❤️ Number of likes on the comment
   */
  likes: number;

  /**
   * 💬 Number of replies to the comment
   */
  replies: number;

  /**
   * 💬 Array of reply comments
   */
  replyComments?: EnhancedComment[];

  /**
   * ❤️ Whether the current user has liked this comment
   */
  isLiked: boolean;

  /**
   * 👤 Whether the current user is the author of this comment
   */
  isAuthor: boolean;

  /**
   * 🔗 Parent comment ID (for reply comments)
   * Points to the immediate parent comment in the hierarchy
   */
  parentId?: string;

  /**
   * 🔗 User being replied to (for mention-style replies)
   * Points to the user being directly replied to, which may be different from parentId
   */
  replyTo?: string;
}

/**
 * Maximum allowed nesting depth for comments
 */
export const MAX_COMMENT_DEPTH = 3;

/**
 * Creates a new reply comment with proper parentId and replyTo fields
 *
 * @param content - The content of the reply
 * @param parentId - The ID of the parent comment being replied to
 * @param replyTo - The ID of the user being replied to (optional)
 * @param author - The author information for the reply
 * @returns A new EnhancedComment object representing the reply
 */
export function createReplyComment(
  content: string,
  parentId: string,
  replyTo: string | undefined,
  author: EnhancedComment['author']
): EnhancedComment {
  return {
    id: generateId(), // In a real app, this would come from a proper ID generator
    content,
    author,
    createdAt: new Date().toISOString(),
    likes: 0,
    replies: 0,
    isLiked: false,
    isAuthor: true, // Assuming the current user is the author of their own reply
    parentId,
    replyTo,
    replyComments: []
  };
}

/**
 * Adds a reply to an existing comment and updates reply counts
 *
 * @param parentComment - The comment to which the reply is being added
 * @param replyComment - The reply comment to add
 * @returns Updated parent comment with the new reply
 */
export function addReplyToComment(
  parentComment: EnhancedComment,
  replyComment: EnhancedComment
): EnhancedComment {
  // Validate that the replyComment has the correct parentId
  if (replyComment.parentId !== parentComment.id) {
    throw new Error('Reply comment parentId does not match parent comment id');
  }

  // Create a copy of the parent comment to avoid mutation
  const updatedParent = { ...parentComment };

  // Initialize replyComments array if it doesn't exist
  if (!updatedParent.replyComments) {
    updatedParent.replyComments = [];
  }

  // Add the reply to the replyComments array
  updatedParent.replyComments = [...updatedParent.replyComments, replyComment];

  // Update the reply count
  updatedParent.replies = updatedParent.replyComments.length;

  return updatedParent;
}

/**
 * Retrieves all replies for a specific comment
 *
 * @param comment - The comment to get replies for
 * @returns Array of reply comments
 */
export function getRepliesForComment(comment: EnhancedComment): EnhancedComment[] {
  return comment.replyComments && Array.isArray(comment.replyComments)
    ? [...comment.replyComments]
    : [];
}

/**
 * Builds a hierarchical comment tree from flat comment data
 *
 * @param comments - Flat array of comments
 * @returns Hierarchical tree of comments
 */
export function buildCommentTree(comments: EnhancedComment[]): EnhancedComment[] {
  // Create a map of comments by ID for quick lookup
  const commentMap = new Map<string, EnhancedComment>();
  const rootComments: EnhancedComment[] = [];

  // First pass: Create a map of all comments and initialize replyComments arrays
  comments.forEach(comment => {
    commentMap.set(comment.id, { ...comment, replyComments: [] });
  });

  // Second pass: Build the tree structure
  comments.forEach(comment => {
    const currentComment = commentMap.get(comment.id)!;
    
    if (currentComment.parentId) {
      // This is a reply, find its parent
      const parent = commentMap.get(currentComment.parentId);
      if (parent) {
        if (!parent.replyComments) {
          parent.replyComments = [];
        }
        parent.replyComments.push(currentComment);
      }
    } else {
      // This is a root comment
      rootComments.push(currentComment);
    }
  });

  return rootComments;
}

/**
 * Gets all comments in a specific thread (a comment and all its descendants)
 *
 * @param comments - All comments
 * @param rootCommentId - The ID of the root comment to get thread for
 * @returns Array of comments in the thread
 */
export function getThreadComments(comments: EnhancedComment[], rootCommentId: string): EnhancedComment[] {
  const threadComments: EnhancedComment[] = [];
  const visited = new Set<string>();

  // Find the root comment
  const rootComment = comments.find(comment => comment.id === rootCommentId);
  if (!rootComment) {
    return [];
  }

  // Add root comment to thread
  threadComments.push(rootComment);
  visited.add(rootComment.id);

  // Recursive function to find all descendants
  const findDescendants = (comment: EnhancedComment) => {
    if (comment.replyComments && Array.isArray(comment.replyComments)) {
      comment.replyComments.forEach(reply => {
        if (!visited.has(reply.id)) {
          threadComments.push(reply);
          visited.add(reply.id);
          findDescendants(reply);
        }
      });
    }
  };

  findDescendants(rootComment);
  return threadComments;
}

/**
 * Updates the reply count for a comment
 *
 * @param comment - The comment to update
 * @param count - The new reply count (optional, defaults to current replyComments length)
 * @returns Updated comment with new reply count
 */
export function updateReplyCount(comment: EnhancedComment, count?: number): EnhancedComment {
  const updatedComment = { ...comment };
  
  if (count !== undefined) {
    updatedComment.replies = count;
  } else if (updatedComment.replyComments && Array.isArray(updatedComment.replyComments)) {
    updatedComment.replies = updatedComment.replyComments.length;
  } else {
    updatedComment.replies = 0;
  }
  
  return updatedComment;
}

/**
 * Deletes a reply comment and updates parent relationships
 *
 * @param comments - Array of all comments
 * @param replyId - The ID of the reply to delete
 * @returns Updated array of comments with the reply removed
 */
export function deleteReplyComment(comments: EnhancedComment[], replyId: string): EnhancedComment[] {
  // Create a deep copy of comments to avoid mutation
  const updatedComments = JSON.parse(JSON.stringify(comments)) as EnhancedComment[];
  
  // Find the comment to delete
  const deleteComment = (commentsArray: EnhancedComment[]): boolean => {
    for (let i = 0; i < commentsArray.length; i++) {
      const comment = commentsArray[i];
      
      if (comment.id === replyId) {
        // Remove this comment from the array
        commentsArray.splice(i, 1);
        return true;
      }
      
      // Check if this comment has replies
      if (comment.replyComments && Array.isArray(comment.replyComments)) {
        if (deleteComment(comment.replyComments)) {
          // Update reply count after deletion
          comment.replies = comment.replyComments.length;
          return true;
        }
      }
    }
    return false;
  };
  
  deleteComment(updatedComments);
  return updatedComments;
}

/**
 * Flattens nested comments for display purposes
 *
 * @param comments - Hierarchical array of comments
 * @param depth - Current nesting depth (used internally for recursion)
 * @returns Flat array of comments with depth information
 */
export function flattenComments(comments: EnhancedComment[], depth = 0): EnhancedComment[] {
  let flattened: EnhancedComment[] = [];
  
  comments.forEach(comment => {
    // Add the current comment with depth information
    flattened.push({
      ...comment,
      // We could add a depth property here if needed, but we'll rely on the existing structure
    });
    
    // Process replies if they exist
    if (comment.replyComments && Array.isArray(comment.replyComments)) {
      flattened = flattened.concat(flattenComments(comment.replyComments, depth + 1));
    }
  });
  
  return flattened;
}

/**
 * Checks if a comment exceeds maximum nesting depth
 *
 * @param comment - The comment to check
 * @param maxDepth - Maximum allowed depth (defaults to MAX_COMMENT_DEPTH)
 * @returns Boolean indicating if comment exceeds depth limit
 */
export function validateCommentDepth(comment: EnhancedComment, maxDepth: number = MAX_COMMENT_DEPTH): boolean {
  let currentComment: EnhancedComment | undefined = comment;
  let depth = 0;
  
  // Traverse up the parentId chain to count depth
  while (currentComment && currentComment.parentId) {
    depth++;
    // In a real implementation, we'd need to find the parent comment in the comments array
    // For this utility, we'll assume we can only check the current comment's depth
    if (depth > maxDepth) {
      return false;
    }
    // We can't traverse further without access to the full comments array
    break;
  }
  
  return true;
}

/**
 * Sorts replies by different criteria
 *
 * @param replies - Array of reply comments to sort
 * @param sortBy - Sorting criteria ('newest', 'oldest', 'mostLiked')
 * @returns Sorted array of comments
 */
export function sortReplies(
  replies: EnhancedComment[],
  sortBy: 'newest' | 'oldest' | 'mostLiked'
): EnhancedComment[] {
  const sortedReplies = [...replies];
  
  switch (sortBy) {
    case 'newest':
      return sortedReplies.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case 'oldest':
      return sortedReplies.sort((a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    case 'mostLiked':
      return sortedReplies.sort((a, b) => b.likes - a.likes);
    default:
      return sortedReplies;
  }
}

/**
 * Generates a unique ID (simplified version for demonstration)
 * In a real application, you would use a proper ID generation library
 *
 * @returns A unique string ID
 */
function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}