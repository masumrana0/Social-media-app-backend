/**
 * Title: 'zod Schema define by Masum Rana'
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 22-01-2024
 *
 */

import z from 'zod';
const userZodSchema = z.object({
  body: z.object({
    userName: z.string().optional(),
    name: z.object({
      firstName: z.string({ required_error: 'firstName is required' }),
      lastName: z.string(),
    }),
    email: z.string({ required_error: 'email is required' }),
    phoneNumber: z.string().optional(),
    password: z.string().optional(),
  }),
});

export const userZodValidation = {
  userZodSchema,
};
