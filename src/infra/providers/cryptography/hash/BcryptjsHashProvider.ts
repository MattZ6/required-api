import { hash, compare } from 'bcryptjs';

import {
  ICompareHashProvider,
  IGenerateHashProvider,
} from '@data/protocols/providers/cryptography/hash';

export class BcryptjsHashProvider
  implements IGenerateHashProvider, ICompareHashProvider
{
  constructor(private readonly salt: number) {}

  async hash(
    data: IGenerateHashProvider.Input
  ): Promise<IGenerateHashProvider.Output> {
    const { value } = data;

    return hash(value, this.salt);
  }

  async compare(value: string, hashedValue: string): Promise<boolean> {
    return compare(value, hashedValue);
  }
}
