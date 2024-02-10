import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../../shared/catchAsync';
import { AuthService } from '../auth.service';
import config from '../../../../config';
import { ILoginUserResponse } from '../auth.interface';
import sendResponse from '../../../../shared/sendResponse';

// userLogin
const userLogin = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.userLogin(loginData);
  const { refreshToken, accessToken, isEmailVerified } = result;
  const responseData = { accessToken, isEmailVerified }
  
  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully !',
    data: responseData,
  });
});

export const LoginController = {
  userLogin,
};
