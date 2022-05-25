import {
  CompareFieldsValidation,
  MinLengthFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeUpdateProfilePasswordControllerValidation() {
  return new ValidationComposite([
    new RequiredFieldValidation('old_password'),
    new MinLengthFieldValidation('old_password', 6),
    new RequiredFieldValidation('password'),
    new MinLengthFieldValidation('password', 6),
    new RequiredFieldValidation('password_confirmation'),
    new MinLengthFieldValidation('password_confirmation', 6),
    new CompareFieldsValidation('password_confirmation', 'password'),
  ]);
}
