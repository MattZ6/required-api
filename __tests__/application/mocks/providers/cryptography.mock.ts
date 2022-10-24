import { faker } from '@faker-js/faker';

import {
  IGenerateHashProvider,
  ICompareHashProvider,
  IEncryptProvider,
  IVerifyCriptographyProvider,
} from '@application/protocols/providers/cryptography';

export class GenerateHashProviderSpy implements IGenerateHashProvider {
  async hash(
    _: IGenerateHashProvider.Input
  ): Promise<IGenerateHashProvider.Output> {
    return faker.datatype.string();
  }
}

export class CompareHashProviderSpy implements ICompareHashProvider {
  async compare(
    _: ICompareHashProvider.Input
  ): Promise<ICompareHashProvider.Output> {
    return true;
  }
}

export function makeEncryptProviderOutputMock(): IEncryptProvider.Output {
  return faker.datatype.string();
}

export class EncryptProviderSpy implements IEncryptProvider {
  async encrypt(
    _: IEncryptProvider.Input<unknown>
  ): Promise<IEncryptProvider.Output> {
    return makeEncryptProviderOutputMock();
  }
}

export function makeVerifyCriptographyProviderOutputMock<
  T = unknown
>(): IVerifyCriptographyProvider.Output<T> {
  return {
    subject: faker.datatype.string(),
    payload: {} as T,
  };
}

export class VerifyCriptographyProviderSpy
  implements IVerifyCriptographyProvider
{
  async verify<T = unknown>(
    _: IVerifyCriptographyProvider.Input
  ): Promise<IVerifyCriptographyProvider.Output<T>> {
    return makeVerifyCriptographyProviderOutputMock<T>();
  }
}
