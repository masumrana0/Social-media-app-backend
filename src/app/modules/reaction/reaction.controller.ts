import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IReaction } from './reaction.interface';
import httpStatus from 'http-status';
import { ReactionService } from './reaction.service';

//  update raction
const makeAndUndoReaction = catchAsync(async (req: Request, res: Response) => {
  const { ...reactionData } = req.body;
  const tokenData = req.user;

  // Check if req.user is of type IDecodedToken
  if (tokenData && 'userId' in tokenData) {
    const { userId } = tokenData;
    if (!reactionData.user) {
      reactionData.user = userId as string;
    }
  }

  const result = await ReactionService.makeAndUndoReaction(reactionData);
  sendResponse<IReaction>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' post reaction update successfully !',
    data: result,
  });
});

const getAllReaction = catchAsync(async (req: Request, res: Response) => {
  const postid = req.params.postid;
  const result = await ReactionService.getAllReaction(postid);
  sendResponse<IReaction[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' post reactions fatched successfully !',
    data: result,
  });
});

export const ReactionController = {
  makeAndUndoReaction,
  getAllReaction,
};
