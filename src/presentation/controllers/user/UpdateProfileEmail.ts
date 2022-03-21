import {
  UserAlreadyExistsWithProvidedEmailError,
  UserNotFoundWithProvidedIdError,
} from '@domain/errors';
import { IUpdateUserEmailUseCase } from '@domain/usecases/user/UpdateUserEmail';

import {
  badRequest,
  conflict,
  noContent,
  notFound,
} from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '@presentation/protocols';
import { ValidationError } from '@presentation/validations/errors';

class UpdateProfileEmailController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly updateUserEmailUseCase: IUpdateUserEmailUseCase
  ) {}

  async handle(
    request: UpdateProfileEmailController.Request
  ): Promise<UpdateProfileEmailController.Response> {
    try {
      this.validation.validate(request.body);

      const { user_id } = request;
      const { email } = request.body;

      await this.updateUserEmailUseCase.execute({ user_id, email });

      return noContent();
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof UserNotFoundWithProvidedIdError) {
        return notFound(error);
      }

      if (error instanceof UserAlreadyExistsWithProvidedEmailError) {
        return conflict(error);
      }

      throw error;
    }
  }
}

namespace UpdateProfileEmailController {
  type RequestBody = {
    email: string;
  };

  export type Request = IHttpRequest<RequestBody, void, void, void>;

  export type Response = IHttpResponse;
}

export { UpdateProfileEmailController };
