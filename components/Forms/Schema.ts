import { z } from 'zod';

export const createProjectSchema = z.object({
  title: z.string().min(4, {
    message: 'Title must be at least 4 characters.',
  }),
  url: z.string().url('Invalid URL format'),
});
