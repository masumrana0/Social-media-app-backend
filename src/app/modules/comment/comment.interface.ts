import { Types } from 'mongoose';
import { IPost } from '../post/post.interface';
import { IUser } from '../user/user.interface';

export type IComment = {
  user?: Types.ObjectId | IUser;
  post: Types.ObjectId | IPost;
  comment: string;
};
