import { AuthenticateUserController } from '@presentation/controllers/user/Authenticate';
import { IController } from '@presentation/protocols/Controller';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandlerDecoratorFactory';
import { makeAuthenticateUserUseCase } from '@main/factories/usecases/user/AuthenticateUserUseCaseFactory';
import { makeAuthenticateUserControllerValidation } from '@main/factories/validators/controllers/user/AuthenticateUserControllerValidationFactory';

export function makeAuthenticateUserController(): IController {
  const validation = makeAuthenticateUserControllerValidation();

  const authenticateUserUseCase = makeAuthenticateUserUseCase();

  const controller = new AuthenticateUserController(
    validation,
    authenticateUserUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
