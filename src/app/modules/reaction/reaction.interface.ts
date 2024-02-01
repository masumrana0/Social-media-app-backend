import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import { IPost } from '../post/post.interface';

export type IReaction = {
  user: Types.ObjectId | IUser;
  post: Types.ObjectId | IPost;
  reaction: 'like' | 'love' | 'haha' | 'sad' | 'angry';
};
