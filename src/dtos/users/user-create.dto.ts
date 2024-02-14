import { z } from 'zod';

z.setErrorMap((issue, _ctx) => {
  console.log({ issue });

  _ctx.defaultError;

  issue.message;

  // switch (issue.code) {
  //   case '':
  //     break;

  //   default:
  //     break;
  // }

  return {
    message: _ctx.defaultError || 'olá mundo',
  };
});

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email('email invalid format.'),
  password: z.string(),
});

export type UserCreateDto = z.infer<typeof createUserSchema>;
