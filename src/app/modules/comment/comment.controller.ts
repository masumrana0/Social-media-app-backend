/**
 * Title: 'Comment feature implement By Masum Rana'
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 31-01-2024
 *
 */

import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { CommentService } from './comment.service';
import { IComment } from './comment.interface';

//  submitComment
const submitComment = catchAsync(async (req: Request, res: Response) => {
  const { ...commentData } = req.body;
  const tokenData = req.user;
  const { userid } = tokenData;
  if (!commentData.user) {
    commentData.user = userid as string;
  }

  const result = await CommentService.submitComment(commentData);
  sendResponse<IComment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'comment submited successfully !',
    data: result,
  });
});

// getSpecificPostComments
const getSpecificPostComments = catchAsync(
  async (req: Request, res: Response) => {
    const postId = req.params.postId;
    const result = CommentService.getSpecificPostComments(postId);
    sendResponse<IComment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'comments fatched successfully !',
      data: result,
    });
  },
);

//  update Specific comment
const updateSpecificComment = catchAsync(
  async (req: Request, res: Response) => {
    const postId = req.params.postId;
    const { comment } = req.body;
    const result = await CommentService.updateSpecificComment(comment, postId);
    sendResponse<IComment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'comment updated successfully !',
      data: result,
    });
  },
);

// delete comment
const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const commentId = req.params.commentId;
  const result = await CommentService.deleteComment(commentId);

  sendResponse<IComment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'comment deleted successfully !',
    data: result,
  });
});

export const CommentController = {
  submitComment,
  getSpecificPostComments,
  updateSpecificComment,
  deleteComment,
};
