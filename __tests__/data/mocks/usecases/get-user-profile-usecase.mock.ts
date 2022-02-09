import faker from '@faker-js/faker';

import { IGetProfileUseCase } from '@domain/usecases/user/GetProfile';

export function makeGetUserProfileUseCaseInputMock(): IGetProfileUseCase.Input {
  return {
    user_id: faker.datatype.uuid(),
  };
}
