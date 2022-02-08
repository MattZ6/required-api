import { IUserModel } from '@domain/models/User';

interface IFindUserByEmailRepository {
  findByEmail(
    data: IFindUserByEmailRepository.Input
  ): Promise<IFindUserByEmailRepository.Output>;
}

namespace IFindUserByEmailRepository {
  export type Input = {
    email: string;
  };

  export type Output = IUserModel | undefined;
}

export { IFindUserByEmailRepository };
