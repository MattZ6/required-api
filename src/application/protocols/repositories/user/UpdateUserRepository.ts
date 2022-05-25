import { User } from '@domain/models/User';

interface IUpdateUserRepository {
  update(
    data: IUpdateUserRepository.Input
  ): Promise<IUpdateUserRepository.Output>;
}

namespace IUpdateUserRepository {
  export type Input = User;

  export type Output = User;
}

export { IUpdateUserRepository };
