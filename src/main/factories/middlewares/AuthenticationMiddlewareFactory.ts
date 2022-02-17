import { AuthenticationMiddleware } from '@presentation/middlewares/Authentications';

import { makeJWTCryptographyProvider } from '@main/factories/providers/cryptography/JWTCryptographyProviderFactory';

export function makeAuthenticationMiddleware() {
  const cryptographyProvider = makeJWTCryptographyProvider();

  return new AuthenticationMiddleware(cryptographyProvider);
}
