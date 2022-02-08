import { GetProfileUseCase } from '@data/usecases/user/GetProfile';

import { GetProfileController } from '@presentation/controllers/user/GetProfile';
import { IController } from '@presentation/protocols/Controller';

import { makePostgresUsersRepository } from '@main/factories/repositories/PostgresUsersRepositoryFactory';

export const makeGetProfileController = (): IController => {
  const usersRepository = makePostgresUsersRepository();

  const getProfileUseCase = new GetProfileUseCase(usersRepository);

  return new GetProfileController(getProfileUseCase);
};
