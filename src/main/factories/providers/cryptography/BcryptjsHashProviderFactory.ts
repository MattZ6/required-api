import { BcryptjsHashProvider } from '@infra/providers/cryptography/hash/BcryptjsHashProvider';

import { authConfig } from '@main/config/env/auth';

export function makeBcryptjsHashProvider() {
  return new BcryptjsHashProvider(authConfig.HASH_SALT);
}
