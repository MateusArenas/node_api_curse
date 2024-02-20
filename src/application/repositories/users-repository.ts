import { User } from '../../domains/User';
import { UsersFactory } from '../factorys/users-factory';

export interface UsersRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(customer: User): Promise<void>;
  update(customer: User): Promise<void>;
  delete(customer: User): Promise<void>;
}
