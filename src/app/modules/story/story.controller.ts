import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { StoryService } from './story.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IStory } from './story.interface';

const createStory = catchAsync(async (req: Request, res: Response) => {
  const { ...storyData } = req.body;

  const tokenData = req.user;
  // Check if req.user is of type IDecodedToken
  if (tokenData && 'userId' in tokenData) {
    const { userId } = tokenData;
    if (!storyData.user) {
      storyData.user = userId as string;
    }
  }

  const result = await StoryService.createStory(storyData);

  sendResponse<IStory>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'story submited successfully !',
    data: result,
  });
});

// getAllStory
const getAllStory = catchAsync(async (req: Request, res: Response) => {
  const result = await StoryService.getAllStory();

  sendResponse<IStory[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'story submited successfully !',
    data: result,
  });
});

export const storyController = {
  createStory,
  getAllStory,
};
