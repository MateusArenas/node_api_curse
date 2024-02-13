import express from 'express';
import { UserController } from '../controllers/users.controller';
import { createUserSchema } from '../dtos/users/user-create.dto';
import { userCreatePipe } from '../pipes/user-create.pipe';
import { userUpdatePipe } from '../pipes/user-update.pipe';
import { updateUserSchema } from '../dtos/users/user-update.dto';
import { listUserSchema } from '../dtos/users/user-list.dto';
import { userListPipe } from '../pipes/user-list.pipe';

export const router = express.Router();

const usersController = new UserController();

router.get('/users/', userListPipe(listUserSchema), usersController.index);
router.get('/users/:id', usersController.show);

router.post('/users', userCreatePipe(createUserSchema), usersController.store);
router.put(
  '/users/:id',
  userUpdatePipe(updateUserSchema),
  usersController.update
);

router.delete('/users/:id', usersController.destroy);

// import { UserCreateDto } from '../dtos/users/user-create.dto';
// import { UserUpdateDto } from '../dtos/users/user-update.dto';

// router.post('/', validateRequest(UserCreateDto), usersController.create);
// router.put('/:id', validateRequest(UserUpdateDto), usersController.update);
