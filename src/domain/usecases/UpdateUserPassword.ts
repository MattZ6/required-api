export type UpdateUserPasswordDTO = {
  user_id: string;
  old_password: string;
  new_password: string;
};

export interface IUpdateUserPasswordUseCase {
  execute(data: UpdateUserPasswordDTO): Promise<void>;
}
