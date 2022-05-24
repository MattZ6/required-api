import faker from '@faker-js/faker';

import { GetUserProfileController } from '@presentation/controllers/user/GetUserProfile';

export function makeGetUserProfileControllerRequestMock(): GetUserProfileController.Request {
  return {
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    headers: undefined,
    params: undefined,
    query: undefined,
    body: undefined,
    user: {
      id: faker.datatype.uuid(),
    },
  };
}
