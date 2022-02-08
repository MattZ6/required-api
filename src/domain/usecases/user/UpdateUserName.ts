interface IUpdateUserNameUseCase {
  execute(
    data: IUpdateUserNameUseCase.Input
  ): Promise<IUpdateUserNameUseCase.Output>;
}

namespace IUpdateUserNameUseCase {
  export type Input = {
    user_id: string;
    name: string;
  };

  export type Output = void;
}

export { IUpdateUserNameUseCase };
