import { DomainError } from '@domain/errors';

export class UserAlreadyExistsWithProvidedEmailError extends DomainError {
  constructor(message = 'There is already a registered user with this email.') {
    super(message);
  }
}
