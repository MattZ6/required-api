import { UserAlreadyExistsWithThisEmailError } from '@domain/error/UserAlreadyExistsWithThisEmailError';
import { ICreateUserUseCase } from '@domain/usecases/CreateUser';

import { created, unprocessableEntity } from '@presentation/helpers/http/http';
import { IController } from '@presentation/protocols/Controller';
import { IHttpRespose } from '@presentation/protocols/Http';

import { SignUpRequest } from './types';

export class CreateAccountController implements IController {
  constructor(private readonly createUserUseCase: ICreateUserUseCase) {}

  async handle(request: SignUpRequest): Promise<IHttpRespose> {
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
