import { DomainError } from '@domain/errors';

export class UserTokenNotFoundWithProvidedTokenError extends DomainError {
  constructor(message = 'Token not present.', code = 'token.not.provided') {
    super(message, code);
  }
}
