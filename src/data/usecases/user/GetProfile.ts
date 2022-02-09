import { UserNotFoundWithProvidedIdError } from '@domain/errors';
import { IGetProfileUseCase } from '@domain/usecases/user/GetProfile';

import { IFindUserByIdRepository } from '@data/protocols/repositories/user';

export class GetProfileUseCase implements IGetProfileUseCase {
  constructor(
    private readonly findUserByIdRepository: IFindUserByIdRepository
  ) {}

  async execute(
    data: IGetProfileUseCase.Input
  ): Promise<IGetProfileUseCase.Output> {
    const { user_id } = data;

    const user = await this.findUserByIdRepository.findById({
      id: user_id,
    });

    if (!user) {
      throw new UserNotFoundWithProvidedIdError();
    }

    return user;
  }
}
