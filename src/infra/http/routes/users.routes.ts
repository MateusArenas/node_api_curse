import express from 'express';

import { UserController } from '../controllers/users.controller';

export const router = express.Router();

const usersController = new UserController();

router.get('/users/', usersController.index);
router.get('/users/:id', usersController.show);

router.post('/users', usersController.store);
router.put('/users/:id', usersController.update);

router.delete('/users/:id', usersController.destroy);
