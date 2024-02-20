import { z } from 'zod';

import { Validator } from '../../../core/Validator';

export const userUpdateValidator = new Validator(
  z.object({
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
  })
);
