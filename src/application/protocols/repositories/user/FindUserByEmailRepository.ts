import { User } from '@domain/models/User';

interface IFindUserByEmailRepository {
  findByEmail(
    data: IFindUserByEmailRepository.Input
  ): Promise<IFindUserByEmailRepository.Output>;
}

namespace IFindUserByEmailRepository {
  export type Input = {
    email: string;
  };

  export type Output = User | undefined;
}

export { IFindUserByEmailRepository };
