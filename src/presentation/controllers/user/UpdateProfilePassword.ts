import {
  WrongPasswordError,
  UserNotFoundWithProvidedIdError,
} from '@domain/errors';
import { IUpdateUserPasswordUseCase } from '@domain/usecases/user/UpdateUserPassword';

import {
  badRequest,
  noContent,
  notFound,
  unprocessableEntity,
} from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '@presentation/protocols';
import { ValidationError } from '@presentation/validations/errors';

class UpdateProfilePasswordController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly updateUserPasswordUseCase: IUpdateUserPasswordUseCase
  ) {}

  async handle(
    request: UpdateProfilePasswordController.Request
  ): Promise<UpdateProfilePasswordController.Response> {
    try {
      this.validation.validate(request.body);

      const { id } = request.user;
      const { old_password, password } = request.body;

      await this.updateUserPasswordUseCase.execute({
        user_id: id,
        old_password,
        new_password: password,
      });

      return noContent();
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof UserNotFoundWithProvidedIdError) {
        return notFound(error);
      }

      if (error instanceof WrongPasswordError) {
        return unprocessableEntity(error);
      }

      throw error;
    }
  }
}

namespace UpdateProfilePasswordController {
  type RequestBody = {
    old_password: string;
    password: string;
  };

  export type Request = IHttpRequest<RequestBody, void, void, void>;

  export type Response = IHttpResponse;
}

export { UpdateProfilePasswordController };
