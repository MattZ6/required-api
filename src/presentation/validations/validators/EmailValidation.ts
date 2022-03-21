import { IValidation } from '@presentation/protocols';
import { InvalidEmailFieldError } from '@presentation/validations/errors';
import { IEmailValidator } from '@presentation/validations/protocols';

export class EmailFieldValidation implements IValidation {
  constructor(
    private readonly emailValidator: IEmailValidator,
    private readonly fieldName: string
  ) {}

  validate(input: any): void {
    const email = String(input[this.fieldName] ?? '').trim();

    const isValid = this.emailValidator.isValid(email);

    if (!isValid) {
      throw new InvalidEmailFieldError(this.fieldName);
    }
  }
}
