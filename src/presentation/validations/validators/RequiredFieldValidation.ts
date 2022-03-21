import { IValidation } from '@presentation/protocols';
import { RequiredFieldError } from '@presentation/validations/errors';

export class RequiredFieldValidation implements IValidation {
  constructor(private readonly fieldName: string) {}

  validate(input: any): void {
    if (!input[this.fieldName]) {
      throw new RequiredFieldError(this.fieldName);
    }
  }
}
