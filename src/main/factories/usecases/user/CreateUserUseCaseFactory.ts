import { CreateUserUseCase } from '@application/usecases/user/Create';

import { makeBcryptjsHashProvider } from '@main/factories/providers/cryptography/BcryptjsHashProviderFactory';
import { makePostgresUsersRepository } from '@main/factories/repositories/user/PostgresUsersRepositoryFactory';

export function makeCreateUserUseCase() {
  const usersRepository = makePostgresUsersRepository();

  const hashProvider = makeBcryptjsHashProvider();

  return new CreateUserUseCase(usersRepository, hashProvider, usersRepository);
}
