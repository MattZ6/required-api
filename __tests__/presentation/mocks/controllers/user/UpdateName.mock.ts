import { faker } from '@faker-js/faker';

import { UpdateProfileNameController } from '@presentation/controllers/user/UpdateProfileName';

export function makeUpdateProfileNameControllerRequestMock(): UpdateProfileNameController.Request {
  return {
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    body: {
      name: faker.name.fullName(),
    },
    headers: undefined,
    params: undefined,
    query: undefined,
    user: {
      id: faker.datatype.uuid(),
    },
  };
}
