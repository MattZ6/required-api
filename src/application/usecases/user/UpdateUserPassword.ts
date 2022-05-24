import {
  WrongPasswordError,
  UserNotFoundWithProvidedIdError,
} from '@domain/errors';
import { IUpdateUserPasswordUseCase } from '@domain/usecases/user/UpdateUserPassword';

import {
  ICompareHashProvider,
  IGenerateHashProvider,
} from '@application/protocols/providers/cryptography';
import {
  IFindUserByIdRepository,
  IUpdateUserRepository,
} from '@application/protocols/repositories/user';

export class UpdateUserPasswordUseCase implements IUpdateUserPasswordUseCase {
  constructor(
    private readonly findUserByIdRepository: IFindUserByIdRepository,
    private readonly compareHashProvider: ICompareHashProvider,
    private readonly generateHashProvider: IGenerateHashProvider,
    private readonly updateUserRepository: IUpdateUserRepository
  ) {}

  async execute(
    data: IUpdateUserPasswordUseCase.Input
  ): Promise<IUpdateUserPasswordUseCase.Output> {
    const { user_id, old_password, new_password } = data;

    const user = await this.findUserByIdRepository.findById({ id: user_id });

    if (!user) {
      throw new UserNotFoundWithProvidedIdError();
    }

    const passwordsMatch = await this.compareHashProvider.compare({
      value: old_password,
      hashed_value: user.password_hash,
    });

    if (!passwordsMatch) {
      throw new WrongPasswordError();
    }

    const newPasswordHash = await this.generateHashProvider.hash({
      value: new_password,
    });

    return this.updateUserRepository.update({
      ...user,
      password_hash: newPasswordHash,
    });
  }
}
