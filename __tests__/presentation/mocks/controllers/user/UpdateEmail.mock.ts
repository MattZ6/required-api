import faker from '@faker-js/faker';

import { UpdateProfileEmailController } from '@presentation/controllers/user/UpdateProfileEmail';

export function makeUpdateProfileEmailControllerRequestMock(): UpdateProfileEmailController.Request {
  return {
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    body: {
      email: faker.internet.email(),
    },
    headers: undefined,
    params: undefined,
    query: undefined,
    user: {
      id: faker.datatype.uuid(),
    },
  };
}
