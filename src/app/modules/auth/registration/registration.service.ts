import httpStatus from 'http-status';
import ApiError from '../../../../errors/ApiError';
import { IUser } from '../../user/user.interface';
import { User } from '../../user/user.model';
import { ILoginUserResponse } from '../auth.interface';
import { AuthService } from '../auth.service';

const userRegistration = async (
  payload: IUser,
): Promise<ILoginUserResponse> => {
  if (!payload.role) {
    payload.role = 'normal_user';
  }

  const result = await User.create(payload);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Something is wrong');
  }
  await AuthService.sendEmailVerificationMail(result.email);

  const loginData = { email: result?.email, password: payload?.password };
  const token = await AuthService.userLogin(loginData);

  return token;
};

export const RegistrationService = {
  userRegistration,
};
