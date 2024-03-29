/**
 * Title: 'Mongoose schema define by Masum Rana'
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 22-01-2024
 *
 */

import { Schema, model } from 'mongoose';
import {
  asianNationalityEnum,
  educationEnum,
  genderEnum,
  socialMediaPlatforms,
} from './profile.constant';
import { IProfile } from './profile.interface';

const userRefSchema = {
  type: Schema.Types.ObjectId,
  ref: 'User',
  required: true,
};

const ProfileSchema = new Schema<IProfile>(
  {
    user: userRefSchema,
    // gender: {
    //   type: String,
    //   enum: genderEnum,
    // },
    bio: {
      type: String,
      maxlength: 100,
      minlength: 20,
    },
    education: {
      type: [
        {
          type: String,
          enum: educationEnum,
        },
      ],
    },
    dateOfBirth: {
      type: Date,
    },
    nationality: {
      type: String,
      enum: asianNationalityEnum,
    },
    profilePicture: {
      type: String,
    },
    coverPhoto: {
      type: String,
    },
    facebookUserName: {
      type: String,
    },
    instagramUserName: {
      type: String,
    },
    githubUserName: {
      type: String,
    },
    youtubeUserName: {
      type: String,
    },
    linkedinUserName: {
      type: String,
    },

    friendList: { type: [userRefSchema] },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Profile = model<IProfile>('Profile', ProfileSchema);
