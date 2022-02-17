import { RefreshUserAccessTokenController } from '@presentation/controllers/user/RefreshUserAccessToken';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandlerDecoratorFactory';
import { makeRefreshUserAccessTokenUseCase } from '@main/factories/usecases/user/RefreshUserAccessTokenUseCaseFactory';

export function makeRefreshUserAccessTokenController() {
  const refreshUserAccessTokenUseCase = makeRefreshUserAccessTokenUseCase();

  const controller = new RefreshUserAccessTokenController(
    refreshUserAccessTokenUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
