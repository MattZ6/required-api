import { UserNotFoundWithThisIdError } from '@domain/errors';
import {
  IUpdateUserNameUseCase,
  UpdateUserNameDTO,
} from '@domain/usecases/UpdateUserName';

import {
  IFindUserByIdRepository,
  IUpdateUserRepository,
} from '@data/protocols/repositories/user';

export class UpdateUserNameUseCase implements IUpdateUserNameUseCase {
  constructor(
    private readonly findUserByIdRepository: IFindUserByIdRepository,
    private readonly updateUserRepository: IUpdateUserRepository
  ) {}

  async execute(data: UpdateUserNameDTO): Promise<void> {
    const { user_id, name } = data;

    const user = await this.findUserByIdRepository.findById({ id: user_id });

    if (!user) {
      throw new UserNotFoundWithThisIdError();
    }

    user.name = name;

    await this.updateUserRepository.update(user);
  }
}
