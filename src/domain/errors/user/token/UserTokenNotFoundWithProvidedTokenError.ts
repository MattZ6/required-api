import { DomainError } from '@domain/errors';

export class UserTokenNotFoundWithProvidedTokenError extends DomainError {
  constructor(message = 'Token not found.') {
    super(message);
  }
}
