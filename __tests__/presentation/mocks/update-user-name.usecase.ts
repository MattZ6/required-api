import {
  IUpdateUserNameUseCase,
  UpdateUserNameDTO,
} from '@domain/usecases/user/UpdateUserName';

export class UpdateUserNameUseCaseSpy implements IUpdateUserNameUseCase {
  async execute(_: UpdateUserNameDTO): Promise<void> {
    // That's all folks 🤷‍♀️
  }
}
