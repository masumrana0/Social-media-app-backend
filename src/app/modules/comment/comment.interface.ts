import { Types } from 'mongoose';
import { IPost } from '../post/post.interface';
import { IUser, IUserSpecificField } from '../user/user.interface';

export type IComment = {
  user?: string | Types.ObjectId | IUser | IUserSpecificField;
  post: Types.ObjectId | IPost;
  comment: string;
};
