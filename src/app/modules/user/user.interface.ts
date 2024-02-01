import { Document, Model } from 'mongoose';

/* eslint-disable no-unused-vars */
export type IAsianNationality =
  | 'Afghan'
  | 'Armenian'
  | 'Azerbaijani'
  | 'Bahraini'
  | 'Bangladeshi'
  | 'Bhutanese'
  | 'Bruneian'
  | 'Cambodian'
  | 'Chinese'
  | 'Cypriot'
  | 'Georgian'
  | 'Indian'
  | 'Indonesian'
  | 'Iranian'
  | 'Iraqi'
  | 'Israeli'
  | 'Japanese'
  | 'Jordanian'
  | 'Kazakhstani'
  | 'Kuwaiti'
  | 'Kyrgyzstani'
  | 'Laotian'
  | 'Lebanese'
  | 'Malaysian'
  | 'Maldivian'
  | 'Mongolian'
  | 'Burmese'
  | 'Nepali'
  | 'North Korean'
  | 'Omani'
  | 'Pakistani'
  | 'Palestinian'
  | 'Filipino'
  | 'Qatari'
  | 'Saudi Arabian'
  | 'Singaporean'
  | 'South Korean'
  | 'Sri Lankan'
  | 'Syrian'
  | 'Taiwanese'
  | 'Tajikistani'
  | 'Thai'
  | 'Timorese'
  | 'Turkish'
  | 'Turkmenistani'
  | 'Emirati'
  | 'Uzbekistani'
  | 'Vietnamese'
  | 'Yemeni';

export type IName = {
  firstName: string;
  lastName?: string;
};

export type IUser = {
  _id?: string;
  userName?: string;
  role?: 'admin' | 'normal_user';
  name: IName;
  email: string;
  password: string;
  isChangedPassword?: boolean;
  passwordChangedAt?: Date;
  isEmailVerified?: boolean;
};

export type UserModel = Model<IUser & Document> & {
  isUserExist(email: string): Promise<IUser | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
};
