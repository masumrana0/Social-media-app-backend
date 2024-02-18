import z from 'zod';

const conversationZodSchema = z.object({
  body: z.object({
    creator: z.string({ required_error: 'creator id is required' }),
    participant: z.string({ required_error: 'participant id is required' }),
  }),
});

export const conversationValidation = {
  conversationZodSchema,
};
