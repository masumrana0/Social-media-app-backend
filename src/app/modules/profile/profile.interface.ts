import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';

type IEducation =
  | 'JSC/JDC/8 PASS'
  | 'SSC/Secondary'
  | 'HSC / Higher Secondary'
  | 'Diploma'
  | 'Bachelor / Honors'
  | 'Masters'
  | 'PHD (Doctor of Philosophy)';

type IAsianNationality =
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

// type IGender = 'male' | 'female';
// type ISocialMediaPlatform =
//   | 'Facebook'
//   | 'Github'
//   | 'Instagram'
//   | 'LinkedIn'
//   | 'YouTube';

type Iuser = Types.ObjectId | IUser;
export type IProfile = {
  user: Iuser;
  bio?: string;
  education?: IEducation[];
  dateOfBirth?: Date;
  nationality?: IAsianNationality;
  coverPhoto?: string;
  profilePicture?: string;
  facebookUserName?: string;
  linkedinUserName?: string;
  instagramUserName?: string;
  githubUserName?: string;
  youtubeUserName?: string;
  friendList?: Iuser[];
};
