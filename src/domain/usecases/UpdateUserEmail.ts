export type UpdateUserEmailDTO = {
  user_id: string;
  email: string;
};

export interface IUpdateUserEmailUseCase {
  execute(data: UpdateUserEmailDTO): Promise<void>;
}
