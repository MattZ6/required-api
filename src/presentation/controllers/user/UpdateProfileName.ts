import { UserNotFoundWithProvidedIdError } from '@domain/errors';
import { IUpdateUserNameUseCase } from '@domain/usecases/user/UpdateUserName';

import { noContent, notFound } from '@presentation/helpers/http/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class UpdateProfileNameController implements IController {
  constructor(private readonly updateUserNameUseCase: IUpdateUserNameUseCase) {}

  async handle(
    request: UpdateProfileNameController.Request
  ): Promise<UpdateProfileNameController.Response> {
    const { user_id } = request;
    const { name } = request.body;

    try {
      await this.updateUserNameUseCase.execute({ user_id, name });

      return noContent();
    } catch (error) {
      if (error instanceof UserNotFoundWithProvidedIdError) {
        return notFound(error);
      }

      throw error;
    }
  }
}

namespace UpdateProfileNameController {
  type RequestBody = {
    name: string;
  };

  export type Request = IHttpRequest<RequestBody>;

  export type Response = IHttpResponse;
}

export { UpdateProfileNameController };
