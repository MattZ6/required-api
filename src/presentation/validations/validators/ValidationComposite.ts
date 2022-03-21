import { IValidation } from '@presentation/protocols';

export class ValidationComposite implements IValidation {
  constructor(private readonly validations: IValidation[]) {}

  validate(input: any): void {
    this.validations.forEach(validation => {
      validation.validate(input);
    });
  }
}
