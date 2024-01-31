import status from 'http-status';
import config from '../../../../config';
import catchAsync from '../../../../shared/catchAsync';
import sendResponse from '../../../../shared/sendResponse';
import { ILoginUserResponse } from '../auth.interface';
import { Request, Response } from 'express';
import { RegistrationService } from './registration.service';

// customer registration with login
const Registration = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  console.log(userData,'userData');

  const result = await RegistrationService.userRegistration(userData);
  const { refreshToken, accessToken, isEmailVerified } = result;
  const responseData = {
    accessToken,
    isEmailVerified,
  };
  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: status.OK,
    success: true,
    message: 'User Registration in successfully !',
    data: responseData,
  });
});

export const RegistrationController = {
  Registration,
};
