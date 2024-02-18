import { Types } from 'mongoose';
import { IUser, IUserSpecificField } from '../user/user.interface';
import { IComment } from '../comment/comment.interface';

export type IComment_Reaction = {
  user: string | Types.ObjectId | IUser | IUserSpecificField;
  comment: Types.ObjectId | IComment;
  reaction: 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';
};
