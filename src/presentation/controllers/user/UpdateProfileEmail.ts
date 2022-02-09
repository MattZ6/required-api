import {
  UserAlreadyExistsWithProvidedEmailError,
  UserNotFoundWithProvidedIdError,
} from '@domain/errors';
import { IUpdateUserEmailUseCase } from '@domain/usecases/user/UpdateUserEmail';

import { conflict, noContent, notFound } from '@presentation/helpers/http/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class UpdateProfileEmailController implements IController {
  constructor(
    private readonly updateUserEmailUseCase: IUpdateUserEmailUseCase
  ) {}

  async handle(
    request: UpdateProfileEmailController.Request
  ): Promise<UpdateProfileEmailController.Response> {
    const { user_id } = request;
    const { email } = request.body;

    try {
      await this.updateUserEmailUseCase.execute({ user_id, email });

      return noContent();
    } catch (error) {
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

  export type Request = IHttpRequest<RequestBody>;

  export type Response = IHttpResponse;
}

export { UpdateProfileEmailController };
