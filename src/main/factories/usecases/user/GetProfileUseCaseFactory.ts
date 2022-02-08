import { GetProfileUseCase } from '@data/usecases/user/GetProfile';

import { makePostgresUsersRepository } from '@main/factories/repositories/user/PostgresUsersRepositoryFactory';

export function makeGetProfileUseCase() {
  const usersRepository = makePostgresUsersRepository();

  return new GetProfileUseCase(usersRepository);
}
