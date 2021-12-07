import { UpdateUserEmailUseCase } from '@data/usecases/update-user-email/UpdateUserEmail';

import { UpdateProfileEmailController } from '@presentation/controllers/profile/UpdateProfileEmailController';
import { IController } from '@presentation/protocols/Controller';

import makePostgresUsersRepository from '@main/factories/repositories/PostgresUsersRepositoryFactory';

export const makeUpdateProfileEmailController = (): IController => {
  const updateUserEmailUseCase = new UpdateUserEmailUseCase(
    makePostgresUsersRepository,
    makePostgresUsersRepository,
    makePostgresUsersRepository
  );

  return new UpdateProfileEmailController(updateUserEmailUseCase);
};
