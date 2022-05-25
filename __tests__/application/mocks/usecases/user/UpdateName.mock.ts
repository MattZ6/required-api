import faker from '@faker-js/faker';

import { IUpdateUserNameUseCase } from '@domain/usecases/user/UpdateName';

export function makeUpdateUserNameUseCaseInputMock(): IUpdateUserNameUseCase.Input {
  return {
    user_id: faker.datatype.uuid(),
    name: faker.name.findName(),
  };
}
