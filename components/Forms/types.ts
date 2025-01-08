import { z } from 'zod';
import { createProjectSchema } from './Schema';

export type CreateFormType = z.infer<typeof createProjectSchema>;
