import { GetProfileUseCase } from '@data/usecases/get-profile/GetProfile';

import { GetProfileController } from '@presentation/controllers/profile/GetProfileController';
import { IController } from '@presentation/protocols/Controller';

import makePostgresUsersRepository from '@main/factories/repositories/PostgresUsersRepositoryFactory';

export const makeGetProfileController = (): IController => {
  const getProfileUseCase = new GetProfileUseCase(makePostgresUsersRepository);

  return new GetProfileController(getProfileUseCase);
};
