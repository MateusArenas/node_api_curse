import { z } from 'zod';

import { Validator } from '../../../core/Validator';

export const userListValidator = new Validator(
  z.object({
    search: z
      .string({
        invalid_type_error: 'Expected String type in search.',
      })
      .optional(),
    skip: z
      .preprocess(
        Number,
        z.number({
          invalid_type_error: 'Expected Number type in skip.',
        })
      )
      .default(0),
    take: z
      .preprocess(
        Number,
        z.number({
          invalid_type_error: 'Expected Number type in take.',
        })
      )
      .default(100),
  })
);
