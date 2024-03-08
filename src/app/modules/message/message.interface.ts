import { Types } from 'mongoose';
import { IUser, IUserSpecificField } from '../user/user.interface';
import { IConversation } from '../conversation/conversation.interface';

export type IMessage = {
  text?: string;
  attachment?: string[];
  sender: Types.ObjectId | IUser | IUserSpecificField | string;
  receiver: Types.ObjectId | IUser | IUserSpecificField | string;
  date_time?: Date;
  conversation_id: Types.ObjectId | IConversation;
};
