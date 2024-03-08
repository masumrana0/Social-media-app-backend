import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IConversation } from './conversation.interface';
import { conversationService } from './conversation.service';

// create conversation
const createConversation = catchAsync(async (req: Request, res: Response) => {
  const { ...conversationData } = req.body;
  const tokenData = req.user;
  // Check if req.user is of type IDecodedToken
  if (tokenData && 'userId' in tokenData) {
    const { userId } = tokenData;
    if (!conversationData.creator) {
      conversationData.creator = userId as string;
    }
  }
  const result = await conversationService.createConversation(conversationData);

  sendResponse<IConversation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'conversation created successfully !',
    data: result,
  });
});

// getSpecificUser conversation
const getInbox = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  const result = await conversationService.getInbox(userId);
  sendResponse<IConversation[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'conversations fatched successfully!',
    data: result,
  });
});

// Delete  conversation
const deleteConversation = catchAsync(async (req: Request, res: Response) => {
  const conversationId = req.params.conversationId;
  const result = await conversationService.deleteConversation(conversationId);
  sendResponse<IConversation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'conversation deleted successfully!',
    data: result,
  });
});

export const conversationController = {
  createConversation,
  deleteConversation,
  getInbox,
};
