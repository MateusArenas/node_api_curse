import { Request, Response } from 'express';

import { UserCreateDto } from '../dtos/user-create.dto';
import { ListUsersDto } from '../dtos/user-list.dto';
import { UserUpdateDto } from '../dtos/user-update.dto';

import { PrismaUsersRepository } from '../../database/repositories/prisma-users-repository';
import { UsersFactory } from '../../../application/factorys/users-factory';
import { UsersValidator } from '../../../application/validators/users-validator';
import { CreateUser } from '../../../application/usecases/create-user';
import { User } from '../../../domains/User';
import { ListUser } from '../../../application/usecases/list-user';
import { RetrieveUser } from '../../../application/usecases/retrieve-user';
import { UpdateUser } from '../../../application/usecases/update-user';
import { DeleteUser } from '../../../application/usecases/delete-user';

const usersValidator = new UsersValidator();
const usersFactory = new UsersFactory(usersValidator);

const userRepository = new PrismaUsersRepository(usersFactory);

const listUser = new ListUser(userRepository);
const retrieveUser = new RetrieveUser(userRepository);
const createUser = new CreateUser(userRepository, usersFactory);
const updateUser = new UpdateUser(userRepository, usersFactory);
const deleteUser = new DeleteUser(userRepository);

export class UserController {
  async index(
    req: Request<{}, {}, {}, ListUsersDto>,
    res: Response<{ users: User[] }>
  ): Promise<void> {
    const users = await listUser.execute();

    res.json({ users });
  }

  async show(req: Request, res: Response): Promise<void> {
    const user = await retrieveUser.execute(req.params.id);

    res.json({ user });
  }

  async store(req: Request<{}, UserCreateDto>, res: Response): Promise<void> {
    const data = req.all<UserCreateDto>();

    const user = await createUser.execute({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    res.status(201).json({ user });
  }

  async update(
    req: Request<{ id: string }, Partial<UserCreateDto>>,
    res: Response
  ): Promise<void> {
    const data = req.all<UserUpdateDto>();

    const user = await updateUser.execute({
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
    });

    res.json({ user });
  }

  async destroy(req: Request<{ id: string }>, res: Response): Promise<void> {
    await deleteUser.execute(req.params.id);

    res.json({ message: 'User deleted' });
  }
}
