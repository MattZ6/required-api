import { PresentationError } from '@presentation/errors';

export class AccessTokenNotProvidedError extends PresentationError {
  constructor(message = 'Missing access token.') {
    super(message);
  }
}
