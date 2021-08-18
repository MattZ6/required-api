import { hash, compare } from 'bcryptjs';

import { ICompareHash } from '@data/protocols/cryptography/hash/CompareHash';
import { ICreateHashProvider } from '@data/protocols/cryptography/hash/CreateHashProvider';

export class BcryptHashProvider implements ICreateHashProvider, ICompareHash {
  constructor(private readonly salt: number) {}

  hash(value: string): Promise<string> {
    return hash(value, this.salt);
  }

  compare(value: string, hashedValue: string): Promise<boolean> {
    return compare(value, hashedValue);
  }
}
