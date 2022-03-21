import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeRefreshUserAccessControllerValidation(): ValidationComposite {
  return new ValidationComposite([
    new RequiredFieldValidation('refresh_token'),
  ]);
}
