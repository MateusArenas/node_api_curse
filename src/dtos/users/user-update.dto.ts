import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Expected String type in name.',
    })
    .optional(),
  email: z
    .string({
      invalid_type_error: 'Expected String type in email.',
    })
    .optional(),
  password: z
    .string({
      invalid_type_error: 'Expected String type in password.',
    })
    .optional(),
});

export type UserUpdateDto = z.infer<typeof updateUserSchema>;
