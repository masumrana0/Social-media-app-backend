/**
 * Title: 'Zod data Validation Schema define By Masum Rana'
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 22-01-2024
 *
 */

import z from 'zod';
import {
  asianNationalityEnum,
  educationEnum,
  // genderEnum,
} from './profile.constant';

const profileZodSchema = z.object({
  body: z.object({
    // user: z.string({ required_error: 'user reference id is required' }),
    bio: z.string().min(20).max(100).optional(),
    dateOfBirth: z.date().optional(),
    nationality: z.enum(['', ...asianNationalityEnum]).optional(),
    skills: z.string().optional(),
    education: z.enum(['', ...educationEnum]).optional(),
    profilePicture: z.string().optional(),
    coverPhoto: z.string().optional(),
    facebookUserName: z.string().optional(),
    linkedinUserName: z.string().optional(),
    instagramUserName: z.string().optional(),
    githubUserName: z.string().optional(),
    youtubeUserName: z.string().optional(),
    friendList: z.array(z.string()).optional(),
  }),
});

export const profileZodValidation = {
  profileZodSchema,
};
