import { Types } from 'mongoose';
import { IUser, IUserSpecificField } from '../user/user.interface';

export type IConversation = {
  toObject(): unknown;
  creator: Types.ObjectId | IUser | IUserSpecificField;
  participant: Types.ObjectId | IUser | IUserSpecificField;
  last_updated: Date;
};
