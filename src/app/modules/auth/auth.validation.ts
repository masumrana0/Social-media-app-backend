import z from 'zod';

// refresh Token Zod Schema
const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});

// change Password Zod Schema
const changePasswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password  is required',
    }),
    newPassword: z.string({
      required_error: 'new password  is required',
    }),
  }),
});

export const authValidationSchema = {
  refreshTokenZodSchema,
  changePasswordZodSchema,
};
