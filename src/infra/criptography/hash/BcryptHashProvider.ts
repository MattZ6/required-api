import { hash, compare } from 'bcryptjs';

import { ICompareHash } from '../../../data/protocols/cryptography/hash/CompareHash';
import { ICreateHash } from '../../../data/protocols/cryptography/hash/CreateHash';

export class BcryptHashProvider implements ICreateHash, ICompareHash {
  constructor(private readonly salt: number) {}

  hash(value: string): Promise<string> {
    return hash(value, this.salt);
  }

  compare(value: string, hashedValue: string): Promise<boolean> {
    return compare(value, hashedValue);
  }
}
