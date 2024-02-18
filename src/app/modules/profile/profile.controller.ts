import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IProfile } from './profile.interface';
import httpStatus from 'http-status';
import { profileService } from './profile.service';
import { IUserSpecificField } from '../user/user.interface';

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const { ...profileData } = req.body;

  const tokenData = req.user;
  // Check if req.user is of type IDecodedToken
  if (tokenData && 'userid' in tokenData) {
    const { userid } = tokenData;
    if (!profileData.user) {
      profileData.user = userid as string;
    }
  }

  const result = await profileService.updateProfileData(profileData);

  sendResponse<IProfile>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'profile updated successfully !',
    data: result,
  });
});

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const tokenData = req.user;

  // Check if req.user is of type IDecodedToken
  let userId;
  if (tokenData && 'userid' in tokenData) {
    const { userid } = tokenData;
    userId = userid as string;
  }

  const result = await profileService.getProfile(userId as string);

  sendResponse<IProfile>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'profile fatched successfully !',
    data: result,
  });
});

const getUserCommonData = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userid;
  console.log(userId);

  // Check if req.user is of type IDecodedToken
  // let userId;
  // if (tokenData && 'userid' in tokenData) {
  //   const { userid } = tokenData;
  //   userId = userid as string;
  // }

  const result = await profileService.getUserCommonData(userId as string);

  sendResponse<IUserSpecificField>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'profile fatched successfully !',
    data: result,
  });
});

// const uploadPhoto=catchAsync(async (req: Request, res: Response) => {
//   const userId = req.params.userid;
//   console.log(userId);

//   // Check if req.user is of type IDecodedToken
//   // let userId;
//   // if (tokenData && 'userid' in tokenData) {
//   //   const { userid } = tokenData;
//   //   userId = userid as string;
//   // }

//   const result = await profileService.getUserCommonData(userId as string);

//   sendResponse<IUserSpecificField>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'profile fatched successfully !',
//     data: result,
//   });
// });




export const profileController = {
  updateProfile,
  getProfile,
  getUserCommonData,
};
