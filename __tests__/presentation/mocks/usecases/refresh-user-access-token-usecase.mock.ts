import faker from '@faker-js/faker';

import { IRefreshUserAccessTokenUseCase } from '@domain/usecases/user/RefreshUserAccessToken';

export function makeRefreshUserAccessTokenUseCaseOutputMock(): IRefreshUserAccessTokenUseCase.Output {
  return {
    access_token: faker.datatype.string(),
    refresh_token: faker.datatype.string(),
  };
}

export class RefreshUserAccessTokenUseCaseSpy
  implements IRefreshUserAccessTokenUseCase
{
  async execute(
    _: IRefreshUserAccessTokenUseCase.Input
  ): Promise<IRefreshUserAccessTokenUseCase.Output> {
    return makeRefreshUserAccessTokenUseCaseOutputMock();
  }
}
