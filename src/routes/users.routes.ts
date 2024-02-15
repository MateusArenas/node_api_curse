import express from 'express';

import { UserController } from '../controllers/users.controller';
import { payloadHandling } from '../handlers/payloadHandling';

export const router = express.Router();

const usersController = new UserController();

router.get('/users/', usersController.index);
router.get('/users/:id', usersController.show);

router.post('/users', usersController.store);
router.put('/users/:id', usersController.update);

router.delete('/users/:id', usersController.destroy);

// import { UserCreateDto } from '../dtos/users/user-create.dto';
// import { UserUpdateDto } from '../dtos/users/user-update.dto';

// router.post('/', validateRequest(UserCreateDto), usersController.create);
// router.put('/:id', validateRequest(UserUpdateDto), usersController.update);
