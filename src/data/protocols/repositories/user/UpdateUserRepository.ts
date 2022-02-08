import { IUserModel } from '@domain/models/User';

interface IUpdateUserRepository {
  update(
    data: IUpdateUserRepository.Input
  ): Promise<IUpdateUserRepository.Output>;
}

namespace IUpdateUserRepository {
  export type Input = IUserModel;

  export type Output = IUserModel;
}

export { IUpdateUserRepository };
