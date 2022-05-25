import { CreateAccountController } from '@presentation/controllers/user/CreateAccount';
import { IController } from '@presentation/protocols';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandlerDecoratorFactory';
import { makeCreateUserUseCase } from '@main/factories/usecases/user/Create';
import { makeCreateAccountControllerValidation } from '@main/factories/validators/controllers/user/CreateAccount';

export function makeCreateAccountController(): IController {
  const validation = makeCreateAccountControllerValidation();

  const createUserUseCase = makeCreateUserUseCase();

  const controller = new CreateAccountController(validation, createUserUseCase);

  return makeControllerErrorHandlerDecorator(controller);
}
