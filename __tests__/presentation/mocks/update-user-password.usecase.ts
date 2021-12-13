import {
  IUpdateUserPasswordUseCase,
  UpdateUserPasswordDTO,
} from '@domain/usecases/UpdateUserPassword';

export class UpdateUserPasswordUseCaseSpy
  implements IUpdateUserPasswordUseCase
{
  async execute(_: UpdateUserPasswordDTO): Promise<void> {
    // That's all folks 🤷‍♀️
  }
}
