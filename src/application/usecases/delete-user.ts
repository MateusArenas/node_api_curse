import { NotFound } from '../../core/exceptions/NotFound';
import { User } from '../../domains/User';
import { UsersRepository } from '../repositories/users-repository';

export class DeleteUser {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFound('User not exists!');
    }

    await this.usersRepository.delete(user);

    return user;
  }
}
