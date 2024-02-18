import { ObjectId } from 'mongoose';
import { IUserSpecificField } from '../user/user.interface';

export type IStory = {
  user: ObjectId | IUserSpecificField;
  story: string;
};
