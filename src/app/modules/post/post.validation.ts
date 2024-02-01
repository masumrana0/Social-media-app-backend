import z from 'zod';

const postZodScehma = z.object({
  body: z.object({
    user: z.string().optional(),
    postText: z.string({ required_error: 'status is is required' }),
    Images: z.array(z.string()).optional(),
  }),
});

export const postValidationZodSchema = {
  postZodScehma,
};
