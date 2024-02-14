import z from 'zod';

const comment_ReplyZodSchema = z.object({
  body: z.object({
    user: z.string({}).optional(),
    comment: z.string({ required_error: 'comment id is required' }),
    comment_reply: z.string({ required_error: 'comment_reply is required' }),
  }),
});

export const comment_ReplyValidationSchema = {
  comment_ReplyZodSchema,
};
