import { DomainError } from '@domain/errors';

export class WrongPasswordError extends DomainError {
  constructor(message = 'The password does not match.') {
    super(message);
  }
}
