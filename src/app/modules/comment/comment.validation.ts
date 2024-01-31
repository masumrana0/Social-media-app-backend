import z from 'zod';

const commentZodSchema = z.object({
  user: z.object({ _id: z.string() }).optional(),
  post: z.object({ _id: z.string() }).refine(data => data._id, {
    message: 'Post ID is required.',
  }),
  comment: z.string({ required_error: 'comment is required' }),
});

export const commentValidationSchema = {
  commentZodSchema,
};
