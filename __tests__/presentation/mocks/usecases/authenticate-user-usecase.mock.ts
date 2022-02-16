import { faker } from '@faker-js/faker';

import { IAuthenticateUserUseCase } from '@domain/usecases/user/AuthenticateUser';

export function makeAuthenticateUserUseCaseOutputMock(): IAuthenticateUserUseCase.Output {
  return {
    access_token: faker.datatype.uuid(),
    refresh_token: faker.datatype.uuid(),
  };
}

export class AuthenticateUserUseCaseSpy implements IAuthenticateUserUseCase {
  async execute(
    _: IAuthenticateUserUseCase.Input
  ): Promise<IAuthenticateUserUseCase.Output> {
    return makeAuthenticateUserUseCaseOutputMock();
  }
}
