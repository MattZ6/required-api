import { UpdateUserEmailUseCase } from '@data/usecases/user/UpdateUserEmail';

import { UpdateProfileEmailController } from '@presentation/controllers/user/UpdateProfileEmail';
import { IController } from '@presentation/protocols/Controller';

import { makePostgresUsersRepository } from '@main/factories/repositories/PostgresUsersRepositoryFactory';

export const makeUpdateProfileEmailController = (): IController => {
  const usersRepository = makePostgresUsersRepository();

  const updateUserEmailUseCase = new UpdateUserEmailUseCase(
    usersRepository,
    usersRepository,
    usersRepository
  );

  return new UpdateProfileEmailController(updateUserEmailUseCase);
};
