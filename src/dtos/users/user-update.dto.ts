import { z } from 'zod';

export const updateUserSchema = z.object({
  id: z
    .string({
      required_error: 'Required id.',
      invalid_type_error: 'Expected String type in id.',
    })
    .uuid('Invalid format in id.'),
  name: z
    .string({
      invalid_type_error: 'Expected String type in name.',
    })
    .optional(),
  email: z
    .string({
      invalid_type_error: 'Expected String type in email.',
    })
    .email('Invalid format in email.')
    .optional(),
  password: z
    .string({
      invalid_type_error: 'Expected String type in password.',
    })
    .optional(),
});

export type UserUpdateDto = z.infer<typeof updateUserSchema>;
