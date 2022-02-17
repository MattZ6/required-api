interface IVerifyCriptographyProvider {
  verify(
    data: IVerifyCriptographyProvider.Input
  ): Promise<IVerifyCriptographyProvider.Output>;
}

namespace IVerifyCriptographyProvider {
  export type Input = {
    value: string;
  };

  export type Output = {
    payload: string;
  };
}

export { IVerifyCriptographyProvider };
