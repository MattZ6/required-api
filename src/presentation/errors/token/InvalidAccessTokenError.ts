import { PresentationError } from '@presentation/errors';

export class InvalidAccessTokenError extends PresentationError {
  constructor(message = 'Invalid access token', code = 'token.invalid') {
    super(message, code);
  }
}
