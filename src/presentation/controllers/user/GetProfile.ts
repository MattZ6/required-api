import { UserNotFoundWithThisIdError } from '@domain/errors';
import { IGetProfileUseCase } from '@domain/usecases/user/GetProfile';

import { notFound, ok } from '@presentation/helpers/http/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class GetProfileController implements IController {
  constructor(private readonly getProfileUseCase: IGetProfileUseCase) {}

  async handle(
    request: GetProfileController.Request
  ): Promise<GetProfileController.Response> {
    try {
      const { user_id } = request;

      const user = await this.getProfileUseCase.execute({ user_id });

      return ok(user);
    } catch (error) {
      if (error instanceof UserNotFoundWithThisIdError) {
        return notFound(error);
      }

      throw error;
    }
  }
}

namespace GetProfileController {
  export type Request = IHttpRequest;

  export type Response = IHttpResponse;
}

export { GetProfileController };
