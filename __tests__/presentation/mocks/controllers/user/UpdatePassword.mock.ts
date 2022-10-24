import { faker } from '@faker-js/faker';

import { UpdateProfilePasswordController } from '@presentation/controllers/user/UpdateProfilePassword';

export function makeUpdateProfilePasswordControllerRequestMock(): UpdateProfilePasswordController.Request {
  return {
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    body: {
      old_password: faker.internet.password(),
      new_password: faker.internet.password(),
    },
    headers: undefined,
    params: undefined,
    query: undefined,
    user: {
      id: faker.datatype.uuid(),
    },
  };
}
