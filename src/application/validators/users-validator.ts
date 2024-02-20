import { InvalidInput } from '../../core/exceptions/InvalidInput';
import { UserProps } from '../../domains/User';

export class UsersValidator {
  private static readonly NAME_MIN_LENGTH = 3;
  private static readonly NAME_MAX_LENGTH = 255;
  private static readonly EMAIL_REGEX = /^\S+@\S+\.\S+$/;
  private static readonly ID_REGEX = /^[a-zA-Z0-9-_]{1,}$/;
  private static readonly PASSWORD_MIN_LENGTH = 8;
  private static readonly PASSWORD_MAX_LENGTH = 16;

  validateId(id: string): void {
    if (!id || !UsersValidator.ID_REGEX.test(id)) {
      throw new InvalidInput('Invalid id format');
    }
  }

  validateName(name: string | null): void {
    if (
      name &&
      (name.length < UsersValidator.NAME_MIN_LENGTH ||
        name.length > UsersValidator.NAME_MAX_LENGTH)
    ) {
      throw new InvalidInput('Invalid name length (3-255 characters)');
    }
  }

  validateEmail(email: string): void {
    if (!email || !UsersValidator.EMAIL_REGEX.test(email)) {
      throw new InvalidInput('Invalid email format');
    }
  }

  validatePassword(password: string): void {
    if (
      !password ||
      password.length < UsersValidator.PASSWORD_MIN_LENGTH ||
      password.length > UsersValidator.PASSWORD_MAX_LENGTH
    ) {
      throw new InvalidInput('Invalid password length (8-16 characters)');
    }
  }

  validate(props: UserProps): void {
    this.validateName(props.name);
    this.validateEmail(props.email);
    this.validatePassword(props.password);
  }
}
