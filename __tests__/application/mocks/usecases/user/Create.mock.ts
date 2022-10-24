import { faker } from '@faker-js/faker';

import { ICreateUserUseCase } from '@domain/usecases/user/Create';

export function makeCreateUserUseCaseInputMock(): ICreateUserUseCase.Input {
  return {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
