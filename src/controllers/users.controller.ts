import { prisma } from '../database/prisma';
import { User } from '../domains/users/user.entity';
import { UserRepository } from '../domains/users/user.repository';
import { UserService } from '../domains/users/user.service';
import { Request, Response } from 'express';

const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);

export interface QueryUserIndex {
  search?: string;
  take?: string;
  skip?: string;
}

export interface ResponseUserIndex {
  users: User[];
}

export class UserController {
  async index(
    req: Request<{}, {}, {}, QueryUserIndex>,
    res: Response<ResponseUserIndex>
  ): Promise<void> {
    const users = await userService.list({
      search: req.query.search,
      skip: Number(req.query.skip),
      take: Number(req.query.take),
    });

    res.json({ users });
  }

  async show(req: Request, res: Response): Promise<void> {
    const user = await userService.retrieve(req.params.id);

    res.json({ user });
  }

  async store(req: Request, res: Response): Promise<void> {
    const user = await userService.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(201).json({ user });
  }

  async update(req: Request, res: Response): Promise<void> {
    const user = await userService.update(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.json({ user });
  }

  async destroy(req: Request, res: Response): Promise<void> {
    await userService.delete(req.params.id);

    res.json({ message: 'User deleted' });
  }
}
