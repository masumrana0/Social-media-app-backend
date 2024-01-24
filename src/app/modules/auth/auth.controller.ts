import {
  Request,
  Response,
} from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';

import config from '../../../config';
import { jwtHelpers } from '../../../helper/jwtHelper';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IRefreshTokenResponse } from './auth.interface';
import { AuthService } from './auth.service';

// refreshToken
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully !',
    data: result,
  });
});

// change password
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { ...passwordData } = req.body;

  await AuthService.changePassword(passwordData, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully !',
    data: null,
  });
});

// email verification
const verification = catchAsync(async (req: Request, res: Response) => {
  // Extract the refreshToken from cookies
  let token: string = '';
  if (req.headers.authorization) {
    token = req.headers.authorization as string;
  } else if (req.query.token) {
    token = req.query.token as string;
  }

  //  Verify the Token to get the email
  const verifiedToken = jwtHelpers.verifyToken(
    token as string,
    config.jwt.token_secret as Secret,
  );
  const { email } = verifiedToken;

  // Call AuthService to verify the email
  const result = await AuthService.emailVerification(email as string);
  const { isEmailVerified } = result;

  // Send success response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Your email is verified successfully!',
    data: { isEmailVerified },
  });
});

const verificationEmailSendByClient = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    // Call AuthService to verify the email
    await AuthService.sendEmailVerificationMail(user?.email as string);
    // Send success response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Email send successfully!',
      data: null,
    });
  },
);


// ! Controller to make the community.
const getUsersToMakeCommunity = catchAsync(
  async (req: Request, res: Response) => {
    const users = await AuthService.getUsersToMakeCommunity();
    // Send success response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: users,
    });
  },
);

export const AuthController = {
  refreshToken,
  changePassword,
  verification,
  verificationEmailSendByClient,
  getUsersToMakeCommunity
};
