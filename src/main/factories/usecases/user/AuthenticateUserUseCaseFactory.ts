import { AuthenticateUserUseCase } from '@application/usecases/user/AuthenticateUser';

import { makeBcryptjsHashProvider } from '@main/factories/providers/cryptography/BcryptjsHashProviderFactory';
import { makeJWTCryptographyProvider } from '@main/factories/providers/cryptography/JWTCryptographyProviderFactory';
import { makePostgresUsersRepository } from '@main/factories/repositories/user/PostgresUsersRepositoryFactory';

export function makeAuthenticateUserUseCase() {
  const usersRepository = makePostgresUsersRepository();

  const hashProvider = makeBcryptjsHashProvider();
  const cryptographyProvider = makeJWTCryptographyProvider();

  return new AuthenticateUserUseCase(
    usersRepository,
    hashProvider,
    cryptographyProvider
  );
}
