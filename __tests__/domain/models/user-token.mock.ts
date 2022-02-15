import faker from '@faker-js/faker';

import { IUserToken } from '@domain/models/UserToken';

export function makeUserTokenMock(): IUserToken {
  return {
    id: faker.datatype.uuid(),
    user_id: faker.datatype.uuid(),
    token: faker.datatype.uuid(),
    expires_in: faker.date.soon(),
    created_at: faker.datatype.datetime(),
    updated_at: faker.datatype.datetime(),
  };
}
