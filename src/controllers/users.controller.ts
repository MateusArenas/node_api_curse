import { prisma } from '../database/prisma';
import { User } from '../domains/users/user.entity';
import { UserRepository } from '../domains/users/user.repository';
import { UserService } from '../domains/users/user.service';
import { Request, Response } from 'express';
import { ListUsersDto } from '../dtos/users/user-list.dto';
import { UserCreateDto } from '../dtos/users/user-create.dto';

const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);

export class UserController {
  async index(
    req: Request<{}, {}, {}, ListUsersDto>,
    res: Response<{ users: User[] }>
  ): Promise<void> {
    const users = await userService.list({
      search: req.query.search,
      skip: req.query.skip,
      take: req.query.take,
    });

    res.json({ users });
  }

  async show(req: Request, res: Response): Promise<void> {
    const user = await userService.retrieve(req.params.id);

    res.json({ user });
  }

  async store(req: Request<{}, UserCreateDto>, res: Response): Promise<void> {
    const user = await userService.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(201).json({ user });
  }

  async update(
    req: Request<{ id: string }, Partial<UserCreateDto>>,
    res: Response
  ): Promise<void> {
    const user = await userService.update(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.json({ user });
  }

  async destroy(req: Request<{ id: string }>, res: Response): Promise<void> {
    await userService.delete(req.params.id);

    res.json({ message: 'User deleted' });
  }
}
