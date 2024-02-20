import { NotFound } from '../../core/exceptions/NotFound';
import { User } from '../../domains/User';
import { UsersFactory } from '../factorys/users-factory';
import { UsersRepository } from '../repositories/users-repository';

interface UpdateUserDto {
  id: string;
  name?: string | null;
  email?: string;
  password?: string;
}

export class UpdateUser {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersFactory: UsersFactory
  ) {}

  async execute(data: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findById(data.id);

    if (!user) {
      throw new NotFound('User not exists!');
    }

    user.update({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    this.usersFactory.validateUser(user);

    await this.usersRepository.update(user);

    return user.save();
  }
}
