import { faker } from '@faker-js/faker';

import { IUserModel } from '@domain/models/User';
import { GetProfileDTO, IGetProfileUseCase } from '@domain/usecases/GetProfile';

export class GetProfileUseCaseSpy implements IGetProfileUseCase {
  async execute({ user_id }: GetProfileDTO): Promise<IUserModel> {
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
