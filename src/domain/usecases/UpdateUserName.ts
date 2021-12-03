export type UpdateUserNameDTO = {
  user_id: string;
  name: string;
};

export interface IUpdateUserNameUseCase {
  execute(data: UpdateUserNameDTO): Promise<void>;
}
