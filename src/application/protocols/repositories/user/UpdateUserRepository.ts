import { User } from '@domain/entities/User';

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
