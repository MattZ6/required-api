import { IValidation } from '@presentation/protocols';
import { RequiredFieldError } from '@presentation/validations/errors';

export class RequiredFieldValidation<I = unknown> implements IValidation<I> {
  constructor(private readonly fieldName: keyof I) {}

  validate(input: I) {
    if (!input[this.fieldName]) {
      return new RequiredFieldError(String(this.fieldName));
    }

    return null;
  }
}
