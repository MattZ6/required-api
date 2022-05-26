import { PresentationError } from '@presentation/errors';

export class AccessTokenExpiredError extends PresentationError {
  constructor(message = 'The access token is expired', code = 'token.expired') {
    super(message, code);
  }
}
