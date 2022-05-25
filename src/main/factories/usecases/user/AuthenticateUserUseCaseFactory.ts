import { AuthenticateUserUseCase } from '@application/usecases/user/Authenticate';

import { authConfig } from '@main/config/env/auth';
import { makeBcryptjsHashProvider } from '@main/factories/providers/cryptography/BcryptjsHashProviderFactory';
import { makeJWTCryptographyProvider } from '@main/factories/providers/cryptography/JWTCryptographyProviderFactory';
import { makeUuidProvider } from '@main/factories/providers/uuid/UuidProviderFactory';
import { makePostgresUsersRepository } from '@main/factories/repositories/user/PostgresUsersRepositoryFactory';
import { makePostgresUserTokensRepository } from '@main/factories/repositories/user/token/PostgresUserTokensRepositoryFactory';

export function makeAuthenticateUserUseCase() {
  const usersRepository = makePostgresUsersRepository();
  const userTokensRepository = makePostgresUserTokensRepository();

  const hashProvider = makeBcryptjsHashProvider();
  const cryptographyProvider = makeJWTCryptographyProvider();
  const uuidProvider = makeUuidProvider();

  return new AuthenticateUserUseCase(
    usersRepository,
    hashProvider,
    cryptographyProvider,
    uuidProvider,
    authConfig.REFRESH_TOKEN_EXPIRES_IN_MILLISSECONDS,
    userTokensRepository
  );
}
