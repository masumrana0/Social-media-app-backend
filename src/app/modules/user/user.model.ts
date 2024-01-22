/**
 * Title: 'Mongoose schema define by Masum Rana'
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 22-01-2024
 *
 */

import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>({
  userName: {
    type: String,
  },
  name: {
    type: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
      },
    },
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
});

export const User = model('user', userSchema);
