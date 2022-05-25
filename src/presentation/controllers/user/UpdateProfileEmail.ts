import {
  UserNotFoundWithProvidedIdError,
  UserAlreadyExistsWithProvidedEmailError,
} from '@domain/errors';
import { IUpdateUserEmailUseCase } from '@domain/usecases/user/UpdateEmail';

import {
  noContent,
  badRequest,
  notFound,
  conflict,
} from '@presentation/helpers/http';
import {
  IController,
  IValidation,
  IHttpRequest,
  IHttpResponse,
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

      const { id } = request.user;
      const { email } = request.body;

      await this.updateUserEmailUseCase.execute({ user_id: id, email });

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
  export type RequestBody = Pick<IUpdateUserEmailUseCase.Input, 'email'>;

  export type Request = IHttpRequest<RequestBody, void, void, void>;

  export type Response = IHttpResponse;
}

export { UpdateProfileEmailController };
