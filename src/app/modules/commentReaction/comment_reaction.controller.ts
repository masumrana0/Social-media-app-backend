import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

import httpStatus from 'http-status';
import { Comment_ReactionService } from './comment_reaction.service';
import { IComment_Reaction } from './comment_reaction.interface';

//  update raction
const makeAndUndoReaction = catchAsync(async (req: Request, res: Response) => {
  const { ...reactionData } = req.body;
  const tokenData = req.user;

  // Check if req.user is of type IDecodedToken
  if (tokenData && 'userid' in tokenData) {
    const { userid } = tokenData;
    if (!reactionData.user) {
      reactionData.user = userid as string;
    }
  }

  const result =
    await Comment_ReactionService.makeAndUndoReaction(reactionData);
  sendResponse<IComment_Reaction>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment  reaction update successfully !',
    data: result,
  });
});

const getAllReaction = catchAsync(async (req: Request, res: Response) => {
  const postid = req.params.postid;
  const result = await Comment_ReactionService.getAllReaction(postid);
  sendResponse<IComment_Reaction[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' post reactions fatched successfully !',
    data: result,
  });
});

export const Comment_ReactionController = {
  makeAndUndoReaction,
  getAllReaction,
};
