import { RefreshUserAccessTokenController } from '@presentation/controllers/user/RefreshUserAccessToken';

import { makeRefreshUserAccessTokenUseCase } from '@main/factories/usecases/user/RefreshUserAccessTokenUseCaseFactory';

export function makeRefreshUserAccessTokenController() {
  const refreshUserAccessTokenUseCase = makeRefreshUserAccessTokenUseCase();

  return new RefreshUserAccessTokenController(refreshUserAccessTokenUseCase);
}
