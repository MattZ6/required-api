import Faker from 'faker';

import { IUserModel } from '@domain/models/User';
import { CreateUserDTO, ICreateUserUseCase } from '@domain/usecases/CreateUser';

export class CreateUserUseCaseSpy implements ICreateUserUseCase {
  async execute(_: CreateUserDTO): Promise<IUserModel> {
    return {
      id: Faker.datatype.uuid(),
      name: Faker.name.findName(),
      email: Faker.internet.email(),
      password_hash: Faker.internet.password(),
      created_at: Faker.datatype.datetime(),
      updated_at: Faker.datatype.datetime(),
    };
  }
}
