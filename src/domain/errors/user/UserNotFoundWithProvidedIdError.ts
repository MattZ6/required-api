import { DomainError } from '@domain/errors';

export class UserNotFoundWithProvidedIdError extends DomainError {
  constructor(message = 'Theres no user registered user with this email.') {
    super(message);
  }
}
