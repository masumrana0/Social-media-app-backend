import { profileService } from '../profile/profile.service';
import { IUserSpecificField } from '../user/user.interface';
import { IComment } from './comment.interface';
import { Comment } from './comment.model';

// submitComment
const submitComment = async (payload: IComment): Promise<IComment | null> => {
  const result = await Comment.create(payload);
  return result;
};

const getSpecificPostComments = async (
  postId: string,
): Promise<IComment[] | null> => {
  const comments = await Comment.find({ post: postId }).sort({ createdAt: -1 });

  if (comments.length > 0) {
    const commentPromises = comments.map(async comment => {
      const profile = await profileService.getUserCommonData(
        comment.user as string,
      );

      const updatedComment = comment.toObject();
      updatedComment.user = profile as IUserSpecificField;
      return updatedComment as IComment;
    });

    const result = await Promise.all(commentPromises);
    return result;
  }

  return [];
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
