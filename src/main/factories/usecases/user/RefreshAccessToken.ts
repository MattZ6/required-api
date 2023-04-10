import { RefreshUserAccessTokenUseCase } from '@application/usecases/user/RefreshAccessToken'

import { authConfig } from '@main/config/env/auth'
import { makeCryptographyProvider } from '@main/factories/providers/cryptography/Cryptography'
import { makeUuidProvider } from '@main/factories/providers/uuid/Uuid'
import { makeUserTokensRepository } from '@main/factories/repositories/UserToken'

export function makeRefreshUserAccessTokenUseCase() {
  const userTokensRepository = makeUserTokensRepository()

  const cryptographyProvider = makeCryptographyProvider()
  const uuidProvider = makeUuidProvider()

  return new RefreshUserAccessTokenUseCase(
    userTokensRepository,
    cryptographyProvider,
    uuidProvider,
    authConfig.REFRESH_TOKEN_EXPIRES_IN_MILLISSECONDS,
    userTokensRepository,
    userTokensRepository,
  )
}
