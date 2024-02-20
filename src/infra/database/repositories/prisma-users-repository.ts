import { UsersFactory } from '../../../application/factorys/users-factory';
import { UsersRepository } from '../../../application/repositories/users-repository';
import { User } from '../../../domains/User';
import { prisma } from '../prisma';

export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly usersFactory: UsersFactory) {}

  async findAll() {
    const users = await prisma.user.findMany({});

    return users.map((user) =>
      this.usersFactory.createUserWithoutValidate(user)
    );
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) return null;

    return this.usersFactory.createUserWithoutValidate(user);
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return null;

    return this.usersFactory.createUserWithoutValidate(user);
  }

  async create(user: User) {
    await prisma.user.create({
      data: user.getProps(),
    });
  }

  async update(user: User) {
    await prisma.user.update({
      where: { id: user.id },
      data: user.getChanges(),
    });
  }

  async delete(user: User) {
    await prisma.user.delete({ where: { id: user.id } });
  }
}
