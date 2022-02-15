export namespace AuthenticationMapper {
  type AuthenticationDTO = {
    access_token: string;
    refresh_token: string;
  };

  type Input = {
    access_token: string;
    refresh_token: string;
  };

  export function toDTO(data: Input): AuthenticationDTO {
    const { access_token, refresh_token } = data;

    return {
      access_token,
      refresh_token,
    };
  }
}
