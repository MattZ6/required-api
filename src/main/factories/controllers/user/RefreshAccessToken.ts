import { RefreshUserAccessTokenController } from '@presentation/controllers/user/RefreshAccessToken';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandlerDecoratorFactory';
import { makeRefreshUserAccessTokenUseCase } from '@main/factories/usecases/user/RefreshAccessToken';
import { makeRefreshUserAccessControllerValidation } from '@main/factories/validators/controllers/user/RefreshAccessToken';

export function makeRefreshUserAccessTokenController() {
  const validation = makeRefreshUserAccessControllerValidation();

  const refreshUserAccessTokenUseCase = makeRefreshUserAccessTokenUseCase();

  const controller = new RefreshUserAccessTokenController(
    validation,
    refreshUserAccessTokenUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
