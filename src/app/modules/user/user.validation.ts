/**
 * Title: 'Zod schema define by Masum Rana'
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 24-01-2024
 *
 */

import z from 'zod';

const IName = z.object({
  firstName: z.string({ required_error: 'First name is required' }),
  lastName: z.string(),
});

const UserZodScehma = z.object({
  body: z.object({
    userName: z.string().optional(),
    name: IName,
    email: z
      .string({ required_error: 'email is required' })
      .email({ message: 'invalid email' }),
    password: z.string({ required_error: 'password is required' }),
    // nationality: z.string(),
  }),
});

export const userValidationZodSchema = {
  UserZodScehma,
};
