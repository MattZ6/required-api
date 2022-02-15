import faker from '@faker-js/faker';

import { RefreshUserAccessTokenController } from '@presentation/controllers/user/RefreshUserAccessToken';

export function makeRefreshUserAccessTokenControllerRequestMock(): RefreshUserAccessTokenController.Request {
  return {
    body: {
      refresh_token: faker.datatype.string(),
    },
  };
}
