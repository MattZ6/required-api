import { DomainError } from '@domain/errors';

export class UserNotFoundWithProvidedEmailError extends DomainError {
  constructor(message = 'Theres no user registered user with this email.') {
    super(message);
  }
}
