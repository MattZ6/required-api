import { GetUserProfileController } from '@presentation/controllers/user/GetProfile';
import { IController } from '@presentation/protocols/Controller';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandlerDecoratorFactory';
import { makeGetUserProfileUseCase } from '@main/factories/usecases/user/GetUserProfileUseCaseFactory';

export function makeGetUserProfileController(): IController {
  const getUserProfileUseCase = makeGetUserProfileUseCase();

  const controller = new GetUserProfileController(getUserProfileUseCase);

  return makeControllerErrorHandlerDecorator(controller);
}
