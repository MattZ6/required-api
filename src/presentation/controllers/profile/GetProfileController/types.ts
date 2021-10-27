import { IUserModel } from '@domain/models/User';

type ProfileDTO = {
  id: string;
  name: string;
  email: string;
};

export const toProfileDTO = (user: IUserModel): ProfileDTO => ({
  id: user.id,
  name: user.name,
  email: user.email,
});
