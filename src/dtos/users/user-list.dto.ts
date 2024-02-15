import { z } from 'zod';

export const listUserSchema = z.object({
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
});

export type ListUsersDto = z.infer<typeof listUserSchema>;
