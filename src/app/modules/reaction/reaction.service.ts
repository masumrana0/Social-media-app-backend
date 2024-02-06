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
  const result = await Reaction.find({ post: postid });
  return result;
};

export const ReactionService = {
  makeAndUndoReaction,
  getAllReaction,
};
