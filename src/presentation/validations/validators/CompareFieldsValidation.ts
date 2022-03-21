import { IValidation } from '@presentation/protocols';

import { DivergentFieldsValuesError } from '../errors/DivergentFieldsValuesError';

export class CompareFieldsValidation implements IValidation {
  constructor(
    private readonly fieldName: string,
    private readonly fieldToCompareName: string
  ) {}

  validate(input: any): void {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      throw new DivergentFieldsValuesError(
        this.fieldName,
        this.fieldToCompareName
      );
    }
  }
}
