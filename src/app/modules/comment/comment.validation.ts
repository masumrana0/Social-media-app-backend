import z from 'zod';

const commentZodSchema = z.object({
  body: z.object({
    user: z.string({}).optional(),
    post: z.string({ required_error: 'post id is required' }),
    comment: z.string({ required_error: 'comment is required' }),
  }),
});

export const commentValidationSchema = {
  commentZodSchema,
};
