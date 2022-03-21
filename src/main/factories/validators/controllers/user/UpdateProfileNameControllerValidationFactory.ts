import {
  MinLengthFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeUpdateProfileNameControllerValidation() {
  return new ValidationComposite([
    new RequiredFieldValidation('name'),
    new MinLengthFieldValidation('name', 3, true),
  ]);
}
