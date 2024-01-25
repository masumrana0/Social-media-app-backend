import {
  Request,
  Response,
} from 'express';
import httpStatus from 'http-status';

import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PostService } from './post.service';

const createPost = catchAsync(
  async (req: Request, res: Response) => {
    const { data } = req.body;
    const post = await PostService.createUserPost(data)
    // Send success response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: post,
    });
  },
)


const getPosts = catchAsync(
  async (req: Request, res: Response) => {
    const users = await PostService.getUserPosts();
    // Send success response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: users,
    });
  },
);

export const PostController = {
  getPosts,
  createPost
};
