import z from 'zod';
const reactionZodSchema = z.object({
  body: z.object({
    user: z.object({ _id: z.string() }).optional(),
    post: z.object({ _id: z.string() }).refine(data => data._id, {
      message: 'Post ID is required.',
    }),
    reaction: z.string({ required_error: 'comment is required' }),
  }),
});

export const reactionValidationSchema = {
  reactionZodSchema,
};
