import { UpdateUserEmailUseCase } from '@application/usecases/user/UpdateEmail';

import { makePostgresUsersRepository } from '@main/factories/repositories/user/PostgresUsersRepositoryFactory';

export function makeUpdateUserEmailUseCase() {
  const usersRepository = makePostgresUsersRepository();

  return new UpdateUserEmailUseCase(
    usersRepository,
    usersRepository,
    usersRepository
  );
}
