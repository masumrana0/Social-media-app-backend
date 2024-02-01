import z from 'zod';
import { reactionEnum } from './reaction.constant';
const reactionZodSchema = z.object({
  body: z.object({
    user: z.object({}).optional(),
    post: z.string({ required_error: 'postId is required' }),
    reaction: z.enum(['', ...reactionEnum], {
      required_error: 'reaction is required',
    }),
  }),
});

export const reactionValidationSchema = {
  reactionZodSchema,
};
