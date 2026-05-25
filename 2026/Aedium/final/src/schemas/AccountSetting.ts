import * as z from 'zod';

export const profileUpdateSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
});

export type ProfileUpdate = z.infer<typeof profileUpdateSchema>;
