import {
  PasswordNotMatchError,
  UserNotFoundWithThisIdError,
} from '@domain/errors';
import { IUpdateUserPasswordUseCase } from '@domain/usecases/user/UpdateUserPassword';

import {
  noContent,
  notFound,
  unprocessableEntity,
} from '@presentation/helpers/http/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class UpdateProfilePasswordController implements IController {
  constructor(
    private readonly updateUserPasswordUseCase: IUpdateUserPasswordUseCase
  ) {}

  async handle(
    request: UpdateProfilePasswordController.Request
  ): Promise<UpdateProfilePasswordController.Response> {
    const { user_id } = request;
    const { old_password, password } = request.body;

    try {
      await this.updateUserPasswordUseCase.execute({
        user_id,
        old_password,
        new_password: password,
      });

      return noContent();
    } catch (error) {
      if (error instanceof UserNotFoundWithThisIdError) {
        return notFound(error);
      }

      if (error instanceof PasswordNotMatchError) {
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

  export type Request = IHttpRequest<RequestBody>;

  export type Response = IHttpResponse;
}

export { UpdateProfilePasswordController };
