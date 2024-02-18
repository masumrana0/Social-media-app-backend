/**
 * Title: 'Comment reply section implement By Masum Rana'
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 14-02-2024
 *
 */

import { profileService } from '../profile/profile.service';
import { IUserSpecificField } from '../user/user.interface';
import { IComment_Reply } from './comment_reply.interface';
import { Comment_Reply } from './comment_reply.model';

// submitComment
const submitComment_Reply = async (
  payload: IComment_Reply,
): Promise<IComment_Reply | null> => {
  const result = await Comment_Reply.create(payload);
  return result;
};

const getSpecificPostComments_Reply = async (
  commentId: string,
): Promise<IComment_Reply[] | null> => {
  const allReplies = await Comment_Reply.find({ comment: commentId }).sort({
    createdAt: -1,
  });

  if (allReplies.length > 0) {
    const commentPromises = allReplies.map(async (comment: IComment_Reply) => {
      const profile = await profileService.getUserCommonData(
        comment.user as string,
      );

      const updatedComment = comment.toObject() as IComment_Reply;
      updatedComment.user = profile as IUserSpecificField;
      return updatedComment as IComment_Reply;
    });

    const result = await Promise.all(commentPromises);
    return result;
  }

  return [];
};

// update  Specific comment
const updateSpecificComment_reply = async (
  comment: Partial<IComment_Reply>,
  id: string,
): Promise<IComment_Reply | null> => {
  // console.log('form service',comment,id);

  const result = await Comment_Reply.findByIdAndUpdate(id, comment, {
    new: true,
  });

  //   const result = await Comment_Reply.findById(id);
  return result;
};

// delete comment
const deleteComment_reply = async (
  id: string,
): Promise<IComment_Reply | null> => {
  const result = await Comment_Reply.findByIdAndDelete(id);
  return result;
};

export const Comment_ReplyService = {
  submitComment_Reply,
  getSpecificPostComments_Reply,
  updateSpecificComment_reply,
  deleteComment_reply,
};
