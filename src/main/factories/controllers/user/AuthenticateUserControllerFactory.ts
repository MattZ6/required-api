import { AuthenticateUserController } from '@presentation/controllers/user/AuthenticateUser';
import { IController } from '@presentation/protocols/Controller';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandlerDecoratorFactory';
import { makeAuthenticateUserUseCase } from '@main/factories/usecases/user/AuthenticateUserUseCaseFactory';

export function makeAuthenticateUserController(): IController {
  const authenticateUserUseCase = makeAuthenticateUserUseCase();

  const controller = new AuthenticateUserController(authenticateUserUseCase);

  return makeControllerErrorHandlerDecorator(controller);
}
