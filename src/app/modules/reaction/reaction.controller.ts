import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IReaction } from './reaction.interface';
import httpStatus from 'http-status';
import { ReactionService } from './reaction.service';

//  update raction
const makeAndUndoReaction = catchAsync(async (req: Request, res: Response) => {
  const { ...reactoinData } = req.body;
  const tokenData = req.user;
  const { userid } = tokenData;
  if (!reactoinData.user) {
    reactoinData.user = userid as string;
  }

  const result = await ReactionService.makeAndUndoReaction(reactoinData);
  sendResponse<IReaction>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' post reaction update successfully !',
    data: result,
  });
});

export const ReactionController = {
  makeAndUndoReaction,
};
