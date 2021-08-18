import { hash, compare } from 'bcryptjs';

import { ICompareHashProvider } from '@data/protocols/cryptography/hash/CompareHashProvider';
import { ICreateHashProvider } from '@data/protocols/cryptography/hash/CreateHashProvider';

export class BcryptHashProvider
  implements ICreateHashProvider, ICompareHashProvider
{
  constructor(private readonly salt: number) {}

  hash(value: string): Promise<string> {
    return hash(value, this.salt);
  }

  compare(value: string, hashedValue: string): Promise<boolean> {
    return compare(value, hashedValue);
  }
}
