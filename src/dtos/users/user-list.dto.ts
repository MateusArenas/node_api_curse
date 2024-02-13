import { z } from 'zod';

export const listUserSchema = z.object({
  search: z.string().optional(),
  skip: z.preprocess(Number, z.number()).default(0),
  take: z.preprocess(Number, z.number()).default(100),
});

export type ListUsersDto = z.infer<typeof listUserSchema>;
