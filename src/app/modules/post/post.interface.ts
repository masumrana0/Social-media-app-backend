import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IPost = {
  user: Types.ObjectId | IUser;
  postText: string;
  images?: string[];
  shareCount?: number;
};
