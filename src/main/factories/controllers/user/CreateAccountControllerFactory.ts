import { CreateAccountController } from '@presentation/controllers/user/CreateAccount';
import { IController } from '@presentation/protocols/Controller';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandlerDecoratorFactory';
import { makeCreateUserUseCase } from '@main/factories/usecases/user/CreateUserUseCaseFactory';

export function makeCreateAccountController(): IController {
  const createUserUseCase = makeCreateUserUseCase();

  const controller = new CreateAccountController(createUserUseCase);

  return makeControllerErrorHandlerDecorator(controller);
}
