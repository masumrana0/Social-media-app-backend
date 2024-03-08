import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { postService } from './post.service';
import sendResponse from '../../../shared/sendResponse';
import { IPost } from './post.interface';
import httpStatus from 'http-status';

//  submitPost
const submitPost = catchAsync(async (req: Request, res: Response) => {
  const { ...postData } = req.body;

  const tokenData = req.user;
  // Check if req.user is of type IDecodedToken
  if (tokenData && 'userId' in tokenData) {
    const { userId } = tokenData;
    if (!postData.user) {
      postData.user = userId as string;
    }
  }

  const result = await postService.submitPost(postData);

  sendResponse<IPost>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'post submited successfully !',
    data: result,
  });
});

// getAllPost
const getAllPost = catchAsync(async (req: Request, res: Response) => {
  const result = await postService.getAllPost();
  sendResponse<IPost[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'posts fatched successfully !',
    data: result,
  });
});

// getSinglePost
const getSinglePost = catchAsync(async (req: Request, res: Response) => {
  const postId = req.params.id;
  const result = await postService.getSinglePost(postId);
  sendResponse<IPost>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'post fatched successfully !',
    data: result,
  });
});

export const postController = {
  submitPost,
  getAllPost,
  getSinglePost,
};
