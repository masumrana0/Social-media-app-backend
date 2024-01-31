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
    const postId = req.params.id;
    const { comment } = req.body;
    const result = await CommentService.updateSpecificComment(comment, postId);
    sendResponse<IComment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'comment fatched successfully !',
      data: result,
    });
  },
);

export const postController = {
  submitComment,
  getSpecificPostComments,
  updateSpecificComment,
};
