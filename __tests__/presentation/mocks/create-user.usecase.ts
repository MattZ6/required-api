import { faker } from '@faker-js/faker';

import { IUserModel } from '@domain/models/User';
import { CreateUserDTO, ICreateUserUseCase } from '@domain/usecases/CreateUser';

export class CreateUserUseCaseSpy implements ICreateUserUseCase {
  async execute(_: CreateUserDTO): Promise<IUserModel> {
    return {
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      password_hash: faker.internet.password(),
      created_at: faker.datatype.datetime(),
      updated_at: faker.datatype.datetime(),
    };
  }
}
