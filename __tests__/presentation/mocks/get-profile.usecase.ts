import { faker } from '@faker-js/faker';

import { IGetUserProfileUseCase } from '@domain/usecases/user/GetUserProfile';

export class GetProfileUseCaseSpy implements IGetUserProfileUseCase {
  async execute(
    data: IGetUserProfileUseCase.Input
  ): Promise<IGetUserProfileUseCase.Output> {
    const { user_id } = data;

    return {
      id: user_id,
      name: faker.name.findName(),
      email: faker.internet.email(),
      password_hash: faker.internet.password(),
      created_at: faker.datatype.datetime(),
      updated_at: faker.datatype.datetime(),
    };
  }
}
