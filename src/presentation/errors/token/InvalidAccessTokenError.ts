import { PresentationError } from '@presentation/errors';

export class InvalidAccessTokenError extends PresentationError {
  constructor(message = 'Invalid access token.') {
    super(message);
  }
}
