import { UserCreateDto } from '../../dtos/users/user-create.dto';
import { ListUsersDto } from '../../dtos/users/user-list.dto';
import { UserUpdateDto } from '../../dtos/users/user-update.dto';
import { BadRequest } from '../../exceptions/BadRequest';
import { NotFound } from '../../exceptions/NotFound';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

// Lógica de negócio para operações em usuários
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async list(params: ListUsersDto): Promise<User[]> {
    const usersProps = await this.userRepository.findAll(params);

    const users = usersProps.map((userProps) => new User(userProps));

    return users;
  }

  async retrieve(id: string): Promise<User> {
    const userProps = await this.userRepository.findById(id);

    if (!userProps) {
      throw new NotFound({ message: 'User not exists!' });
    }

    const user = new User(userProps);

    return user;
  }

  async create(data: UserCreateDto): Promise<User> {
    const alreadyExists = await this.userRepository.findByEmail(data.email);

    if (alreadyExists) {
      throw new BadRequest({ message: 'User already exists!' });
    }

    const user = new User({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    await this.userRepository.create(user);

    return user;
  }

  async update(data: UserUpdateDto): Promise<User> {
    const userProps = await this.userRepository.findById(data.id);

    if (!userProps) {
      throw new NotFound({ message: 'User not exists!' });
    }

    const user = new User(userProps);

    user.update({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    await this.userRepository.update(user);

    user.save();

    return user;
  }

  async delete(id: string): Promise<User> {
    const userProps = await this.userRepository.findById(id);

    if (!userProps) {
      throw new NotFound({ message: 'User not exists!' });
    }

    const user = new User(userProps);

    await this.userRepository.delete(user);

    return user;
  }
}
