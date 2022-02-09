import {
  WrongPasswordError,
  UserNotFoundWithProvidedEmailError,
} from '@domain/errors';
import { IAuthenticateUserUseCase } from '@domain/usecases/user/AuthenticateUser';

import {
  notFound,
  ok,
  unprocessableEntity,
} from '@presentation/helpers/http/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class AuthenticateUserController implements IController {
  constructor(
    private readonly authenticateUserUseCase: IAuthenticateUserUseCase
  ) {}

  async handle(
    request: AuthenticateUserController.Request
  ): Promise<AuthenticateUserController.Response> {
    try {
      const { email, password } = request.body;

      const response = await this.authenticateUserUseCase.execute({
        email,
        password,
      });

      return ok(response);
    } catch (error) {
      if (error instanceof UserNotFoundWithProvidedEmailError) {
        return notFound(error);
      }

      if (error instanceof WrongPasswordError) {
        return unprocessableEntity(error);
      }

      throw error;
    }
  }
}

namespace AuthenticateUserController {
  type RequestBody = {
    email: string;
    password: string;
  };

  export type Request = IHttpRequest<RequestBody>;

  export type Response = IHttpResponse;
}

export { AuthenticateUserController };
