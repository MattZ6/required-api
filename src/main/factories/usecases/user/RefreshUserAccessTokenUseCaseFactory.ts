import { RefreshUserAccessTokenUseCase } from '@application/usecases/user/RefreshUserAccessToken';

import { authConfig } from '@main/config/env/auth';
import { makeJWTCryptographyProvider } from '@main/factories/providers/cryptography/JWTCryptographyProviderFactory';
import { makeUuidProvider } from '@main/factories/providers/uuid/UuidProviderFactory';
import { makePostgresUserTokensRepository } from '@main/factories/repositories/user/token/PostgresUserTokensRepositoryFactory';

export function makeRefreshUserAccessTokenUseCase() {
  const userTokensRepository = makePostgresUserTokensRepository();

  const cryptographyProvider = makeJWTCryptographyProvider();
  const uuidProvider = makeUuidProvider();

  return new RefreshUserAccessTokenUseCase(
    userTokensRepository,
    cryptographyProvider,
    uuidProvider,
    authConfig.REFRESH_TOKEN_EXPIRES_IN_MILLISSECONDS,
    userTokensRepository,
    userTokensRepository
  );
}
