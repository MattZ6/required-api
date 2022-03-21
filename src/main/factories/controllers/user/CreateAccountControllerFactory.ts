import { CreateAccountController } from '@presentation/controllers/user/CreateAccount';
import { IController } from '@presentation/protocols/Controller';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandlerDecoratorFactory';
import { makeCreateUserUseCase } from '@main/factories/usecases/user/CreateUserUseCaseFactory';
import { makeCreateAccountControllerValidation } from '@main/factories/validators/controllers/user/CreateAccountControllerValidationFactory';

export function makeCreateAccountController(): IController {
  const validation = makeCreateAccountControllerValidation();

  const createUserUseCase = makeCreateUserUseCase();

  const controller = new CreateAccountController(validation, createUserUseCase);

  return makeControllerErrorHandlerDecorator(controller);
}
