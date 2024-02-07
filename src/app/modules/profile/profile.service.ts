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
    return await Profile.findOneAndUpdate({ user: user }, profileData);
  }
};

export const profileService = {
  updateProfileData,
};
