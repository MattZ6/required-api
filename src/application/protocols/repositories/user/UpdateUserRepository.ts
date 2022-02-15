import { IUser } from '@domain/models/User';

interface IUpdateUserRepository {
  update(
    data: IUpdateUserRepository.Input
  ): Promise<IUpdateUserRepository.Output>;
}

namespace IUpdateUserRepository {
  export type Input = IUser;

  export type Output = IUser;
}

export { IUpdateUserRepository };
