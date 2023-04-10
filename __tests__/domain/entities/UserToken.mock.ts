import { faker } from '@faker-js/faker'

import { UserToken } from '@domain/entities/UserToken'

export function makeUserTokenMock(): UserToken {
  return {
    id: faker.datatype.uuid(),
    user_id: faker.datatype.uuid(),
    token: faker.datatype.uuid(),
    expires_in: faker.date.soon(),
    created_at: faker.datatype.datetime(),
    updated_at: faker.datatype.datetime(),
  }
}
