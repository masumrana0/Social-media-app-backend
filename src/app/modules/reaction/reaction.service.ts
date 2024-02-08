import { profileService } from '../profile/profile.service';
import { IUserSpecificField } from '../user/user.interface';
import { IReaction } from './reaction.interface';
import { Reaction } from './reaction.model';

const makeAndUndoReaction = async (
  payload: IReaction,
): Promise<IReaction | null> => {
  const isExistedReaction = await Reaction.findOne({
    post: payload.post,
    user: payload.user,
  });

  if (isExistedReaction && isExistedReaction?.reaction === payload.reaction) {
    return await Reaction.findOneAndDelete({
      post: payload.post,
      user: payload.user,
    });
  } else if (
    isExistedReaction &&
    !(isExistedReaction?.reaction === payload?.reaction)
  ) {
    return await Reaction.findOneAndUpdate(
      { post: payload.post, user: payload.user },
      { reaction: payload.reaction },
      { new: true },
    );
  } else {
    return await Reaction.create(payload);
  }
};

const getAllReaction = async (postid: string): Promise<IReaction[] | null> => {
  const reactions = await Reaction.find({ post: postid }).sort({
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
        return updatedReaction as IReaction;
      }
      return reaction.toObject() as IReaction;
    });

    const result = await Promise.all(reactionPromises);
    return result;
  }
  return [];
};

export const ReactionService = {
  makeAndUndoReaction,
  getAllReaction,
};
