import { Conflict } from '../../core/exceptions/Conflict';
import { User } from '../../domains/User';
import { UsersFactory } from '../factorys/users-factory';
import { UsersRepository } from '../repositories/users-repository';

interface CreateUserDto {
  name: string | null;
  email: string;
  password: string;
}

export class CreateUser {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersFactory: UsersFactory
  ) {}

  async execute(data: CreateUserDto): Promise<User> {
    const alreadyExists = await this.usersRepository.findByEmail(data.email);

    if (alreadyExists) {
      throw new Conflict('User already exists!');
    }

    const user = this.usersFactory.createUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    await this.usersRepository.create(user);

    return user;
  }
}
