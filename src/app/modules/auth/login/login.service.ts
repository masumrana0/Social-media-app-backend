import { Secret } from 'jsonwebtoken';
import config from '../../../../config';
import { jwtHelpers } from '../../../../helper/jwtHelper';
import ApiError from '../../../../errors/ApiError';
import httpStatus from 'http-status';
import { User } from '../../user/user.model';
import { ILoginUser, ILoginUserResponse } from '../auth.interface';

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
    config.jwt.token_expirein as string,
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

export const LoginService = {
  userLogin,
};
