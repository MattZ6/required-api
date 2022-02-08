import { UpdateUserNameUseCase } from '@data/usecases/user/UpdateUserName';

import { makePostgresUsersRepository } from '@main/factories/repositories/user/PostgresUsersRepositoryFactory';

export function makeUpdateUserNameUseCase() {
  const usersRepository = makePostgresUsersRepository();

  return new UpdateUserNameUseCase(usersRepository, usersRepository);
}
