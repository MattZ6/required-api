import { UpdateProfilePasswordController } from '@presentation/controllers/user/UpdateProfilePassword';
import {
  CompareFieldsValidation,
  MinLengthFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

import { userConfig } from '@main/config/env/user';

export function makeUpdateProfilePasswordControllerValidation() {
  type Input = UpdateProfilePasswordController.RequestBody & {
    new_password_confirmation: string;
  };

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('old_password'),
    new MinLengthFieldValidation(
      'old_password',
      userConfig.PASSWORD_MIN_LENGTH
    ),
    new RequiredFieldValidation('new_password'),
    new MinLengthFieldValidation(
      'new_password',
      userConfig.PASSWORD_MIN_LENGTH
    ),
    new RequiredFieldValidation('new_password_confirmation'),
    new MinLengthFieldValidation(
      'new_password_confirmation',
      userConfig.PASSWORD_MIN_LENGTH
    ),
    new CompareFieldsValidation('new_password_confirmation', 'new_password'),
  ]);
}
