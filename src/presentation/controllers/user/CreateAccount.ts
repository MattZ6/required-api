import { UserAlreadyExistsWithProvidedEmailError } from '@domain/errors';
import { ICreateUserUseCase } from '@domain/usecases/user/CreateUser';

import { created, unprocessableEntity } from '@presentation/helpers/http/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class CreateAccountController implements IController {
  constructor(private readonly createUserUseCase: ICreateUserUseCase) {}

  async handle(
    request: CreateAccountController.Request
  ): Promise<CreateAccountController.Response> {
    try {
      const { name, email, password } = request.body;

      await this.createUserUseCase.execute({
        name,
        email,
        password,
      });

      return created<void>();
    } catch (error) {
      if (error instanceof UserAlreadyExistsWithProvidedEmailError) {
        return unprocessableEntity(error);
      }

      throw error;
    }
  }
}

namespace CreateAccountController {
  type RequestBody = {
    name: string;
    email: string;
    password: string;
  };

  export type Request = IHttpRequest<RequestBody>;

  export type Response = IHttpResponse;
}

export { CreateAccountController };
