import { Entity, EntityProps } from '../core/entity/entity.abstract';
import bcrypt from 'bcryptjs';

export interface UserProps extends EntityProps {
  id?: string;
  name: string | null;
  email: string;
  password: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

// Propriedades e comportamentos da entidade User
export class User extends Entity<UserProps> {
  constructor(props: UserProps) {
    super({
      id: Entity.randomUUID(),
      ...props,
      createdAt: new Date(),
      updatedAt: null,
    });
  }

  get id(): string {
    return this.get('id');
  }

  set id(value: string) {
    this.setChange('id', value);
  }

  get name(): string | null {
    return this.get('name');
  }

  set name(value: string | null) {
    this.setChange('name', value);
  }

  get email(): string {
    return this.get('email');
  }

  set email(value: string) {
    this.setChange('email', value);
  }

  get password(): string {
    return this.get('password');
  }

  set password(value: string) {
    const hashedPassword = bcrypt.hashSync(value, 10);
    this.setChange('password', hashedPassword);
  }

  get createdAt(): Date | null {
    return this.get('createdAt');
  }

  set createdAt(value: Date) {
    this.setChange('createdAt', value);
  }

  BeforeSaveHook() {
    this.updatedAt = new Date();
  }

  get updatedAt(): Date | null {
    return this.get('updatedAt');
  }

  set updatedAt(value: Date | null) {
    this.setChange('updatedAt', value);
  }
}
