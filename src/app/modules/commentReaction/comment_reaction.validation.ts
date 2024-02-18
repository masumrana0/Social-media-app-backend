import z from 'zod';
import { reactionEnum } from '../reaction/reaction.constant';

const reactionZodSchema = z.object({
  body: z.object({
    user: z.object({}).optional(),
    comment: z.string({ required_error: 'comment is required' }),
    reaction: z.enum(['', ...reactionEnum], {
      required_error: 'reaction is required',
    }),
  }),
});

export const CommentreactionValidationSchema = {
  reactionZodSchema,
};
