import { UserNotFoundWithProvidedIdError } from '@domain/errors';
import { IUpdateUserNameUseCase } from '@domain/usecases/user/UpdateUserName';

import {
  IFindUserByIdRepository,
  IUpdateUserRepository,
} from '@data/protocols/repositories/user';

export class UpdateUserNameUseCase implements IUpdateUserNameUseCase {
  constructor(
    private readonly findUserByIdRepository: IFindUserByIdRepository,
    private readonly updateUserRepository: IUpdateUserRepository
  ) {}

  async execute(
    data: IUpdateUserNameUseCase.Input
  ): Promise<IUpdateUserNameUseCase.Output> {
    const { user_id, name } = data;

    const user = await this.findUserByIdRepository.findById({ id: user_id });

    if (!user) {
      throw new UserNotFoundWithProvidedIdError();
    }

    user.name = name;

    return this.updateUserRepository.update(user);
  }
}
