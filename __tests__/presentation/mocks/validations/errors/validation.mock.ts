import { faker } from '@faker-js/faker';

import { ValidationError } from '@presentation/validations/errors';

export function makeValidationErrorMock() {
  return new ValidationError(
    faker.database.column(),
    faker.database.type(),
    faker.datatype.string()
  );
}
