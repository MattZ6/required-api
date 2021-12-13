import Faker from 'faker';

import {
  AccessTokenDTO,
  AuthenticateUserDTO,
  IAuthenticateUserUseCase,
} from '@domain/usecases/AuthenticateUser';

export class AuthenticateUserUseCaseSpy implements IAuthenticateUserUseCase {
  async execute(_: AuthenticateUserDTO): Promise<AccessTokenDTO> {
    return {
      access_token: Faker.datatype.string(),
    };
  }
}
