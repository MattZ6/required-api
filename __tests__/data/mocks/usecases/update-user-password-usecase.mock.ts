import faker from '@faker-js/faker';

import { IUpdateUserPasswordUseCase } from '@domain/usecases/user/UpdateUserPassword';

export function makeUpdateUserPasswordUseCaseInputMock(): IUpdateUserPasswordUseCase.Input {
  return {
    user_id: faker.datatype.uuid(),
    old_password: faker.internet.password(),
    new_password: faker.internet.password(),
  };
}
