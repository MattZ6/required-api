import faker from '@faker-js/faker';

import { GetUserProfileController } from '@presentation/controllers/user/GetUserProfile';

export function makeGetUserProfileControllerRequestMock(): GetUserProfileController.Request {
  return {
    user_id: faker.datatype.uuid(),
  };
}
