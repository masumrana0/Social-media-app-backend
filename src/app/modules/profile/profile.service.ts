import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IName } from '../user/user.interface';
import { User } from '../user/user.model';
import { IProfile } from './profile.interface';
import { Profile } from './profile.model';

const updateProfileData = async (
  payload: IProfile,
): Promise<IProfile | null> => {
  const { user, ...profileData } = payload;

  const isExistedProfile = await Profile.findOne({ user: user });

  if (!isExistedProfile) {
    return await Profile.create(payload);
  } else {
    return await Profile.findOneAndUpdate({ user: user }, profileData, {
      new: true,
    });
  }
};

const getProfile = async (userid: string): Promise<IProfile | null> => {
  const result = await Profile.findOne({ user: userid });
  return result;
};

type IUserSpecificField = {
  userId?: string;
  name: IName;
  profilePicture?: string;
};

const getUserCommonData = async (
  id: string,
): Promise<IUserSpecificField | null> => {
  const isUserexisted = await User.findById(id);

  if (!isUserexisted) {
    new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }

  const profile = await Profile.findOne({ user: id });

  if (!profile) {
    const userCommonData: IUserSpecificField = {
      name: isUserexisted?.name as IName,
      userId: isUserexisted?._id?.toString() as string,
    };
    return userCommonData;
  }

  const { profilePicture } = profile;

  const userCommonData: IUserSpecificField = {
    profilePicture: profilePicture || undefined,
    name: isUserexisted?.name as IName,
    userId: isUserexisted?._id?.toString() as string,
  };

  return userCommonData;
};

export const profileService = {
  updateProfileData,
  getProfile,
  getUserCommonData,
};
