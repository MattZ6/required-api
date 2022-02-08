import { UpdateUserEmailUseCase } from '@data/usecases/user/UpdateUserEmail';

import { makePostgresUsersRepository } from '@main/factories/repositories/user/PostgresUsersRepositoryFactory';

export function makeUpdateUserEmailUseCase() {
  const usersRepository = makePostgresUsersRepository();

  return new UpdateUserEmailUseCase(
    usersRepository,
    usersRepository,
    usersRepository
  );
}
