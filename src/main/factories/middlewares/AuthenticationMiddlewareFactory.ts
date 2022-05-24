import { AuthenticationMiddleware } from '@presentation/middlewares/Authentication';

import { makeJWTCryptographyProvider } from '@main/factories/providers/cryptography/JWTCryptographyProviderFactory';

import { makeMiddlewareErrorHandlerDecorator } from '../decorators/MiddlewareErrorHandlerDecoratorFactory';

export function makeAuthenticationMiddleware() {
  const cryptographyProvider = makeJWTCryptographyProvider();

  const middleware = new AuthenticationMiddleware(cryptographyProvider);

  return makeMiddlewareErrorHandlerDecorator(middleware);
}
