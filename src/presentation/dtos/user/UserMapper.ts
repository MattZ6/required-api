import { User } from '@domain/entities/User';

export namespace UserMapper {
  type UserProfileDTO = {
    id: string;
    name: string;
    email: string;
  };

  export function toProfileDTO(data: User): UserProfileDTO {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
    };
  }
}
