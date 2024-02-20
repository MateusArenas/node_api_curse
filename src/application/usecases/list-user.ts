import { User } from '../../domains/User';
import { UsersRepository } from '../repositories/users-repository';

export class ListUser {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(): Promise<User[]> {
    const users = await this.usersRepository.findAll();
    return users;
  }
}
