import { IUserModel } from '@domain/models/User';

export type GetProfileDTO = {
  user_id: string;
};

export interface IGetProfileUseCase {
  execute(data: GetProfileDTO): Promise<IUserModel>;
}
