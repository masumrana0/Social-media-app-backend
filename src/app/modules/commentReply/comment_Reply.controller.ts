/**
 * Title: 'Comment feature implement By Masum Rana'
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 31-01-2024
 *
 */

import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { Comment_ReplyService } from './comment_Reply.service';
import { IComment_Reply } from './comment_reply.interface';

//  submitComment
const submitComment_Reply = catchAsync(async (req: Request, res: Response) => {
  const { ...commentData } = req.body;
  const tokenData = req.user;
  // Check if req.user is of type IDecodedToken
  if (tokenData && 'userId' in tokenData) {
    const { userId } = tokenData;
    if (!commentData.user) {
      commentData.user = userId as string;
    }
  }

  const result = await Comment_ReplyService.submitComment_Reply(commentData);
  sendResponse<IComment_Reply>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'comment Reply submited successfully !',
    data: result,
  });
});

// getSpecificPostComments
const getSpecificPostCommentReplies = catchAsync(
  async (req: Request, res: Response) => {
    const comment_id = req.params.comment_id;

    const result =
      await Comment_ReplyService.getSpecificPostComments_Reply(comment_id);
    sendResponse<IComment_Reply[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'comments_replies fatched successfully !',
      data: result,
    });
  },
);

//  update Specific comment
const updateSpecificComment_reply = catchAsync(
  async (req: Request, res: Response) => {
    const comment_id = req.params.comment_reply_id;
    console.log(comment_id);

    const { ...comment } = req.body;
    console.log(comment);

    const result = await Comment_ReplyService.updateSpecificComment_reply(
      comment,
      comment_id,
    );
    sendResponse<IComment_Reply>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'comment reply updated successfully !',
      data: result,
    });
  },
);

// delete comment
const deleteComment_reply = catchAsync(async (req: Request, res: Response) => {
  const commentId = req.params.comment_reply_id;
  const result = await Comment_ReplyService.deleteComment_reply(commentId);

  sendResponse<IComment_Reply>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'comment Reply deleted successfully !',
    data: result,
  });
});

export const Comment_replyController = {
  submitComment_Reply,
  getSpecificPostCommentReplies,
  updateSpecificComment_reply,
  deleteComment_reply,
};
