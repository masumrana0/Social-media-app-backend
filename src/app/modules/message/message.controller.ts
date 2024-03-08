import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { messageService } from './meesage.service';
import { IMessage } from './message.interface';

const sendMessage = catchAsync(async (req: Request, res: Response) => {
  const { ...message } = req.body;
  console.log(message);
  const tokenData = req.user;
  // Check if req.user is of type IDecodedToken
  if (tokenData && 'userId' in tokenData) {
    const { userId } = tokenData;
    if (!message.sender) {
      message.sender = userId as string;
    }
  }
  console.log('from message controller', message);

  const result = await messageService.sendMessage(message);
  sendResponse<IMessage>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'message send Successfully !',
    data: result,
  });
});

const getMessage = catchAsync(async (req: Request, res: Response) => {
  const conversation_id = req.params.conversationId;
  const result = await messageService.getMessages(conversation_id);
  sendResponse<IMessage[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'messages fatched Successfully !',
    data: result,
  });
});

export const MessageController = {
  sendMessage,
  getMessage,
};
