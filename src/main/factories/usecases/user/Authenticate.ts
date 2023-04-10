import { AuthenticateUserUseCase } from '@application/usecases/user/Authenticate'

import { authConfig } from '@main/config/env/auth'
import { makeCryptographyProvider } from '@main/factories/providers/cryptography/Cryptography'
import { makeHashProvider } from '@main/factories/providers/cryptography/Hash'
import { makeUuidProvider } from '@main/factories/providers/uuid/Uuid'
import { makeUsersRepository } from '@main/factories/repositories/User'
import { makeUserTokensRepository } from '@main/factories/repositories/UserToken'

export function makeAuthenticateUserUseCase() {
  const usersRepository = makeUsersRepository()
  const userTokensRepository = makeUserTokensRepository()

  const hashProvider = makeHashProvider()
  const cryptographyProvider = makeCryptographyProvider()
  const uuidProvider = makeUuidProvider()

  return new AuthenticateUserUseCase(
    usersRepository,
    hashProvider,
    cryptographyProvider,
    uuidProvider,
    authConfig.REFRESH_TOKEN_EXPIRES_IN_MILLISSECONDS,
    userTokensRepository,
  )
}
