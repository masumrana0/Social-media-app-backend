import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import ApiError from '../../../errors/ApiError';
import config from '../../../config';
import { sendMailerHelper } from '../../../helper/sendMailHelper';
import { User } from '../user/user.model';
import { IUser } from '../user/user.interface';
import { jwtHelpers } from '../../../helper/jwtHelper';

// login user
const userLogin = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  // checking isUserExist
  const isUserExist = await User.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // matching password
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'password is inccorect');
  }

  // create accessToken & refresh token
  const { _id, role, email: Email, isEmailVerified, userName } = isUserExist;

  // create accessToken
  const accessToken = jwtHelpers.createToken(
    {
      userid: _id,
      userName: userName,
      role: role,
      email: Email,
    },
    config.jwt.token_secret as Secret,
    '2h',
  );

  // create refreshToken
  const refreshToken = jwtHelpers.createToken(
    {
      userid: _id,
      userName: userName,
      role: role,
      email: Email,
    },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expirein as string,
  );

  return {
    accessToken,
    refreshToken,
    isEmailVerified,
  };
};

// refresh Token
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_token_secret as Secret,
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { email: Email } = verifiedToken;

  const isUserExist = await User.isUserExist(Email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      userId: isUserExist._id,
      role: isUserExist.role,
      email: isUserExist.email,
    },
    config.jwt.token_secret as Secret,
    config.jwt.token_expirein as string,
  );

  return {
    accessToken: newAccessToken,
  };
};

// changePassword
const changePassword = async (
  payload: IChangePassword,
  user: JwtPayload | null,
) => {
  const { oldPassord, newPassword } = payload;

  // checking user existed
  const isUserExist = await User.findById(user?.userid);
  // console.log(isUserExist);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // checking old password
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(oldPassord, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'old password is incorrect');
  }

  isUserExist.password = newPassword;
  isUserExist.isChangedPassword = true;

  // save the updated password
  await isUserExist.save();
};

// email verification
const emailVerification = async (email: string): Promise<Partial<IUser>> => {
  // Retrieve the user by email
  const isUserExist: IUser | null = await User.findOne({
    email: email,
  });

  // Check if the user exists
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Check if the email is already verified
  if (isUserExist && isUserExist.isEmailVerified) {
    throw new ApiError(httpStatus.OK, 'Your email is already Verified');
  }

  // update email verified data
  const result = await User.findByIdAndUpdate(
    isUserExist._id,
    { isEmailVerified: true },
    { new: true },
  );

  // Check if the email is verified
  if (!result?.isEmailVerified) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email verification failed');
  }

  return result;
};

// send Verification email
const sendEmailVerificationMail = async (email: string): Promise<void> => {
  const isUserExist = await User.isUserExist(email);

  if (isUserExist?.isEmailVerified) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Your email is already verified',
    );
  }

  const validate = await jwtHelpers.createResetToken(
    { email: email },
    config.jwt.token_secret as string,
    '2m',
  );
  const verificationLink = config.verification_url + `?token=${validate}`;

  await sendMailerHelper.sendMail(
    email,
    'user Email verification',
    `
    <div style="font-family: Arial, sans-serif; color: #333; background-color: #8406c8; padding: 20px;">
    <h1 style="color: #4CAF50;">Welcome to <span style="color: #4CAF50;">CircleUp</span></h1>
    <p>Please verify your account by clicking the following link:</p>
    <button style=" padding: 12px 20px; background-color: #9d07ee; color: white; border-radius: 5px; border:none"><a href="${verificationLink}" style="text-decoration: none;color:white; font-weight:bold" >Verify Email</a></button>
   
    <p>Thank you!</p>
  </div>
  `,
  );

  return;
};

// forgot Password
// const forgotPassword = async (email: string) => {
//   const user = await User.findOne({ email: email });

//   if (!user) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist!');
//   }

//   const passResetToken = await jwtHelpers.createResetToken(
//     { id: user.id },
//     config.accessTokenSecret as Secret,
//     '50m',
//   );

//   const resetLink: string = config.resetlink + `token=${passResetToken}`;

//   // console.log('profile: ', profile);
//   await sendEmail(
//     profile.email,
//     `
//       <div>
//         <p>Hi, ${profile.name.firstName}</p>
//         <p>Your password reset link: <a href=${resetLink}>Click Here</a></p>
//         <p>Thank you</p>
//       </div>
//   `,
//   );

//   // return {
//   //   message: "Check your email!"
//   // }
// };

export const AuthService = {
  userLogin,
  refreshToken,
  changePassword,
  emailVerification,
  sendEmailVerificationMail,
};
