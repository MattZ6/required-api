import { BcryptjsHashProvider } from '@infra/providers/cryptography/hash/BcryptjsHashProvider'

import { authConfig } from '@main/config/env/auth'

export function makeHashProvider() {
  return new BcryptjsHashProvider(authConfig.HASH_SALT)
}
