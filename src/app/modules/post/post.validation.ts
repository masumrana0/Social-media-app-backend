import z from 'zod';

// Zod schema for post
const usePostZodSchema = z.object({
  user: z.string({ required_error: 'User ID is required' }),
  hashTag: z.string().optional(),
  status: z.string().optional(),
  Images: z.array(z.string()).optional(),
  comments: z.array(z.string()).optional(),
  Reactions: z.array(
    z.object({
      user: z.string({ required_error: 'User ID is required' }),
      totalLike: z.number().default(0),
      totalUnlike: z.number().default(0),
      totalLove: z.number().default(0),
    })
  ).default([]),
  Location: z.object({
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }).optional(),
  ShareCount: z.number().default(0),
  postVisibility: z.object({
    public: z.boolean().default(false),
    friendlyOnly: z.boolean().default(false),
    onlyMe: z.boolean().default(false),
  }).optional(),
});


export const postZodSchema = {
    usePostZodSchema,
  };
  