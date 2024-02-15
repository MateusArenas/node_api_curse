import { Request, Response } from 'express';

import { prisma } from '../database/prisma';
import { User } from '../domains/users/user.entity';
import { UserRepository } from '../domains/users/user.repository';
import { UserService } from '../domains/users/user.service';
import { UserCreateDto } from '../dtos/users/user-create.dto';
import { ListUsersDto } from '../dtos/users/user-list.dto';
import { UserUpdateDto } from '../dtos/users/user-update.dto';
import {
  createUserValidator,
  listUserValidator,
  updateUserValidator,
} from '../validators/user.validator';

const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);

export class UserController {
  async index(
    req: Request<{}, {}, {}, ListUsersDto>,
    res: Response<{ users: User[] }>
  ): Promise<void> {
    const data = req.qs<ListUsersDto>();

    const payload = await listUserValidator.validate(data);

    const users = await userService.list({
      search: payload.search,
      skip: payload.skip,
      take: payload.take,
    });

    res.json({ users });
  }

  async show(req: Request, res: Response): Promise<void> {
    const user = await userService.retrieve(req.params.id);

    res.json({ user });
  }

  async store(req: Request<{}, UserCreateDto>, res: Response): Promise<void> {
    const data = req.all<UserCreateDto>();

    const payload = await createUserValidator.validate(data);

    const user = await userService.create({
      name: payload.name,
      email: payload.email,
      password: payload.password,
    });

    res.status(201).json({ user });
  }

  async update(
    req: Request<{ id: string }, Partial<UserCreateDto>>,
    res: Response
  ): Promise<void> {
    const data = req.all<UserUpdateDto>();
    const payload = await updateUserValidator.validate(data);

    const user = await userService.update({
      id: payload.id,
      name: payload.name,
      email: payload.email,
      password: payload.password,
    });

    res.json({ user });
  }

  async destroy(req: Request<{ id: string }>, res: Response): Promise<void> {
    await userService.delete(req.params.id);

    res.json({ message: 'User deleted' });
  }
}
