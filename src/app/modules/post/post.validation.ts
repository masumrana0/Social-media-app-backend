import z from 'zod';

const postZodScehma = z.object({
  body: z.object({
    user: z.string({ required_error: 'user refrenece id is required' }),
    postText: z.string({ required_error: 'status is is required' }),
    Images: z.array(z.string()).optional(),
  }),
});

export const postValidationZodSchema = {
  postZodScehma,
};
