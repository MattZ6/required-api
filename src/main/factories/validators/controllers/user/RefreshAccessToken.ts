import { RefreshUserAccessTokenController } from '@presentation/controllers/user/RefreshAccessToken'
import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators'

import { makeUuidFieldValidation } from '../../validators/UuidField'

export function makeRefreshUserAccessControllerValidation(): ValidationComposite {
  type Input = RefreshUserAccessTokenController.RequestBody

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('refresh_token'),
    makeUuidFieldValidation('refresh_token'),
  ])
}
