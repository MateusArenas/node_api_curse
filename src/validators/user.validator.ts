import { createUserSchema } from '../dtos/users/user-create.dto';
import { listUserSchema } from '../dtos/users/user-list.dto';
import { updateUserSchema } from '../dtos/users/user-update.dto';
import { Validator } from '../modules/Validator';

//referência: https://docs.adonisjs.com/guides/validation

export const createUserValidator = new Validator(createUserSchema);
export const listUserValidator = new Validator(listUserSchema);
export const updateUserValidator = new Validator(updateUserSchema);
