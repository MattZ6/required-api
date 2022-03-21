import faker from '@faker-js/faker';

import { GetUserProfileController } from '@presentation/controllers/user/GetUserProfile';

export function makeGetUserProfileControllerRequestMock(): GetUserProfileController.Request {
  return {
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    user_id: faker.datatype.uuid(),
  };
}
