import {
  UserTokenNotFoundWithProvidedTokenError,
  UserTokenExpiredError,
} from '@domain/errors';
import { IRefreshUserAccessTokenUseCase } from '@domain/usecases/user/RefreshAccessToken';

import { AuthenticationMapper } from '@presentation/dtos';
import {
  ok,
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

class RefreshUserAccessTokenController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly refreshUserAccessTokenUseCase: IRefreshUserAccessTokenUseCase
  ) {}

  async handle(
    request: RefreshUserAccessTokenController.Request
  ): Promise<RefreshUserAccessTokenController.Response> {
    try {
      const validationError = this.validation.validate(request.body);

      if (validationError) {
        throw validationError;
      }

      const { refresh_token } = request.body;

      const output = await this.refreshUserAccessTokenUseCase.execute({
        refresh_token,
      });

      return ok(AuthenticationMapper.toDTO(output));
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof UserTokenNotFoundWithProvidedTokenError) {
        return notFound(error);
      }

      if (error instanceof UserTokenExpiredError) {
        return unprocessableEntity(error);
      }

      throw error;
    }
  }
}

namespace RefreshUserAccessTokenController {
  export type RequestBody = IRefreshUserAccessTokenUseCase.Input;

  export type Request = IHttpRequest<RequestBody, void, void, void>;

  export type Response = IHttpResponse;
}

export { RefreshUserAccessTokenController };
