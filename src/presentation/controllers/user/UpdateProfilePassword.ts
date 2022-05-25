import {
  UserNotFoundWithProvidedIdError,
  WrongPasswordError,
} from '@domain/errors';
import { IUpdateUserPasswordUseCase } from '@domain/usecases/user/UpdatePassword';

import {
  noContent,
  badRequest,
  notFound,
  unprocessableEntity,
} from '@presentation/helpers/http';
import {
  IController,
  IValidation,
  IHttpRequest,
  IHttpResponse,
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
      const validationError = this.validation.validate(request.body);

      if (validationError) {
        throw validationError;
      }

      const { id } = request.user;
      const { old_password, new_password } = request.body;

      await this.updateUserPasswordUseCase.execute({
        user_id: id,
        old_password,
        new_password,
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
  export type RequestBody = Pick<
    IUpdateUserPasswordUseCase.Input,
    'old_password' | 'new_password'
  >;

  export type Request = IHttpRequest<RequestBody, void, void, void>;

  export type Response = IHttpResponse;
}

export { UpdateProfilePasswordController };
