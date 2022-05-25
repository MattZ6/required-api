import { UpdateProfileEmailController } from '@presentation/controllers/user/UpdateProfileEmail';
import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

import { makeEmailFieldValidation } from '../../validators/EmailField';

export function makeUpdateProfileEmailControllerValidation() {
  type Input = UpdateProfileEmailController.RequestBody;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('email'),
    makeEmailFieldValidation('email'),
  ]);
}
