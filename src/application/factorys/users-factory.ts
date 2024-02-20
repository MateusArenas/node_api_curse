import { User, UserProps } from '../../domains/User';
import { UsersValidator } from '../validators/users-validator';

export class UsersFactory {
  constructor(private readonly usersValidator: UsersValidator) {}

  createUserWithoutValidate(props: UserProps): User {
    return new User(props);
  }

  createUser(props: UserProps): User {
    this.usersValidator.validate(props);
    return new User(props);
  }

  validateUser(user: User) {
    this.usersValidator.validate(user.getProps());
    return user;
  }
}
