import { AuthenticationMiddleware } from '@presentation/middlewares/Authentication'

import { makeMiddlewareErrorHandlerDecorator } from '../decorators/MiddlewareErrorHandlerDecoratorFactory'
import { makeCryptographyProvider } from '../providers/cryptography/Cryptography'

export function makeAuthenticationMiddleware() {
  const cryptographyProvider = makeCryptographyProvider()

  const middleware = new AuthenticationMiddleware(cryptographyProvider)

  return makeMiddlewareErrorHandlerDecorator(middleware)
}
