import { UserAlreadyExistsWithThisEmailError } from '@domain/errors';
import { ICreateUserUseCase } from '@domain/usecases/user/CreateUser';

import { created, unprocessableEntity } from '@presentation/helpers/http/http';
import { IController, IHttpRespose } from '@presentation/protocols';

import { CreateAccountRequest } from './types';

export class CreateAccountController implements IController {
  constructor(private readonly createUserUseCase: ICreateUserUseCase) {}

  async handle(request: CreateAccountRequest): Promise<IHttpRespose> {
    try {
      const { name, email, password } = request.body;

      await this.createUserUseCase.execute({
        name,
        email,
        password,
      });

      return created<void>();
    } catch (error) {
      if (error instanceof UserAlreadyExistsWithThisEmailError) {
        return unprocessableEntity(error);
      }

      throw error;
    }
  }
}
