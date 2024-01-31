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
  genderEnum,
} from './profile.constant';

const createProfileZodScehma = z.object({
  body: z.object({
    user: z.string({ required_error: 'user reference id is required' }),
    bio: z.string().min(20).max(100).optional(),
    gender: z
      .string()
      .refine(value => value === '' || genderEnum.includes(value), {
        message: 'Invalid gender value',
      })
      .optional(),

    dateOfBirth: z.date().optional(),
    nationality: z.enum(['', ...asianNationalityEnum]).optional(),
    skills: z.string().optional(),
    education: z.enum(['', ...educationEnum]).optional(),
    profilePicture: z.string().optional(),
    socialMediaLinks: z
      .array(
        z.object({
          platform: z.string(),
          link: z.string(),
        }),
      )
      .optional(),
  }),
});
const UpdateProfileZodScehma = z.object({
  body: z.object({
    user: z.string({ required_error: 'user reference id is required' }),
    bio: z.string().min(20).max(100).optional(),
    gender: z
      .string()
      .refine(value => value === '' || genderEnum.includes(value), {
        message: 'Invalid gender value',
      })
      .optional(),

    dateOfBirth: z.date().optional(),
    nationality: z.enum(['', ...asianNationalityEnum]).optional(),
    skills: z.string().optional(),
    education: z.enum(['', ...educationEnum]).optional(),
    profilePicture: z.string().optional(),
    socialMediaLinks: z
      .array(
        z.object({
          platform: z.string(),
          link: z.string(),
        }),
      )
      .optional(),
  }),
});

export const profileZodValidation = {
  createProfileZodScehma,
  UpdateProfileZodScehma
};
