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
type IGender = 'male' | 'female';
type ISocialMediaPlatform =
  | 'Facebook'
  | 'Github'
  | 'Instagram'
  | 'LinkedIn'
  | 'YouTube';

 
type ISocialMediaLink = {
  platfrom: ISocialMediaPlatform;
  link: string;
};

type Iuser = Types.ObjectId | IUser;
export type IProfile = {
  user: Iuser;
  gender?: IGender;
  bio?: string;
  skills?: IEducation[];
  dateOfBirth?: Date;
  nationality?: IAsianNationality;
  profilePicture?: string;
  socialMediaLinks?: ISocialMediaLink[];
  friendList: Iuser[];
};
