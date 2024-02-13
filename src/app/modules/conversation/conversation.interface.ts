import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IConversation = {
  creator: Types.ObjectId | IUser;
  participant: Types.ObjectId | IUser;
  last_updated: Date;
};
