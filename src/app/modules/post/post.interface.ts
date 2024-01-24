import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IPost = {
  user: Types.ObjectId | IUser;
  hashTag?: string;
  status?: string;
  Images?: string[];
  comments?: Types.ObjectId[];
  Reactions?: {
    user: Types.ObjectId | IUser;
    totalLike: number;
    totalUnlike: number;
    totalLove: number;
  };
  Location?: { latitude: number; longitude: number };
  ShareCount: number;
  postVisibility?: {
    public: boolean;
    friendlyOnly: boolean;
    onlyMe: boolean;
  };
};
