import { Types } from 'mongoose';
import { IUser, IUserSpecificField } from '../user/user.interface';
import { IPost } from '../post/post.interface';

export type IReaction = {
  user: string | Types.ObjectId | IUser | IUserSpecificField;
  post: Types.ObjectId | IPost;
  reaction: 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';
};
