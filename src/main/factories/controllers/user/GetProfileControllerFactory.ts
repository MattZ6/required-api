import { GetProfileController } from '@presentation/controllers/user/GetProfile';
import { IController } from '@presentation/protocols/Controller';

import { makeGetUserProfileUseCase } from '@main/factories/usecases/user/GetUserProfileUseCaseFactory';

export function makeGetProfileController(): IController {
  const getProfileUseCase = makeGetUserProfileUseCase();

  return new GetProfileController(getProfileUseCase);
}
