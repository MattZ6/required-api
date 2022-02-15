import faker from '@faker-js/faker';

import { ICreateUserUseCase } from '@domain/usecases/user/CreateUser';

export function makeCreateUserUseCaseInputMock(): ICreateUserUseCase.Input {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
