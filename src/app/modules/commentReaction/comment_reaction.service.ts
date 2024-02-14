import { profileService } from '../profile/profile.service';
import { IUserSpecificField } from '../user/user.interface';
import { IComment_Reaction } from './comment_reaction.interface';
import { Comment_Reaction } from './comment_reaction.model';

const makeAndUndoReaction = async (
  payload: IComment_Reaction,
): Promise<IComment_Reaction | null> => {
  const isExistedReaction = await Comment_Reaction.findOne({
    comment: payload.comment,
    user: payload.user,
  });

  if (isExistedReaction && isExistedReaction?.reaction === payload.reaction) {
    return await Comment_Reaction.findOneAndDelete({
      comment: payload.comment,
      user: payload.user,
    });
  } else if (
    isExistedReaction &&
    !(isExistedReaction?.reaction === payload?.reaction)
  ) {
    return await Comment_Reaction.findOneAndUpdate(
      { comment: payload.comment, user: payload.user },
      { reaction: payload.reaction },
      { new: true },
    );
  } else {
    return await Comment_Reaction.create(payload);
  }
};

const getAllReaction = async (
  postid: string,
): Promise<IComment_Reaction[] | null> => {
  const reactions = await Comment_Reaction.find({ post: postid }).sort({
    createdAt: -1,
  });

  if (reactions.length > 0) {
    const reactionPromises = reactions.map(async reaction => {
      if (reaction.user) {
        const profile = await profileService.getUserCommonData(
          reaction.user as string,
        );
        const updatedReaction = reaction.toObject();
        updatedReaction.user = profile as IUserSpecificField;
        return updatedReaction as IComment_Reaction;
      }
      return reaction.toObject() as IComment_Reaction;
    });

    const result = await Promise.all(reactionPromises);
    return result;
  }
  return [];
};

export const Comment_ReactionService = {
  makeAndUndoReaction,
  getAllReaction,
};
