import { PrismaClient } from '@prisma/client';
import { User } from './user.entity';
import { ListUsersDto } from '../../dtos/users/user-list.dto';

// Métodos para recuperar, persistir e modificar usuários
export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(data: ListUsersDto) {
    return await this.prisma.user.findMany({
      skip: data.skip,
      take: data.take,
      where: data.search
        ? {
            OR: [
              { name: { contains: data.search } },
              { email: { contains: data.search } },
            ],
          }
        : {},
    });
  }

  async findById(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async create(user: User) {
    await this.prisma.user.create({
      data: user.getProps(),
    });
  }

  async update(user: User) {
    await this.prisma.user.update({
      where: { id: user.id },
      data: user.getChanges(),
    });
  }

  async delete(user: User) {
    await this.prisma.user.delete({ where: { id: user.id } });
  }
}
