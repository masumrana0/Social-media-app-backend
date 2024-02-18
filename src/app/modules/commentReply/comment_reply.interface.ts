import { Types } from 'mongoose';
import { IUser, IUserSpecificField } from '../user/user.interface';
import { IComment } from '../comment/comment.interface';

export type IComment_Reply = {
  toObject(): unknown;
  user?: string | Types.ObjectId | IUser | IUserSpecificField;
  comment: Types.ObjectId | IComment;
  comment_reply: string;
};
