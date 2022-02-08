import { IUserModel } from '@domain/models/User';

interface IFindUserByIdRepository {
  findById(
    data: IFindUserByIdRepository.Input
  ): Promise<IFindUserByIdRepository.Output>;
}

namespace IFindUserByIdRepository {
  export type Input = {
    id: string;
  };

  export type Output = IUserModel | undefined;
}

export { IFindUserByIdRepository };
