import { hash } from 'bcryptjs';

import { ICreateHash } from '../../../data/protocols/cryptography/hash/CreateHash';

export class BcryptHashProvider implements ICreateHash {
  constructor(private readonly salt: number) {}

  hash(value: string): Promise<string> {
    return hash(value, this.salt);
  }
}
