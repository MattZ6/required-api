import Faker from 'faker';

import { IUserModel } from '@domain/models/User';
import { GetProfileDTO, IGetProfileUseCase } from '@domain/usecases/GetProfile';

export class GetProfileUseCaseSpy implements IGetProfileUseCase {
  async execute({ user_id }: GetProfileDTO): Promise<IUserModel> {
    return {
      id: user_id,
      name: Faker.name.findName(),
      email: Faker.internet.email(),
      password_hash: Faker.internet.password(),
      created_at: Faker.datatype.datetime(),
      updated_at: Faker.datatype.datetime(),
    };
  }
}
