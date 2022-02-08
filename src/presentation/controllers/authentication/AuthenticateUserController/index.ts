import {
  PasswordNotMatchError,
  UserNotFoundWithThisEmailError,
} from '@domain/errors';
import { IAuthenticateUserUseCase } from '@domain/usecases/user/AuthenticateUser';

import {
  notFound,
  ok,
  unprocessableEntity,
} from '@presentation/helpers/http/http';
import { IController, IHttpRespose } from '@presentation/protocols';

import { AuthenticateUserRequest } from './types';

export class AuthenticateUserController implements IController {
  constructor(
    private readonly authenticateUserUseCase: IAuthenticateUserUseCase
  ) {}

  async handle(request: AuthenticateUserRequest): Promise<IHttpRespose> {
    try {
      const { email, password } = request.body;

      const response = await this.authenticateUserUseCase.execute({
        email,
        password,
      });

      return ok(response);
    } catch (error) {
      if (error instanceof UserNotFoundWithThisEmailError) {
        return notFound(error);
      }

      if (error instanceof PasswordNotMatchError) {
        return unprocessableEntity(error);
      }

      throw error;
    }
  }
}
