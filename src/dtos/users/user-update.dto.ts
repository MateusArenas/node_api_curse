import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
});

export type UserUpdateDto = z.infer<typeof updateUserSchema>;
