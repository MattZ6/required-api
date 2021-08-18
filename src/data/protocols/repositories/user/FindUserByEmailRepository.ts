import { IUserModel } from '../../../../domain/models/User';

export interface IFindUserByEmailRepository {
  findByEmail(email: string): Promise<IUserModel | undefined>;
}
