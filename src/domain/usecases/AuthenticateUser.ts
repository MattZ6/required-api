export type AuthenticateUserDTO = {
  email: string;
  password: string;
};

export type AccessTokenDTO = {
  access_token: string;
};

export interface IAuthenticateUserUseCase {
  execute(data: AuthenticateUserDTO): Promise<AccessTokenDTO>;
}
