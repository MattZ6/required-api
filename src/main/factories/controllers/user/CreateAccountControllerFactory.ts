import { CreateAccountController } from '@presentation/controllers/user/CreateAccount';
import { IController } from '@presentation/protocols/Controller';

import { makeCreateUserUseCase } from '@main/factories/usecases/user/CreateUserUseCaseFactory';

export function makeCreateAccountController(): IController {
  const createUserUseCase = makeCreateUserUseCase();

  return new CreateAccountController(createUserUseCase);
}
