import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string({
    required_error: 'Required name.',
    invalid_type_error: 'Expected String type in name.',
  }),
  email: z
    .string({
      required_error: 'Required email.',
      invalid_type_error: 'Expected String type in email.',
    })
    .email('Invalid format in email.'),
  password: z.string({
    required_error: 'Required password.',
    invalid_type_error: 'Expected String type in password.',
  }),
});

export type UserCreateDto = z.infer<typeof createUserSchema>;
