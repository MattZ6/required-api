import { IUpdateUserPasswordUseCase } from '@domain/usecases/user/UpdatePassword';

import { makeUserMock } from '../../../../domain';

export class UpdateUserPasswordUseCaseSpy
  implements IUpdateUserPasswordUseCase
{
  async execute(
    _: IUpdateUserPasswordUseCase.Input
  ): Promise<IUpdateUserPasswordUseCase.Output> {
    return makeUserMock();
  }
}
