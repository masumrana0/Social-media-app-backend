import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser, UserModel } from './user.interface';
import generateUniqeAccountUserName from '../../../helper/gnerateUserName';

import config from '../../../config';

const UserSchema = new Schema<IUser, UserModel>({
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
  role: {
    type: String,
    required: true,
    enum: ['normal_user', 'admin'],
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isChangedPassword: {
    type: Boolean,
    default: false,
  },
  passwordChangedAt: {
    type: Date,
  },
});

// User.create() / user.save()
UserSchema.pre('save', async function (next) {
  // hashing user password
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  if (!user.isChangedPassword) {
    user.passwordChangedAt = new Date();
  }

  next();
});

// createing user Name
UserSchema.pre('save', async function (next) {
  if (this.userName) {
    return;
  }
  this.userName = generateUniqeAccountUserName(this.name);
  next();
});

// checking isUserExist
UserSchema.statics.isUserExist = async function (
  email: string,
): Promise<IUser | null> {
  return await User.findOne(
    { email: email },
    { _id: 1, password: 1, role: 1, email: 1, isEmailVerified: 1, userName: 1 },
  );
};

//password Matching
UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

export const User = model<IUser, UserModel>('User', UserSchema);
