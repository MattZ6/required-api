import { CreateUserUseCase } from '@data/usecases/user/CreateUser';

import { makeBcryptjsHashProvider } from '@main/factories/providers/cryptography/BcryptjsHashProviderFactory';
import { makePostgresUsersRepository } from '@main/factories/repositories/user/PostgresUsersRepositoryFactory';

export function makeCreateUserUseCase() {
  const usersRepository = makePostgresUsersRepository();

  const hashProvider = makeBcryptjsHashProvider();

  return new CreateUserUseCase(usersRepository, hashProvider, usersRepository);
}
