import { IComment } from './comment.interface';
import { Comment } from './comment.model';

// submitComment
const submitComment = async (payload: IComment): Promise<IComment | null> => {
  const result = await Comment.create(payload);
  return result;
};

// get Specific Post Comment
const getSpecificPostComments = async (
  postId: string,
): Promise<IComment[] | null> => {
  const result = await Comment.find({ post: postId });

  return result;
};

// update  Specific comment
const updateSpecificComment = async (
  comment: string,
  id: string,
): Promise<IComment | null> => {
  const result = await Comment.findByIdAndUpdate(
    id,
    { comment: comment },
    { new: true },
  );
  return result;
};

// delete comment
const deleteComment = async (id: string): Promise<IComment | null> => {
  const result = await Comment.findByIdAndDelete(id);
  return result;
};

export const CommentService = {
  submitComment,
  getSpecificPostComments,
  updateSpecificComment,
  deleteComment,
};
