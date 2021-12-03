import { IUserModel } from '@domain/models/User';

export interface IUpdateUserRepository {
  update(user: IUserModel): Promise<IUserModel>;
}
