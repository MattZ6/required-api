import { UserNotFoundWithThisIdError } from '@domain/errors';
import { IUserModel } from '@domain/models/User';
import { GetProfileDTO, IGetProfileUseCase } from '@domain/usecases/GetProfile';

import { IFindUserByIdRepository } from '@data/protocols/repositories/user';

export class GetProfileUseCase implements IGetProfileUseCase {
  constructor(
    private readonly findUserByIdRepository: IFindUserByIdRepository
  ) {}

  async execute(data: GetProfileDTO): Promise<IUserModel> {
    const { user_id } = data;

    const user = await this.findUserByIdRepository.findById(user_id);

    if (!user) {
      throw new UserNotFoundWithThisIdError();
    }

    return user;
  }
}
