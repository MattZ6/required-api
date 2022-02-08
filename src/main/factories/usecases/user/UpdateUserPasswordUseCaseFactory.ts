import { UpdateUserPasswordUseCase } from '@data/usecases/user/UpdateUserPassword';

import { makeBcryptjsHashProvider } from '@main/factories/providers/cryptography/BcryptjsHashProviderFactory';
import { makePostgresUsersRepository } from '@main/factories/repositories/user/PostgresUsersRepositoryFactory';

export function makeUpdateUserPasswordUseCase() {
  const usersRepository = makePostgresUsersRepository();

  const hashProvider = makeBcryptjsHashProvider();

  return new UpdateUserPasswordUseCase(
    usersRepository,
    hashProvider,
    hashProvider,
    usersRepository
  );
}
