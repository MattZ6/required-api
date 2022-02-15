import { GetUserProfileUseCase } from '@application/usecases/user/GetUserProfile';

import { makePostgresUsersRepository } from '@main/factories/repositories/user/PostgresUsersRepositoryFactory';

export function makeGetUserProfileUseCase() {
  const usersRepository = makePostgresUsersRepository();

  return new GetUserProfileUseCase(usersRepository);
}
