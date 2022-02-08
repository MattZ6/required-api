import { faker } from '@faker-js/faker';

import { IGetProfileUseCase } from '@domain/usecases/user/GetProfile';

export class GetProfileUseCaseSpy implements IGetProfileUseCase {
  async execute(
    data: IGetProfileUseCase.Input
  ): Promise<IGetProfileUseCase.Output> {
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
