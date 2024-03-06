import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { conversationService } from './conversation.service';
import sendResponse from '../../../shared/sendResponse';
import { IConversation } from './conversation.interface';
import httpStatus from 'http-status';

// create conversation
const createConversation = catchAsync(async (req: Request, res: Response) => {
  const { ...conversationData } = req.body;
  const tokenData = req.user;
  // Check if req.user is of type IDecodedToken
  if (tokenData && 'userid' in tokenData) {
    const { userid } = tokenData;
    if (!conversationData.creator) {
      conversationData.creator = userid as string;
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
  const userId = req.user?.userid;

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
