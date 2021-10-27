import { IUserModel } from '@domain/models/User';

export interface IFindUserByIdRepository {
  findById(id: string): Promise<IUserModel | undefined>;
}
