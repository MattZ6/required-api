import { UserNotFoundWithProvidedIdError } from '@domain/errors';
import { IUpdateUserNameUseCase } from '@domain/usecases/user/UpdateName';

import {
  IFindUserByIdRepository,
  IUpdateUserRepository,
} from '@application/protocols/repositories/user';

export class UpdateUserNameUseCase implements IUpdateUserNameUseCase {
  constructor(
    private readonly findUserByIdRepository: IFindUserByIdRepository,
    private readonly updateUserRepository: IUpdateUserRepository
  ) {}

  async execute(
    data: IUpdateUserNameUseCase.Input
  ): Promise<IUpdateUserNameUseCase.Output> {
    const { user_id, name } = data;

    let user = await this.findUserByIdRepository.findById({ id: user_id });

    if (!user) {
      throw new UserNotFoundWithProvidedIdError();
    }

    user = await this.updateUserRepository.update({
      id: user_id,
      name,
    });

    return user;
  }
}
