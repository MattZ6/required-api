import { DomainError } from '@domain/errors';

export class UserTokenExpiredError extends DomainError {
  constructor(message = 'Token has expired', code = 'token.expired') {
    super(message, code);
  }
}
