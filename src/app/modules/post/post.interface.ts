import { Types } from 'mongoose';
import { IUser, IUserSpecificField } from '../user/user.interface';

export type IPost = {
  user: Types.ObjectId | IUser | IUserSpecificField;
  postText: string;
  images?: string[];
  shareCount?: number;
};
