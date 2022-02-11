import { IUser } from '@domain/models/User';

export namespace UserMapper {
  type UserProfileDTO = {
    id: string;
    name: string;
    email: string;
  };

  export function toProfileDTO(data: IUser): UserProfileDTO {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
    };
  }
}
